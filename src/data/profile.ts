export const SITE_URL = 'https://sushankghimire.com.np';

export type Experience = {
  company: string;
  role: string;
  start: string; // YYYY-MM
  end: string | null; // null = present
  location?: string;
  summary: string;
  bullets: string[];
  tags: string[];
  url?: string;
};

export type Study = {
  slug: string;
  title: string;
  method: string;
  dataset: string;
  summary: string;
  colab: { label: string; url: string }[];
  pdf: string;
};

export type CaseStudy = {
  id: string;
  label: string;
  title: string;
  context: string;
  built: string[];
  outcomes: { value: string; label: string }[];
  stack: string[];
  employer: string;
};

export const profile = {
  name: 'Sushank Ghimire',
  givenName: 'Sushank',
  familyName: 'Ghimire',
  alternateName: ['Sushank', 'Sushank G.'],
  jobTitle: 'AI Engineer',
  headline: 'AI engineer building LLM agents, RAG systems and document intelligence in production.',
  shortBio:
    'Sushank builds production AI systems: agents that call tools and browse the web, retrieval pipelines that survive messy real-world documents, and the FastAPI backends that keep them up.',
  location: { locality: 'Kathmandu', country: 'NP', countryName: 'Nepal' },
  email: 'sushankgghimire@gmail.com',
  phone: '+977-9863028272',
  url: SITE_URL,
  handles: { github: 'sushankgghimire', linkedin: 'sushankghimire', x: 'superdanktea', instagram: 'sushank.gh', facebook: 'sushank.gh' },
  socials: {
    github: 'https://github.com/sushankgghimire',
    linkedin: 'https://www.linkedin.com/in/sushankghimire/',
    x: 'https://x.com/superdanktea',
    instagram: 'https://www.instagram.com/sushank.gh/',
    facebook: 'https://www.facebook.com/sushank.gh',
  },
  cvPath: '/cv/Sushank-Ghimire-CV.pdf',
  ogImage: '/og/home.png',
  portrait: '/og/sushank-ghimire.png',
  currentEmployer: { name: 'Renegade Insurance', role: 'Software Development Engineer II' },
  education: {
    school: 'Thapathali Campus, Institute of Engineering',
    university: 'Tribhuvan University',
    degree: 'Bachelor of Engineering in Computer Engineering',
    start: 2019,
    end: 2023,
    score: '75% aggregate',
    location: 'Kathmandu, Nepal',
  },
  knowsAbout: [
    'Large language models',
    'Agentic AI systems',
    'Retrieval-augmented generation',
    'Prompt engineering',
    'LLM browser automation',
    'Document extraction and OCR',
    'Natural language processing',
    'Computer vision',
    'AWS Bedrock',
    'FastAPI',
    'Django',
    'PyTorch',
    'PostgreSQL',
  ],
  skills: {
    languages: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
    ai: [
      'Anthropic Claude',
      'OpenAI',
      'AWS Bedrock',
      'LangChain',
      'LlamaIndex',
      'PyTorch',
      'TensorFlow',
      'scikit-learn',
      'YOLO',
      'Hugging Face Transformers',
    ],
    backend: ['FastAPI', 'Django', 'Django REST Framework', 'PostgreSQL', 'MongoDB', 'Redis', 'Alembic'],
    infra: ['Docker', 'Nginx', 'AWS', 'GitHub Actions', 'Cloudflare', 'Linux VPS'],
    practices: ['Hybrid retrieval and re-ranking', 'Evaluation sets', 'Observability', 'Prompt optimization', 'Caching and parallelization'],
  },
  experience: [
    {
      company: 'Renegade Insurance',
      role: 'Software Development Engineer II',
      start: '2026-07',
      end: null,
      location: 'Remote',
      summary: 'Agents that operate real web applications and read real documents for insurance operations.',
      bullets: [
        'Built production browser automation and RPA agents driven by LLM action loops with dynamic DOM handling, so multi-step web workflows run without a human at the keyboard.',
        'Developed end-to-end document parsing and extraction pipelines using multimodal LLMs and OCR to pull structured data out of unstructured documents and tables.',
        'Automated SEO work end to end with agentic flows for keyword research, competitor analysis, and metadata and content generation.',
      ],
      tags: ['LLM agents', 'Browser automation', 'Multimodal extraction', 'Python'],
    },
    {
      company: 'Verisk Nepal',
      role: 'Software Engineer II',
      start: '2025-07',
      end: '2026-07',
      location: 'Kathmandu',
      summary: 'Agentic systems on AWS Bedrock with Claude for client-specific insurance workflows.',
      bullets: [
        'Built production agentic systems on AWS Bedrock using Anthropic Claude with tool calling, RAG, reflection loops and agent orchestration.',
        'Designed preprocessing pipelines for HTML documents with smart chunking and metadata extraction to feed high-quality RAG datasets.',
        'Doubled chatbot and agent performance on both latency and accuracy through prompt optimization, hybrid retrieval with re-ranking, caching and parallelization. User retention rose 80%.',
        'Found and fixed critical backend gaps (rate limits, timeout cascades, tool schema mismatches) and redesigned the FastAPI services with proper error handling and observability, reaching 99.9% uptime.',
      ],
      tags: ['AWS Bedrock', 'Claude', 'RAG', 'FastAPI'],
    },
    {
      company: 'Naamche Inc. (reAlpha)',
      role: 'Applied AI Engineer',
      start: '2024-09',
      end: '2025-07',
      location: 'Kathmandu',
      summary: 'Conversational AI and document systems for a US real estate technology company.',
      bullets: [
        'Designed conversational AI systems on OpenAI APIs and Anthropic Claude via AWS Bedrock, shipping chatbots and agentic workflows tailored to each client.',
        'Engineered document extraction and parsing systems that used NLP techniques to automate data processing.',
        'Built the FastAPI and Django backend services that put those models in front of production traffic.',
      ],
      tags: ['OpenAI', 'Claude', 'FastAPI', 'Django'],
    },
    {
      company: 'ICEBRKR, Virtly',
      role: 'AI Developer',
      start: '2024-03',
      end: '2024-09',
      summary: 'Research and prototyping across computer vision and NLP.',
      bullets: [
        'Researched and prototyped AI solutions for business problems in natural language processing and computer vision.',
        'Integrated CV and NLP components into products for real-time data analysis and user interaction.',
      ],
      tags: ['Computer vision', 'NLP', 'PyTorch'],
    },
    {
      company: 'Fast Track Engineering Institute',
      role: 'Technical Head',
      start: '2024-01',
      end: null,
      summary: 'Owns the institute\'s web platform and infrastructure.',
      bullets: [
        'Designed and built the institute\'s website and secure Django backend from scratch.',
        'Cut latency by 20% through query optimization, caching and a cleaner deployment pipeline on the VPS.',
      ],
      tags: ['Django', 'PostgreSQL', 'Nginx'],
      url: 'https://fasttei.com',
    },
    {
      company: 'Perigee Solutions',
      role: 'Backend Developer',
      start: '2023-02',
      end: '2024-02',
      summary: 'Backend for payroll systems, admin dashboards and business sites.',
      bullets: [
        'Built payroll management, admin dashboards and business websites with user management, reporting and workflow automation.',
        'Integrated REST APIs with frontend teams and improved performance, security and reliability across multiple client projects.',
      ],
      tags: ['Django', 'REST', 'PostgreSQL'],
    },
  ] satisfies Experience[],

  caseStudies: [
    {
      id: 'bedrock-agents',
      label: 'Case study 01',
      title: 'Agentic document intelligence on AWS Bedrock',
      employer: 'Verisk Nepal',
      context:
        'Insurance analysts needed answers grounded in thousands of HTML documents, and the first chatbot was slow and often wrong.',
      built: [
        'Claude on Bedrock with tool calling, retrieval, reflection loops and an orchestrator that routes between specialised agents.',
        'A preprocessing pipeline for HTML: boilerplate removal, structure-aware chunking and metadata extraction.',
        'Hybrid retrieval (lexical plus dense) with re-ranking, response caching and parallel tool execution.',
        'A FastAPI redesign with per-tool deadlines, retry budgets, schema validation and tracing.',
      ],
      outcomes: [
        { value: '2x', label: 'faster and more accurate' },
        { value: '80%', label: 'increase in user retention' },
        { value: '99.9%', label: 'uptime after the redesign' },
      ],
      stack: ['AWS Bedrock', 'Claude', 'FastAPI', 'PostgreSQL', 'Python'],
    },
    {
      id: 'browser-agents',
      label: 'Case study 02',
      title: 'LLM agents that operate insurance web portals',
      employer: 'Renegade Insurance',
      context:
        'Insurance operations run on third-party portals with no APIs. Every quote, policy lookup and document pull was a person clicking through forms.',
      built: [
        'Browser automation agents that plan, act and observe in a loop, reading the live DOM instead of relying on brittle selectors.',
        'Multimodal extraction that combines OCR with vision-capable LLMs to turn scanned forms and tables into typed records.',
        'Agentic SEO pipelines for keyword research, competitor analysis and metadata generation.',
      ],
      outcomes: [
        { value: 'Multi-step', label: 'workflows completed unattended' },
        { value: 'Structured', label: 'data from unstructured documents' },
      ],
      stack: ['Python', 'Playwright', 'Multimodal LLMs', 'OCR', 'FastAPI'],
    },
    {
      id: 'realestate-ai',
      label: 'Case study 03',
      title: 'Conversational AI for real estate',
      employer: 'Naamche (reAlpha)',
      context:
        'A US real estate platform wanted assistants that could answer buyer questions and read listing documents at scale.',
      built: [
        'Chatbots and agentic workflows on OpenAI and Claude via Bedrock, each tuned to a client use case.',
        'Document extraction and parsing with NLP to automate data entry from listings and contracts.',
        'FastAPI and Django services that exposed the models as reliable, versioned endpoints.',
      ],
      outcomes: [
        { value: 'Scalable', label: 'assistants across client accounts' },
        { value: 'Automated', label: 'document processing' },
      ],
      stack: ['OpenAI', 'Claude', 'FastAPI', 'Django', 'PostgreSQL'],
    },
  ] satisfies CaseStudy[],

  research: [
    {
      slug: 'pca-comparative-study',
      title: 'A comparative study of Principal Component Analysis on different datasets',
      method: 'PCA',
      dataset: 'Wine, Iris',
      summary: 'How much variance you can throw away before class separation collapses, measured on two classic datasets.',
      colab: [
        { label: 'Wine classification', url: 'https://colab.research.google.com/drive/1G3VEOA8N11YUzMPmtCRFMoWg26Ta9vcI?usp=sharing' },
        { label: 'Iris classification', url: 'https://colab.research.google.com/drive/1hXy5_Hc-qUpi_1oOZFK9pwXS9h8yH0R6?usp=sharing' },
      ],
      pdf: '/assets/pdf/A_Comparative_Study_of_Principal_Component_Analysis_on_Different_Datasets__1__removed.pdf',
    },
    {
      slug: 'decision-tree-breast-cancer',
      title: 'Classifying breast cancer as benign or malignant with decision trees',
      method: 'Decision trees',
      dataset: 'Wisconsin Breast Cancer',
      summary: 'Gini impurity against entropy as the split criterion, with a look at depth and overfitting.',
      colab: [
        { label: 'Impurity: Gini index', url: 'https://colab.research.google.com/drive/1MikIUtv7KLdAdg-GQSrviO8bDpZ06f29?usp=sharing' },
        { label: 'Impurity: Entropy', url: 'https://colab.research.google.com/drive/14dkko6i5d7QZJGSpLzdnhSDyEdzz-ZJL?usp=sharing' },
      ],
      pdf: '/assets/pdf/Decision_Tree (1).pdf',
    },
    {
      slug: 'naive-bayes-obesity',
      title: 'Obesity prediction with a Naive Bayes classifier',
      method: 'Naive Bayes',
      dataset: 'Obesity levels',
      summary: 'A Gaussian and hybrid Naive Bayes approach on mixed numeric and categorical features.',
      colab: [{ label: 'Gaussian / hybrid approach', url: 'https://colab.research.google.com/drive/1nMVK-P98o5wRQAkkMsKMTZny-AWyZqq7?usp=sharing' }],
      pdf: '/assets/pdf/Naive_Bayes_Classifier.pdf',
    },
    {
      slug: 'knn-dropout',
      title: 'Student dropout prediction with K-Nearest Neighbours',
      method: 'KNN',
      dataset: 'Student dropout',
      summary: 'Sweeping k and distance metrics to predict which students are likely to leave.',
      colab: [{ label: 'KNN with different k values', url: 'https://colab.research.google.com/drive/1oaz8f9of3KVOrxGBz0wcHF8lLDaliJgT' }],
      pdf: '/assets/pdf/KNN.pdf',
    },
    {
      slug: 'ann-digits',
      title: 'Digit classification with artificial neural networks',
      method: 'ANN',
      dataset: 'MNIST',
      summary: 'A plain feed-forward network first, then the same network with regularization to see what actually helps.',
      colab: [
        { label: 'Simple ANN approach', url: 'https://colab.research.google.com/drive/13YdZeaynbv-SYhKsgjR-6zmD1JwVan3N' },
        { label: 'ANN with regularization', url: 'https://colab.research.google.com/drive/1YhL8gPxczWA7bPMqfVlDs_clEP_IMwWB' },
      ],
      pdf: '/assets/pdf/ANN.pdf',
    },
    {
      slug: 'kd-tree-knn',
      title: 'Speeding up KNN with KD-trees',
      method: 'KD-tree',
      dataset: 'Synthetic and tabular',
      summary: 'Replacing brute-force neighbour search with a KD-tree and measuring where it pays off.',
      colab: [{ label: 'KD-trees', url: 'https://colab.research.google.com/drive/1F4qePd6-ge8jX5JZ5rT6x7SFKxdWUAAe' }],
      pdf: '/assets/pdf/KD.pdf',
    },
  ] satisfies Study[],

  pillars: [
    {
      n: '01',
      title: 'Agentic systems',
      text: 'Tool-calling agents with reflection loops, orchestration and hard limits on retries, budgets and timeouts. Built on Claude and OpenAI, mostly through AWS Bedrock.',
      tags: ['Tool calling', 'Orchestration', 'Bedrock'],
    },
    {
      n: '02',
      title: 'Retrieval and document intelligence',
      text: 'RAG pipelines for messy HTML and scanned documents: structure-aware chunking, hybrid retrieval, re-ranking, and multimodal extraction with OCR.',
      tags: ['RAG', 'OCR', 'Re-ranking'],
    },
    {
      n: '03',
      title: 'LLM browser automation',
      text: 'Agents that read the live DOM and complete multi-step workflows in web apps that have no API.',
      tags: ['RPA', 'Dynamic DOM', 'Playwright'],
    },
    {
      n: '04',
      title: 'Production backends',
      text: 'FastAPI and Django services with observability, caching and error handling that hold 99.9% uptime under real traffic.',
      tags: ['FastAPI', 'Django', 'PostgreSQL'],
    },
  ],
} as const;

export const yearsOfExperienceSince = 2023;

export function formatRange(start: string, end: string | null) {
  const fmt = (ym: string) => {
    const [y, m] = ym.split('-').map(Number);
    return new Date(y, (m ?? 1) - 1, 1).toLocaleString('en-US', { month: 'short', year: 'numeric' });
  };
  return `${fmt(start)} to ${end ? fmt(end) : 'present'}`;
}
