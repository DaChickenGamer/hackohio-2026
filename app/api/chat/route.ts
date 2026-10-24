import { createOpenAI } from '@ai-sdk/openai';
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  tool,
  toUIMessageStream,
  type UIMessage,
} from 'ai';
import { z } from 'zod';
import {
  mergeCatalogue,
  searchCatalogue,
  type CatalogueItem,
} from '@/lib/catalogue';

export const maxDuration = 30;

const postingSchema = z.object({
  query: z
    .string()
    .optional()
    .describe('Keywords for title, company, person, tags, industry, or description'),
  scope: z
    .enum(['all', 'company', 'person'])
    .optional()
    .describe('company = match company names, person = match builders/owners, all = everything'),
  kind: z
    .enum(['challenge', 'project', 'any'])
    .optional()
    .describe('challenge = company briefs, project = community builds'),
  industry: z
    .string()
    .optional()
    .describe('Exact industry label when known, e.g. Fintech or Healthcare'),
  technology: z
    .string()
    .optional()
    .describe('Exact tag when known, e.g. React, Python, Supabase'),
  difficulty: z
    .enum(['Beginner', 'Intermediate'])
    .optional()
    .describe('Difficulty level when the student asks for one'),
  limit: z.number().int().min(1).max(12).optional(),
});

const systemPrompt = `You are Folio's discovery assistant for HackOHI/O students.
Help them find challenges (company/community problem briefs) and community projects in the catalogue.
Always call searchPostings before recommending specific postings.
Use scope "company" when the user asks for a company (Google, Stripe, NASA, etc.).
Use scope "person" when they ask for a builder/person by name.
Be concise, warm, and concrete. Prefer 2–4 strong matches over long lists.
When recommending, mention the company/builder, industry, and why it fits.
Do not invent postings that are not in search results.
If nothing matches, suggest broader keywords or a different industry/tech.
You are not a job board — frame results as things to build and learn from.
Write in plain readable prose. Do not use markdown headings, code fences, or raw formatting symbols. Short paragraphs or simple bullet lists are fine.`;

function createSearchTool(catalogue: CatalogueItem[]) {
  return tool({
    description:
      'Search Folio catalogue postings: industry challenges and community projects.',
    inputSchema: postingSchema,
    execute: async (input) => searchCatalogue(catalogue, input),
  });
}

function resolveModel() {
  const openaiKey =
    process.env.OPENAI_API_KEY?.trim() ||
    (process.env.AI_GATEWAY_API_KEY?.trim()?.startsWith('sk-')
      ? process.env.AI_GATEWAY_API_KEY.trim()
      : undefined);
  const gatewayKey = process.env.AI_GATEWAY_API_KEY?.trim();
  const hasGatewayOidc = Boolean(process.env.VERCEL_OIDC_TOKEN);

  if (openaiKey) {
    const openai = createOpenAI({ apiKey: openaiKey });
    return {
      kind: 'openai' as const,
      model: openai('gpt-4o-mini'),
    };
  }

  if ((gatewayKey && !gatewayKey.startsWith('sk-')) || hasGatewayOidc) {
    return {
      kind: 'gateway' as const,
      model: 'google/gemini-2.5-flash' as const,
    };
  }

  return null;
}

function lastUserText(messages: UIMessage[]) {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (message.role !== 'user') continue;
    const text = message.parts
      .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
      .map((part) => part.text)
      .join(' ')
      .trim();
    if (text) return text;
  }
  return '';
}

function heuristicSearchInput(text: string) {
  const lower = text.toLowerCase();
  const scope = /\b(company|companies|org|organization)\b/.test(lower)
    ? ('company' as const)
    : /\b(person|people|builder|author|by)\b/.test(lower)
      ? ('person' as const)
      : ('all' as const);
  const kind = lower.includes('project')
    ? ('project' as const)
    : lower.includes('challenge')
      ? ('challenge' as const)
      : ('any' as const);
  const difficulty = lower.includes('beginner')
    ? ('Beginner' as const)
    : lower.includes('intermediate')
      ? ('Intermediate' as const)
      : undefined;
  const industries = [
    'Climate & energy',
    'Social impact',
    'Fintech',
    'Healthcare',
    'Cybersecurity',
    'Consumer tech',
    'Enterprise software',
    'E-commerce',
    'Entertainment',
    'Education',
    'Travel',
    'Transportation',
    'Productivity',
    'Design tools',
    'Social media',
    'AI & hardware',
    'Aerospace',
  ];
  const technologies = [
    'Python',
    'React',
    'JavaScript',
    'TypeScript',
    'Supabase',
    'Accessibility',
    'Cybersecurity',
    'Data visualization',
    'Web development',
    'AI / ML',
    'Mobile',
    'API integration',
  ];
  const industry = industries.find((value) => {
    const needle = value.toLowerCase();
    return (
      lower.includes(needle) ||
      needle.split(/[^a-z0-9]+/).some((word) => word.length > 3 && lower.includes(word))
    );
  });
  const technology = technologies.find((value) => lower.includes(value.toLowerCase()));
  return {
    query: text,
    scope,
    kind,
    industry,
    technology,
    difficulty,
    limit: 5,
  };
}

function localAssistantReply(catalogue: CatalogueItem[], messages: UIMessage[]) {
  const text = lastUserText(messages) || 'interesting projects';
  const input = heuristicSearchInput(text);
  const result = searchCatalogue(catalogue, input);
  const lines =
    result.matches.length === 0
      ? [
          'I could not find a strong match in the demo catalogue yet.',
          'Try a skill like “React”, an industry like “healthcare”, or “beginner challenges”.',
        ]
      : [
          `Here are ${result.matches.length} posting${result.matches.length === 1 ? '' : 's'} that fit:`,
          ...result.matches.map(
            (hit, index) =>
              `${index + 1}. ${hit.title} — ${hit.company} (${hit.kind}, ${hit.industry})`,
          ),
          'Tap a result below to open it in the catalogue, or ask me to narrow by tech or difficulty.',
        ];

  return createUIMessageStreamResponse({
    stream: createUIMessageStream({
      originalMessages: messages,
      execute: ({ writer }) => {
        const textId = 'local-text';
        const toolCallId = 'local-search';
        writer.write({ type: 'start' });
        writer.write({ type: 'text-start', id: textId });
        writer.write({ type: 'text-delta', id: textId, delta: lines.join('\n') });
        writer.write({ type: 'text-end', id: textId });
        writer.write({
          type: 'tool-input-available',
          toolCallId,
          toolName: 'searchPostings',
          input,
        });
        writer.write({
          type: 'tool-output-available',
          toolCallId,
          output: result,
        });
        writer.write({ type: 'finish' });
      },
    }),
  });
}

function errorReply(message: string) {
  return createUIMessageStreamResponse({
    stream: createUIMessageStream({
      execute: ({ writer }) => {
        const textId = 'error-text';
        writer.write({ type: 'start' });
        writer.write({ type: 'text-start', id: textId });
        writer.write({ type: 'text-delta', id: textId, delta: message });
        writer.write({ type: 'text-end', id: textId });
        writer.write({ type: 'finish' });
      },
    }),
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const messages = (body.messages ?? []) as UIMessage[];
  const extras = (body.catalogueExtras ?? []) as CatalogueItem[];
  const catalogue = mergeCatalogue(extras);
  const searchPostings = createSearchTool(catalogue);
  const resolved = resolveModel();

  if (!resolved) {
    return localAssistantReply(catalogue, messages);
  }

  try {
    const result = streamText({
      model: resolved.model,
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
      stopWhen: isStepCount(4),
      tools: { searchPostings },
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({
        stream: result.stream,
        tools: { searchPostings },
        onError: (error) =>
          error instanceof Error ? error.message : 'Chat model request failed.',
      }),
    });
  } catch (error) {
    console.error('[chat]', error);
    return errorReply(
      error instanceof Error
        ? `Chat model error: ${error.message}`
        : 'Chat model request failed. Check your API key and try again.',
    );
  }
}
