export const heroImages = {
  primary:
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
  secondary:
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
}

export const featuredProjects = [
  {
    slug: 'palm-residence',
    title: 'Palm Residence',
    tag: 'Residential',
    blurb: 'Sun-washed minimalism with tactile stone and oak.',
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'atelier-suite',
    title: 'Atelier Suite',
    tag: 'Hospitality',
    blurb: 'Layered neutrals and sculptural lighting for slow evenings.',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'harbor-loft',
    title: 'Harbor Loft',
    tag: 'Commercial',
    blurb: 'A gallery-like workspace with acoustic warmth.',
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
  },
]

export const services = [
  {
    title: 'Concept & mood',
    body: 'Narrative, palettes, and spatial storytelling aligned to how you live or host.',
    icon: 'spark',
  },
  {
    title: 'Spatial planning',
    body: 'Flow, light, storage, and bespoke joinery sketched to the millimetre.',
    icon: 'plan',
  },
  {
    title: 'Materials & FF&E',
    body: 'Curated finishes, furniture, art, and textiles with trade access worldwide.',
    icon: 'layers',
  },
  {
    title: 'Site delivery',
    body: 'Tendering, procurement, and white-glove install with a single point of contact.',
    icon: 'truck',
  },
] as const

export const portfolioItems = [
  {
    id: '1',
    title: 'Cove House',
    category: 'Residential',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: '2',
    title: 'Noir Kitchen',
    category: 'Residential',
    img: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: '3',
    title: 'Gallery Foyer',
    category: 'Commercial',
    img: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: '4',
    title: 'Sage Spa Suite',
    category: 'Hospitality',
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: '5',
    title: 'Skyline Lounge',
    category: 'Residential',
    img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: '6',
    title: 'Clay Studio',
    category: 'Commercial',
    img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1400&q=80',
  },
] as const

export const testimonials = [
  {
    quote:
      'They translated a vague Pinterest mood into a home that finally feels like us — calm, layered, and incredibly functional.',
    name: 'Amelia K.',
    role: 'Residential client',
  },
  {
    quote:
      'Our boutique hotel lobby now photographs like a magazine cover. Guest dwell time is noticeably higher.',
    name: 'Jordan M.',
    role: 'Hospitality operator',
  },
  {
    quote:
      'Clear budgets, weekly visuals, and zero surprises on site. The team moves like clockwork.',
    name: 'Priya S.',
    role: 'Commercial developer',
  },
] as const

export const processSteps = [
  { step: '01', title: 'Discover', body: 'Site walk-through, lifestyle interview, and aspirational references.' },
  { step: '02', title: 'Design', body: 'Layouts, 3D studies, samples, and lighting narratives for sign-off.' },
  { step: '03', title: 'Detail', body: 'Joinery drawings, schedules, and coordinated tender packages.' },
  { step: '04', title: 'Deliver', body: 'Procurement, install, styling, and a curated handover ritual.' },
] as const
