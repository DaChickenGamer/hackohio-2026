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

function messageText(message: UIMessage) {
  return message.parts
    .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
    .map((part) => part.text)
    .join('\n')
    .trim();
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
        <section id="search-chat-panel" className="search-chat-panel" aria-label="Posting search assistant">
          <header className="search-chat-header">
            <div>
              <p className="eyebrow">DISCOVERY ASSISTANT</p>
              <strong>Ask Folio what to build next.</strong>
            </div>
            <div className="search-chat-header-actions">
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setMessages([]);
                  appliedRef.current = '';
                }}
              >
                Clear
              </button>
              <button
                type="button"
                className="dialog-close"
                aria-label="Close assistant"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
            </div>
          </header>

          <div className="search-chat-body" ref={listRef}>
            {messages.length === 0 && (
              <div className="search-chat-empty">
                <span>✧</span>
                <p>Describe an interest, industry, or stack. I’ll search the catalogue for matching challenges and community projects.</p>
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
              return (
                <div
                  key={message.id}
                  className={`search-chat-bubble ${message.role === 'user' ? 'is-user' : 'is-assistant'}`}
                >
                  {text && <p>{text}</p>}
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
                </div>
              );
            })}

            {busy && <div className="search-chat-typing">Searching postings…</div>}
            {error && (
              <div className="search-chat-error" role="alert">
                Something went wrong. Try again in a moment.
              </div>
            )}
          </div>

          <form className="search-chat-form" onSubmit={onSubmit}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Try “beginner React” or “healthcare challenges”…"
              aria-label="Ask the posting search assistant"
              disabled={busy}
            />
            <button type="submit" className="primary" disabled={busy || !input.trim()}>
              Ask
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="search-chat-fab"
        aria-expanded={open}
        aria-controls="search-chat-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">{open ? '×' : '✦'}</span>
        {open ? 'Close' : 'Ask Folio'}
      </button>
    </div>
  );
}
