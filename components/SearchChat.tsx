'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import type { CatalogueHit, CatalogueItem } from '@/lib/catalogue';

type SearchFilters = {
  query: string;
  kind?: 'challenge' | 'project' | 'any';
  industry?: string;
  technology?: string;
  difficulty?: string;
};

type Props = {
  catalogueExtras: CatalogueItem[];
  onApplyFilters: (filters: SearchFilters) => void;
  onOpenItem: (id: string) => void;
};

type SearchOutput = {
  matches?: CatalogueHit[];
  total?: number;
  filters?: SearchFilters;
};

const suggestions = [
  'Beginner React challenges',
  'Something in healthcare',
  'Python data projects',
  'Climate & energy builds',
];

function FolioWordmark({ light = false }: { light?: boolean }) {
  return (
    <span className={`folio-wordmark ${light ? 'is-light' : ''}`}>
      folio<span>.</span>
    </span>
  );
}

function messageText(message: UIMessage) {
  return message.parts
    .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
    .map((part) => part.text)
    .join('\n')
    .trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function inlineMarkdown(value: string) {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*(?!\s)(.+?)(?!\s)\*(?!\*)/g, '$1<em>$2</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function renderChatHtml(text: string) {
  const cleaned = text
    .replace(/\r\n/g, '\n')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*]{3,}\s*$/gm, '');
  const blocks = cleaned
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks
    .map((block) => {
      const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
      const isList = lines.every((line) => /^([-*•]|\d+[.)])\s+/.test(line));
      if (isList) {
        const items = lines
          .map((line) => line.replace(/^([-*•]|\d+[.)])\s+/, ''))
          .map((item) => `<li>${inlineMarkdown(item)}</li>`)
          .join('');
        return `<ul>${items}</ul>`;
      }
      return `<p>${lines.map((line) => inlineMarkdown(line)).join('<br />')}</p>`;
    })
    .join('');
}

function searchOutputs(message: UIMessage): SearchOutput[] {
  return message.parts.flatMap((part) => {
    const isSearchTool =
      part.type === 'tool-searchPostings' ||
      (part.type === 'dynamic-tool' && part.toolName === 'searchPostings');
    if (!isSearchTool || part.state !== 'output-available') return [];
    return [part.output as SearchOutput];
  });
}

export default function SearchChat({
  catalogueExtras,
  onApplyFilters,
  onOpenItem,
}: Props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const extrasRef = useRef(catalogueExtras);
  const appliedRef = useRef<string>('');
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    extrasRef.current = catalogueExtras;
  }, [catalogueExtras]);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: '/api/chat',
        body: () => ({ catalogueExtras: extrasRef.current }),
      }),
    [],
  );

  const { messages, sendMessage, status, error, setMessages } = useChat({
    transport,
  });

  const busy = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy, open]);

  useEffect(() => {
    const latest = [...messages].reverse().find((message) => message.role === 'assistant');
    if (!latest) return;
    const outputs = searchOutputs(latest);
    const withFilters = outputs.find((output) => output.filters);
    if (!withFilters?.filters) return;
    const key = JSON.stringify(withFilters.filters);
    if (appliedRef.current === key) return;
    appliedRef.current = key;
    onApplyFilters(withFilters.filters);
  }, [messages, onApplyFilters]);

  function submit(text: string) {
    const next = text.trim();
    if (!next || busy) return;
    void sendMessage({ text: next });
    setInput('');
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    submit(input);
  }

  return (
    <div className={`search-chat ${open ? 'is-open' : ''}`}>
      {open && (
        <section id="search-chat-panel" className="search-chat-panel" aria-label="Folio discovery assistant">
          <header className="search-chat-header">
            <div className="search-chat-brand">
              <FolioWordmark light />
              <p className="search-chat-kicker">Catalogue discovery</p>
            </div>
            <div className="search-chat-header-actions">
              <button
                type="button"
                className="search-chat-ghost"
                onClick={() => {
                  setMessages([]);
                  appliedRef.current = '';
                }}
              >
                Clear
              </button>
              <button
                type="button"
                className="search-chat-ghost"
                aria-label="Close assistant"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </header>

          <div className="search-chat-body" ref={listRef}>
            {messages.length === 0 && (
              <div className="search-chat-empty">
                <FolioWordmark />
                <strong>Find a posting worth building.</strong>
                <p>
                  Ask about an industry, stack, or difficulty. Folio will search the catalogue and surface matching
                  challenges and community projects.
                </p>
                <div className="search-chat-suggestions">
                  {suggestions.map((prompt) => (
                    <button key={prompt} type="button" onClick={() => submit(prompt)}>
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => {
              const text = messageText(message);
              const hits = searchOutputs(message).flatMap((output) => output.matches ?? []);
              const isUser = message.role === 'user';
              return (
                <article
                  key={message.id}
                  className={`search-chat-turn ${isUser ? 'is-user' : 'is-assistant'}`}
                >
                  <div className="search-chat-turn-meta">
                    {isUser ? <span className="search-chat-you">You</span> : <FolioWordmark />}
                  </div>
                  {text && (
                    <div
                      className="search-chat-copy"
                      dangerouslySetInnerHTML={{ __html: renderChatHtml(text) }}
                    />
                  )}
                  {hits.length > 0 && (
                    <div className="search-chat-hits">
                      {hits.map((hit) => (
                        <button
                          key={`${message.id}-${hit.id}`}
                          type="button"
                          className="search-chat-hit"
                          onClick={() => onOpenItem(hit.id)}
                        >
                          <span className="search-chat-hit-kind">
                            {hit.kind === 'challenge' ? 'Challenge' : 'Project'}
                          </span>
                          <strong>{hit.title}</strong>
                          <small>
                            {hit.company} · {hit.industry} · {hit.difficulty}
                          </small>
                        </button>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}

            {busy && <div className="search-chat-typing">Searching the catalogue…</div>}
            {error && (
              <div className="search-chat-error" role="alert">
                Something went wrong. Try again in a moment.
              </div>
            )}
          </div>

          <form className="search-chat-form" onSubmit={onSubmit}>
            <label className="search-chat-field">
              <span className="sr-only">Ask Folio</span>
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="What do you want to build?"
                aria-label="Ask Folio about postings"
                disabled={busy}
              />
            </label>
            <button type="submit" className="search-chat-submit" disabled={busy || !input.trim()}>
              Search
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="search-chat-launch"
        aria-expanded={open}
        aria-controls="search-chat-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <FolioWordmark light />
        <span>{open ? 'Hide assistant' : 'Ask about postings'}</span>
      </button>
    </div>
  );
}
