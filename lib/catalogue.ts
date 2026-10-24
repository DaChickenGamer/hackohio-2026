export type CatalogueItem = {
  id: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
  industry: string;
  difficulty: string;
  color: string;
  icon: string;
  builders: number;
  kind: 'challenge' | 'project';
  url?: string;
  owner?: string;
};

export type CatalogueSearchInput = {
  query?: string;
  kind?: 'challenge' | 'project' | 'any';
  industry?: string;
  technology?: string;
  difficulty?: string;
  limit?: number;
};

export type CatalogueHit = {
  id: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
  industry: string;
  difficulty: string;
  kind: 'challenge' | 'project';
  builders: number;
};

export const catalogueSeeds: CatalogueItem[] = [
  {
    id: 'energy',
    title: 'Make clean energy a little smarter.',
    company: 'Fervo Energy',
    description:
      'Turn energy data into a dashboard that helps people understand their impact.',
    tags: ['Python', 'Data visualization'],
    industry: 'Climate & energy',
    difficulty: 'Intermediate',
    color: 'green',
    icon: '↗',
    builders: 24,
    kind: 'challenge',
  },
  {
    id: 'access',
    title: 'A more accessible internet starts here.',
    company: 'Access Collective',
    description:
      'Build a tool that makes everyday websites easier for everyone to use.',
    tags: ['React', 'Accessibility'],
    industry: 'Social impact',
    difficulty: 'Beginner',
    color: 'purple',
    icon: '✳',
    builders: 18,
    kind: 'challenge',
  },
  {
    id: 'finance',
    title: 'Help students find their financial footing.',
    company: 'Northstar Finance',
    description:
      'Make budgeting feel less overwhelming with a thoughtful student-first app.',
    tags: ['JavaScript', 'Web development'],
    industry: 'Fintech',
    difficulty: 'Beginner',
    color: 'orange',
    icon: '◈',
    builders: 32,
    kind: 'challenge',
  },
  {
    id: 'health',
    title: 'Less waiting. Better care.',
    company: 'Carewell',
    description:
      'Explore how smarter scheduling can make community healthcare more accessible.',
    tags: ['Python', 'AI / ML'],
    industry: 'Healthcare',
    difficulty: 'Intermediate',
    color: 'pink',
    icon: '✚',
    builders: 12,
    kind: 'challenge',
  },
  {
    id: 'food',
    title: 'Good food deserves a second chance.',
    company: 'Second Harvest Lab',
    description:
      'Connect surplus food with the communities that need it through a simple local platform.',
    tags: ['React', 'Supabase'],
    industry: 'Social impact',
    difficulty: 'Intermediate',
    color: 'yellow',
    icon: '❋',
    builders: 21,
    kind: 'challenge',
  },
  {
    id: 'security',
    title: 'Make online safety second nature.',
    company: 'Open Shield',
    description:
      'Help people recognize phishing attempts with an interactive learning experience.',
    tags: ['Cybersecurity', 'JavaScript'],
    industry: 'Cybersecurity',
    difficulty: 'Beginner',
    color: 'blue',
    icon: '◇',
    builders: 16,
    kind: 'challenge',
  },
  {
    id: 'p1',
    title: 'WattWise',
    company: 'by Maya Chen',
    description:
      'A small dashboard that turns household electricity usage into everyday insights.',
    tags: ['Python', 'Data visualization'],
    industry: 'Climate & energy',
    difficulty: 'Intermediate',
    color: 'green',
    icon: '↗',
    builders: 8,
    kind: 'project',
    url: 'https://github.com/topics/energy-dashboard',
    owner: 'Maya Chen',
  },
  {
    id: 'p2',
    title: 'Focus Room',
    company: 'by Jordan Lee',
    description:
      'A calm, accessible workspace for students to plan their day and build better habits.',
    tags: ['React', 'Accessibility'],
    industry: 'Social impact',
    difficulty: 'Beginner',
    color: 'purple',
    icon: '✳',
    builders: 5,
    kind: 'project',
    url: 'https://github.com/topics/focus',
    owner: 'Jordan Lee',
  },
  {
    id: 'p3',
    title: 'Pocket Plan',
    company: 'by Alex Rivera',
    description:
      'An approachable budget planner built around the way students actually spend.',
    tags: ['JavaScript', 'Web development'],
    industry: 'Fintech',
    difficulty: 'Beginner',
    color: 'orange',
    icon: '◈',
    builders: 11,
    kind: 'project',
    url: 'https://github.com/topics/budget-app',
    owner: 'Alex Rivera',
  },
];

function scoreItem(item: CatalogueItem, query: string) {
  if (!query) return 1;
  const haystack =
    `${item.title} ${item.company} ${item.description} ${item.tags.join(' ')} ${item.industry} ${item.difficulty} ${item.kind}`.toLowerCase();
  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9+/]+/)
    .filter((term) => term.length > 1);
  if (terms.length === 0) return 1;
  let score = 0;
  for (const term of terms) {
    if (haystack.includes(term)) score += 2;
    if (item.title.toLowerCase().includes(term)) score += 3;
    if (item.tags.some((tag) => tag.toLowerCase().includes(term))) score += 2;
    if (item.industry.toLowerCase().includes(term)) score += 2;
  }
  return score;
}

export function searchCatalogue(
  items: CatalogueItem[],
  input: CatalogueSearchInput = {},
): { matches: CatalogueHit[]; filters: Required<Pick<CatalogueSearchInput, 'query' | 'kind'>> & Omit<CatalogueSearchInput, 'query' | 'kind' | 'limit'>; total: number } {
  const query = input.query?.trim() ?? '';
  const kind = input.kind ?? 'any';
  const industry = input.industry?.trim();
  const technology = input.technology?.trim();
  const difficulty = input.difficulty?.trim();
  const limit = Math.min(Math.max(input.limit ?? 6, 1), 12);

  const ranked = items
    .filter((item) => (kind === 'any' ? true : item.kind === kind))
    .filter((item) => (!industry ? true : item.industry.toLowerCase() === industry.toLowerCase()))
    .filter((item) =>
      !technology
        ? true
        : item.tags.some((tag) => tag.toLowerCase() === technology.toLowerCase()),
    )
    .filter((item) =>
      !difficulty ? true : item.difficulty.toLowerCase() === difficulty.toLowerCase(),
    )
    .map((item) => ({ item, score: scoreItem(item, query) }))
    .filter(({ score }) => (query ? score > 0 : true))
    .sort((a, b) => b.score - a.score || b.item.builders - a.item.builders);

  const matches = ranked.slice(0, limit).map(({ item }) => ({
    id: item.id,
    title: item.title,
    company: item.company,
    description: item.description,
    tags: item.tags,
    industry: item.industry,
    difficulty: item.difficulty,
    kind: item.kind,
    builders: item.builders,
  }));

  return {
    matches,
    total: ranked.length,
    filters: {
      query,
      kind,
      industry: industry || undefined,
      technology: technology || undefined,
      difficulty: difficulty || undefined,
    },
  };
}

export function mergeCatalogue(
  extras: CatalogueItem[] | undefined,
): CatalogueItem[] {
  if (!extras?.length) return catalogueSeeds;
  const seen = new Set(catalogueSeeds.map((item) => item.id));
  return [...catalogueSeeds, ...extras.filter((item) => !seen.has(item.id))];
}
