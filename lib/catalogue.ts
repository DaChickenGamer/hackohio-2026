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

export type SearchScope = 'all' | 'company' | 'person';

export type CatalogueSearchInput = {
  query?: string;
  scope?: SearchScope;
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
    id: 'google',
    title: 'Help people find clearer answers, faster.',
    company: 'Google',
    description:
      'Prototype a search result card that explains why a page matched and what to do next.',
    tags: ['JavaScript', 'Web development'],
    industry: 'Consumer tech',
    difficulty: 'Beginner',
    color: 'blue',
    icon: '⌕',
    builders: 48,
    kind: 'challenge',
  },
  {
    id: 'microsoft',
    title: 'Make collaboration feel effortless.',
    company: 'Microsoft',
    description:
      'Build a lightweight shared notes experience for students working across time zones.',
    tags: ['React', 'TypeScript'],
    industry: 'Enterprise software',
    difficulty: 'Intermediate',
    color: 'blue',
    icon: '▣',
    builders: 41,
    kind: 'challenge',
  },
  {
    id: 'amazon',
    title: 'Turn delivery data into better decisions.',
    company: 'Amazon',
    description:
      'Create a small dashboard that surfaces delays, routes, and customer impact at a glance.',
    tags: ['Python', 'Data visualization'],
    industry: 'E-commerce',
    difficulty: 'Intermediate',
    color: 'orange',
    icon: '▦',
    builders: 37,
    kind: 'challenge',
  },
  {
    id: 'apple',
    title: 'Design a calmer everyday utility.',
    company: 'Apple',
    description:
      'Ship a focused habit tracker with clean interactions and thoughtful empty states.',
    tags: ['Swift', 'Mobile'],
    industry: 'Consumer tech',
    difficulty: 'Intermediate',
    color: 'purple',
    icon: '◐',
    builders: 29,
    kind: 'challenge',
  },
  {
    id: 'meta',
    title: 'Help communities stay safer together.',
    company: 'Meta',
    description:
      'Prototype a reporting flow that helps people flag harmful content without friction.',
    tags: ['React', 'Product design'],
    industry: 'Social media',
    difficulty: 'Beginner',
    color: 'blue',
    icon: '◎',
    builders: 33,
    kind: 'challenge',
  },
  {
    id: 'netflix',
    title: 'Recommend the next great watch.',
    company: 'Netflix',
    description:
      'Build a taste profile quiz that suggests titles based on mood, time, and company.',
    tags: ['JavaScript', 'AI / ML'],
    industry: 'Entertainment',
    difficulty: 'Beginner',
    color: 'pink',
    icon: '▶',
    builders: 44,
    kind: 'challenge',
  },
  {
    id: 'spotify',
    title: 'Make playlists feel more personal.',
    company: 'Spotify',
    description:
      'Create a playlist builder that groups songs by energy, focus, or late-night vibes.',
    tags: ['React', 'API integration'],
    industry: 'Entertainment',
    difficulty: 'Intermediate',
    color: 'green',
    icon: '♪',
    builders: 39,
    kind: 'challenge',
  },
  {
    id: 'airbnb',
    title: 'Help hosts tell a better story.',
    company: 'Airbnb',
    description:
      'Design a listing checklist that turns photos and amenities into a clearer guest pitch.',
    tags: ['React', 'Product design'],
    industry: 'Travel',
    difficulty: 'Beginner',
    color: 'pink',
    icon: '⌂',
    builders: 27,
    kind: 'challenge',
  },
  {
    id: 'uber',
    title: 'Make wait times easier to understand.',
    company: 'Uber',
    description:
      'Build a rider status view that explains ETAs, surges, and nearby driver activity simply.',
    tags: ['JavaScript', 'Maps'],
    industry: 'Transportation',
    difficulty: 'Intermediate',
    color: 'yellow',
    icon: '➔',
    builders: 31,
    kind: 'challenge',
  },
  {
    id: 'stripe',
    title: 'Make first payments feel trustworthy.',
    company: 'Stripe',
    description:
      'Prototype a checkout experience with clear totals, receipts, and error recovery.',
    tags: ['TypeScript', 'Web development'],
    industry: 'Fintech',
    difficulty: 'Intermediate',
    color: 'purple',
    icon: '◆',
    builders: 36,
    kind: 'challenge',
  },
  {
    id: 'shopify',
    title: 'Help a small shop launch online.',
    company: 'Shopify',
    description:
      'Create a storefront starter for a campus maker selling merch in a weekend.',
    tags: ['React', 'E-commerce'],
    industry: 'E-commerce',
    difficulty: 'Beginner',
    color: 'green',
    icon: '▤',
    builders: 34,
    kind: 'challenge',
  },
  {
    id: 'notion',
    title: 'Turn messy notes into a system.',
    company: 'Notion',
    description:
      'Build a student planner template that links classes, deadlines, and weekly goals.',
    tags: ['JavaScript', 'Product design'],
    industry: 'Productivity',
    difficulty: 'Beginner',
    color: 'yellow',
    icon: '▣',
    builders: 42,
    kind: 'challenge',
  },
  {
    id: 'figma',
    title: 'Bridge design handoff without chaos.',
    company: 'Figma',
    description:
      'Make a component inventory page that shows states, tokens, and usage notes clearly.',
    tags: ['React', 'Design systems'],
    industry: 'Design tools',
    difficulty: 'Intermediate',
    color: 'purple',
    icon: '✦',
    builders: 28,
    kind: 'challenge',
  },
  {
    id: 'slack',
    title: 'Cut through notification noise.',
    company: 'Slack',
    description:
      'Prototype an inbox digest that groups mentions by project and urgency.',
    tags: ['TypeScript', 'API integration'],
    industry: 'Productivity',
    difficulty: 'Intermediate',
    color: 'pink',
    icon: '☰',
    builders: 30,
    kind: 'challenge',
  },
  {
    id: 'discord',
    title: 'Help communities welcome new members.',
    company: 'Discord',
    description:
      'Build an onboarding bot flow that introduces rules, roles, and first channels gently.',
    tags: ['JavaScript', 'Bots'],
    industry: 'Social media',
    difficulty: 'Beginner',
    color: 'blue',
    icon: '◈',
    builders: 35,
    kind: 'challenge',
  },
  {
    id: 'tesla',
    title: 'Visualize energy use at home.',
    company: 'Tesla',
    description:
      'Create a solar and battery dashboard that explains savings in plain language.',
    tags: ['Python', 'Data visualization'],
    industry: 'Climate & energy',
    difficulty: 'Intermediate',
    color: 'orange',
    icon: '⚡',
    builders: 26,
    kind: 'challenge',
  },
  {
    id: 'nvidia',
    title: 'Make model experiments easier to compare.',
    company: 'NVIDIA',
    description:
      'Build a tiny experiment log that tracks prompts, settings, and result quality.',
    tags: ['Python', 'AI / ML'],
    industry: 'AI & hardware',
    difficulty: 'Intermediate',
    color: 'green',
    icon: '▣',
    builders: 23,
    kind: 'challenge',
  },
  {
    id: 'adobe',
    title: 'Speed up creative review cycles.',
    company: 'Adobe',
    description:
      'Prototype a comment timeline that keeps feedback tied to specific design frames.',
    tags: ['React', 'Product design'],
    industry: 'Design tools',
    difficulty: 'Beginner',
    color: 'pink',
    icon: '✎',
    builders: 25,
    kind: 'challenge',
  },
  {
    id: 'salesforce',
    title: 'Help a team see the next best action.',
    company: 'Salesforce',
    description:
      'Create a pipeline board that highlights stalled leads and suggested follow-ups.',
    tags: ['JavaScript', 'CRM'],
    industry: 'Enterprise software',
    difficulty: 'Intermediate',
    color: 'blue',
    icon: '☁',
    builders: 22,
    kind: 'challenge',
  },
  {
    id: 'ibm',
    title: 'Explain a complex system simply.',
    company: 'IBM',
    description:
      'Build an interactive diagram that walks through a cloud architecture for newcomers.',
    tags: ['React', 'Documentation'],
    industry: 'Enterprise software',
    difficulty: 'Beginner',
    color: 'blue',
    icon: '⬡',
    builders: 19,
    kind: 'challenge',
  },
  {
    id: 'intel',
    title: 'Make performance metrics readable.',
    company: 'Intel',
    description:
      'Design a chip performance summary that compares workloads without drowning in jargon.',
    tags: ['Python', 'Data visualization'],
    industry: 'AI & hardware',
    difficulty: 'Intermediate',
    color: 'blue',
    icon: '▣',
    builders: 17,
    kind: 'challenge',
  },
  {
    id: 'duolingo',
    title: 'Keep language practice sticky.',
    company: 'Duolingo',
    description:
      'Prototype a five-minute daily streak flow with encouraging progress feedback.',
    tags: ['React', 'Mobile'],
    industry: 'Education',
    difficulty: 'Beginner',
    color: 'green',
    icon: '✎',
    builders: 40,
    kind: 'challenge',
  },
  {
    id: 'coinbase',
    title: 'Make crypto basics less intimidating.',
    company: 'Coinbase',
    description:
      'Build an explainer that shows portfolio changes and fees with plain-language tips.',
    tags: ['TypeScript', 'Fintech'],
    industry: 'Fintech',
    difficulty: 'Intermediate',
    color: 'blue',
    icon: '◎',
    builders: 21,
    kind: 'challenge',
  },
  {
    id: 'twitch',
    title: 'Help creators prep a better stream.',
    company: 'Twitch',
    description:
      'Create a stream checklist with overlays, alerts, and community shout-outs ready to go.',
    tags: ['JavaScript', 'Streaming'],
    industry: 'Entertainment',
    difficulty: 'Beginner',
    color: 'purple',
    icon: '▶',
    builders: 24,
    kind: 'challenge',
  },
  {
    id: 'nasa',
    title: 'Bring space data down to Earth.',
    company: 'NASA',
    description:
      'Visualize open mission telemetry so students can explore orbits and weather patterns.',
    tags: ['Python', 'Data visualization'],
    industry: 'Aerospace',
    difficulty: 'Intermediate',
    color: 'blue',
    icon: '★',
    builders: 20,
    kind: 'challenge',
  },
  {
    id: 'openai',
    title: 'Make AI answers easier to trust.',
    company: 'OpenAI',
    description:
      'Prototype a citation panel that shows sources, confidence, and what still needs checking.',
    tags: ['TypeScript', 'AI / ML'],
    industry: 'AI & hardware',
    difficulty: 'Intermediate',
    color: 'green',
    icon: '◎',
    builders: 46,
    kind: 'challenge',
  },
  {
    id: 'anthropic',
    title: 'Help people write safer prompts.',
    company: 'Anthropic',
    description:
      'Build a prompt coach that flags vague requests and suggests clearer, safer wording.',
    tags: ['React', 'AI / ML'],
    industry: 'AI & hardware',
    difficulty: 'Beginner',
    color: 'orange',
    icon: '✎',
    builders: 32,
    kind: 'challenge',
  },
  {
    id: 'github',
    title: 'Make first contributions less scary.',
    company: 'GitHub',
    description:
      'Create an onboarding checklist that walks beginners through forks, PRs, and reviews.',
    tags: ['JavaScript', 'Developer tools'],
    industry: 'Developer tools',
    difficulty: 'Beginner',
    color: 'purple',
    icon: '⌘',
    builders: 51,
    kind: 'challenge',
  },
  {
    id: 'vercel',
    title: 'Ship a preview that teams can review fast.',
    company: 'Vercel',
    description:
      'Build a deployment status board with preview links, checks, and comment threads.',
    tags: ['Next.js', 'TypeScript'],
    industry: 'Developer tools',
    difficulty: 'Intermediate',
    color: 'blue',
    icon: '▲',
    builders: 38,
    kind: 'challenge',
  },
  {
    id: 'supabase',
    title: 'Stand up auth without the headaches.',
    company: 'Supabase',
    description:
      'Prototype a student club login flow with profiles, roles, and a protected dashboard.',
    tags: ['React', 'Supabase'],
    industry: 'Developer tools',
    difficulty: 'Beginner',
    color: 'green',
    icon: '⬡',
    builders: 43,
    kind: 'challenge',
  },
  {
    id: 'linkedin',
    title: 'Help students tell their story better.',
    company: 'LinkedIn',
    description:
      'Create a profile strength checker that suggests projects, skills, and clearer headlines.',
    tags: ['React', 'Product design'],
    industry: 'Social media',
    difficulty: 'Beginner',
    color: 'blue',
    icon: 'in',
    builders: 37,
    kind: 'challenge',
  },
  {
    id: 'paypal',
    title: 'Make peer payments crystal clear.',
    company: 'PayPal',
    description:
      'Design a split-bill flow that shows who owes what before anyone taps send.',
    tags: ['JavaScript', 'Fintech'],
    industry: 'Fintech',
    difficulty: 'Beginner',
    color: 'blue',
    icon: '$',
    builders: 29,
    kind: 'challenge',
  },
  {
    id: 'visa',
    title: 'Detect weird spending sooner.',
    company: 'Visa',
    description:
      'Build a transaction alert mock that explains why a charge looks unusual.',
    tags: ['Python', 'Fintech'],
    industry: 'Fintech',
    difficulty: 'Intermediate',
    color: 'blue',
    icon: '◇',
    builders: 26,
    kind: 'challenge',
  },
  {
    id: 'target',
    title: 'Help shoppers find the right aisle.',
    company: 'Target',
    description:
      'Prototype an in-store finder that maps products to nearby shelves and pickup options.',
    tags: ['React', 'Maps'],
    industry: 'Retail',
    difficulty: 'Beginner',
    color: 'pink',
    icon: '◎',
    builders: 22,
    kind: 'challenge',
  },
  {
    id: 'walmart',
    title: 'Make grocery lists smarter.',
    company: 'Walmart',
    description:
      'Create a list builder that groups items by aisle and suggests cheaper swaps.',
    tags: ['JavaScript', 'Mobile'],
    industry: 'Retail',
    difficulty: 'Beginner',
    color: 'blue',
    icon: '▤',
    builders: 27,
    kind: 'challenge',
  },
  {
    id: 'nike',
    title: 'Turn workouts into visible progress.',
    company: 'Nike',
    description:
      'Build a run log that highlights streaks, pace trends, and next-week goals.',
    tags: ['React', 'Mobile'],
    industry: 'Consumer tech',
    difficulty: 'Intermediate',
    color: 'orange',
    icon: '→',
    builders: 33,
    kind: 'challenge',
  },
  {
    id: 'starbucks',
    title: 'Simplify the custom order chaos.',
    company: 'Starbucks',
    description:
      'Prototype a drink builder with saved favorites, allergens, and pickup timing.',
    tags: ['React', 'Product design'],
    industry: 'Retail',
    difficulty: 'Beginner',
    color: 'green',
    icon: '☕',
    builders: 31,
    kind: 'challenge',
  },
  {
    id: 'lyft',
    title: 'Make shared rides easier to coordinate.',
    company: 'Lyft',
    description:
      'Design a carpool planner that matches nearby classmates heading the same way.',
    tags: ['JavaScript', 'Maps'],
    industry: 'Transportation',
    difficulty: 'Intermediate',
    color: 'pink',
    icon: '➔',
    builders: 18,
    kind: 'challenge',
  },
  {
    id: 'doordash',
    title: 'Help restaurants prep for rush hour.',
    company: 'DoorDash',
    description:
      'Create a kitchen ticket board that prioritizes orders by ready time and distance.',
    tags: ['TypeScript', 'Product design'],
    industry: 'Food delivery',
    difficulty: 'Intermediate',
    color: 'pink',
    icon: '▦',
    builders: 24,
    kind: 'challenge',
  },
  {
    id: 'instacart',
    title: 'Keep substitutions from surprising people.',
    company: 'Instacart',
    description:
      'Build a substitution picker that shows options, prices, and shopper notes clearly.',
    tags: ['React', 'E-commerce'],
    industry: 'Food delivery',
    difficulty: 'Beginner',
    color: 'green',
    icon: '▣',
    builders: 23,
    kind: 'challenge',
  },
  {
    id: 'robinhood',
    title: 'Teach investing without the jargon.',
    company: 'Robinhood',
    description:
      'Make an interactive glossary that explains orders, fees, and risk with tiny demos.',
    tags: ['JavaScript', 'Fintech'],
    industry: 'Fintech',
    difficulty: 'Beginner',
    color: 'green',
    icon: '↗',
    builders: 28,
    kind: 'challenge',
  },
  {
    id: 'dropbox',
    title: 'Make file sharing feel safer.',
    company: 'Dropbox',
    description:
      'Prototype link permissions with expiry, password protection, and activity history.',
    tags: ['React', 'Security'],
    industry: 'Productivity',
    difficulty: 'Intermediate',
    color: 'blue',
    icon: '▤',
    builders: 21,
    kind: 'challenge',
  },
  {
    id: 'zoom',
    title: 'Help meetings start on time.',
    company: 'Zoom',
    description:
      'Build a pre-call checklist for audio, lighting, agenda, and waiting-room settings.',
    tags: ['JavaScript', 'Product design'],
    industry: 'Productivity',
    difficulty: 'Beginner',
    color: 'blue',
    icon: '◎',
    builders: 30,
    kind: 'challenge',
  },
  {
    id: 'atlassian',
    title: 'Keep sprint boards actually useful.',
    company: 'Atlassian',
    description:
      'Create a board health view that flags blocked tickets and missing owners.',
    tags: ['React', 'TypeScript'],
    industry: 'Enterprise software',
    difficulty: 'Intermediate',
    color: 'blue',
    icon: '▣',
    builders: 25,
    kind: 'challenge',
  },
  {
    id: 'unity',
    title: 'Teach game loops with a tiny demo.',
    company: 'Unity',
    description:
      'Ship a mini playable that shows scoring, collisions, and a restart flow students can remix.',
    tags: ['C#', 'Game development'],
    industry: 'Entertainment',
    difficulty: 'Intermediate',
    color: 'yellow',
    icon: '▶',
    builders: 27,
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
  {
    id: 'p4',
    title: 'RouteGlow',
    company: 'by Sam Okonkwo',
    description:
      'A campus transit map that highlights the next bus and walking time between stops.',
    tags: ['React', 'Maps'],
    industry: 'Transportation',
    difficulty: 'Intermediate',
    color: 'blue',
    icon: '➔',
    builders: 7,
    kind: 'project',
    url: 'https://github.com/topics/transit-map',
    owner: 'Sam Okonkwo',
  },
  {
    id: 'p5',
    title: 'ShelfSwap',
    company: 'by Priya Nair',
    description:
      'A neighborhood book exchange board with availability, pickup notes, and ratings.',
    tags: ['Supabase', 'React'],
    industry: 'Social impact',
    difficulty: 'Beginner',
    color: 'yellow',
    icon: '▤',
    builders: 9,
    kind: 'project',
    url: 'https://github.com/topics/book-exchange',
    owner: 'Priya Nair',
  },
  {
    id: 'p6',
    title: 'ClipGuard',
    company: 'by Evan Brooks',
    description:
      'A phishing quiz that scores decisions and explains what a safer click looks like.',
    tags: ['JavaScript', 'Cybersecurity'],
    industry: 'Cybersecurity',
    difficulty: 'Beginner',
    color: 'blue',
    icon: '◇',
    builders: 14,
    kind: 'project',
    url: 'https://github.com/topics/phishing-awareness',
    owner: 'Evan Brooks',
  },
  {
    id: 'p7',
    title: 'MealMatch',
    company: 'by Lina Ortiz',
    description:
      'A surplus-food matcher that connects dining halls with nearby student groups.',
    tags: ['React', 'Supabase'],
    industry: 'Social impact',
    difficulty: 'Intermediate',
    color: 'green',
    icon: '❋',
    builders: 6,
    kind: 'project',
    url: 'https://github.com/topics/food-waste',
    owner: 'Lina Ortiz',
  },
  {
    id: 'p8',
    title: 'StudioBoard',
    company: 'by Chris Park',
    description:
      'A design critique wall where teammates leave frame-level notes and approvals.',
    tags: ['React', 'Design systems'],
    industry: 'Design tools',
    difficulty: 'Intermediate',
    color: 'purple',
    icon: '✎',
    builders: 10,
    kind: 'project',
    url: 'https://github.com/topics/design-critique',
    owner: 'Chris Park',
  },
  {
    id: 'p9',
    title: 'PaySplit',
    company: 'by Nora Hale',
    description:
      'A roommate expense splitter with receipts, reminders, and monthly summaries.',
    tags: ['TypeScript', 'Fintech'],
    industry: 'Fintech',
    difficulty: 'Beginner',
    color: 'orange',
    icon: '$',
    builders: 12,
    kind: 'project',
    url: 'https://github.com/topics/expense-splitter',
    owner: 'Nora Hale',
  },
  {
    id: 'p10',
    title: 'OrbitLab',
    company: 'by Theo Grant',
    description:
      'An open-data viewer for satellite passes with simple charts students can remix.',
    tags: ['Python', 'Data visualization'],
    industry: 'Aerospace',
    difficulty: 'Intermediate',
    color: 'blue',
    icon: '★',
    builders: 4,
    kind: 'project',
    url: 'https://github.com/topics/satellite-tracking',
    owner: 'Theo Grant',
  },
  {
    id: 'p11',
    title: 'PromptPad',
    company: 'by Avery Kim',
    description:
      'A prompt notebook that saves versions, ratings, and side-by-side model outputs.',
    tags: ['TypeScript', 'AI / ML'],
    industry: 'AI & hardware',
    difficulty: 'Intermediate',
    color: 'green',
    icon: '◎',
    builders: 15,
    kind: 'project',
    url: 'https://github.com/topics/prompt-engineering',
    owner: 'Avery Kim',
  },
  {
    id: 'p12',
    title: 'ClubDoor',
    company: 'by Riley Vance',
    description:
      'An events RSVP app for student orgs with waitlists, check-in codes, and reminders.',
    tags: ['React', 'Supabase'],
    industry: 'Education',
    difficulty: 'Beginner',
    color: 'pink',
    icon: '⌂',
    builders: 8,
    kind: 'project',
    url: 'https://github.com/topics/event-rsvp',
    owner: 'Riley Vance',
  },
  {
    id: 'p13',
    title: 'LaneLite',
    company: 'by Morgan Ellis',
    description:
      'A bike-lane report tool that logs hazards with photos, severity, and city routes.',
    tags: ['JavaScript', 'Maps'],
    industry: 'Transportation',
    difficulty: 'Beginner',
    color: 'yellow',
    icon: '→',
    builders: 5,
    kind: 'project',
    url: 'https://github.com/topics/civic-tech',
    owner: 'Morgan Ellis',
  },
  {
    id: 'p14',
    title: 'CartCare',
    company: 'by Jade Nguyen',
    description:
      'A grocery substitution helper that respects preferences, budgets, and brands.',
    tags: ['React', 'E-commerce'],
    industry: 'Food delivery',
    difficulty: 'Beginner',
    color: 'green',
    icon: '▣',
    builders: 6,
    kind: 'project',
    url: 'https://github.com/topics/grocery-app',
    owner: 'Jade Nguyen',
  },
  {
    id: 'p15',
    title: 'TicketTide',
    company: 'by Omar Hassan',
    description:
      'A support inbox that clusters similar issues and suggests first-response drafts.',
    tags: ['TypeScript', 'AI / ML'],
    industry: 'Enterprise software',
    difficulty: 'Intermediate',
    color: 'blue',
    icon: '☰',
    builders: 9,
    kind: 'project',
    url: 'https://github.com/topics/helpdesk',
    owner: 'Omar Hassan',
  },
];

function queryTerms(query: string) {
  return query
    .toLowerCase()
    .split(/[^a-z0-9+/]+/)
    .filter((term) => term.length > 1);
}

/** Real company name (excludes community “by Name” labels). */
export function companyLabel(item: CatalogueItem) {
  if (item.kind === 'project') return '';
  if (item.company.toLowerCase().startsWith('by ')) return '';
  return item.company.trim();
}

/** Builder / person name for community projects. */
export function personLabel(item: CatalogueItem) {
  if (item.owner?.trim()) return item.owner.trim();
  if (item.company.toLowerCase().startsWith('by ')) return item.company.slice(3).trim();
  return '';
}

function parseScopedQuery(raw: string): { scope: SearchScope; query: string } {
  const trimmed = raw.trim();
  const prefixed = trimmed.match(/^(company|org|person|people|builder|user)\s*:\s*(.+)$/i);
  if (!prefixed) return { scope: 'all', query: trimmed };
  const key = prefixed[1]!.toLowerCase();
  const query = prefixed[2]!.trim();
  if (key === 'company' || key === 'org') return { scope: 'company', query };
  return { scope: 'person', query };
}

function fieldScore(haystack: string, query: string, terms: string[], weight: number) {
  const value = haystack.toLowerCase();
  if (!value) return 0;
  let score = 0;
  if (value === query.toLowerCase()) score += weight * 4;
  if (value.startsWith(query.toLowerCase())) score += weight * 3;
  if (value.includes(query.toLowerCase())) score += weight * 2;
  for (const term of terms) {
    if (value.includes(term)) score += weight;
  }
  return score;
}

export function scoreItem(
  item: CatalogueItem,
  query: string,
  scope: SearchScope = 'all',
) {
  const parsed = scope === 'all' ? parseScopedQuery(query) : { scope, query };
  const activeScope = parsed.scope;
  const activeQuery = parsed.query.trim();
  if (!activeQuery) return 1;

  const terms = queryTerms(activeQuery);
  if (terms.length === 0 && activeQuery.length < 2) return 1;

  const company = companyLabel(item);
  const person = personLabel(item);

  if (activeScope === 'company') {
    return fieldScore(company, activeQuery, terms, 4);
  }
  if (activeScope === 'person') {
    return fieldScore(person, activeQuery, terms, 4);
  }

  return (
    fieldScore(item.title, activeQuery, terms, 4) +
    fieldScore(company, activeQuery, terms, 5) +
    fieldScore(person, activeQuery, terms, 5) +
    fieldScore(item.description, activeQuery, terms, 2) +
    fieldScore(item.industry, activeQuery, terms, 3) +
    fieldScore(item.tags.join(' '), activeQuery, terms, 3) +
    fieldScore(item.difficulty, activeQuery, terms, 1) +
    fieldScore(item.kind, activeQuery, terms, 1)
  );
}

export function itemMatchesQuery(
  item: CatalogueItem,
  query: string,
  scope: SearchScope = 'all',
) {
  if (!query.trim()) return true;
  return scoreItem(item, query, scope) > 0;
}

export function searchCatalogue(
  items: CatalogueItem[],
  input: CatalogueSearchInput = {},
): {
  matches: CatalogueHit[];
  filters: {
    query: string;
    scope: SearchScope;
    kind: 'challenge' | 'project' | 'any';
    industry?: string;
    technology?: string;
    difficulty?: string;
  };
  total: number;
} {
  const rawQuery = input.query?.trim() ?? '';
  const parsed = parseScopedQuery(rawQuery);
  const scope = input.scope ?? parsed.scope;
  const query = input.scope ? rawQuery : parsed.query;
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
    .map((item) => ({ item, score: scoreItem(item, query, scope) }))
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
      scope,
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
