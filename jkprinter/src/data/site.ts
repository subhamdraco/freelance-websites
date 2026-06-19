export const capabilities = [
  'Large format',
  'Retail graphics',
  'Direct mail',
  'Packaging proofs',
  'Rush queue',
  'Color profiles',
] as const

export const services = [
  {
    key: 'wide',
    title: 'Wide format & signage',
    body: 'Banners, window films, rigid boards, and event hardware — nested, trimmed, and packed for installers.',
    icon: 'wide',
  },
  {
    key: 'brand',
    title: 'Brand & marketing print',
    body: 'Brochures, catalogs, mailers, and retail kits with consistent color run to run.',
    icon: 'brand',
  },
  {
    key: 'finish',
    title: 'Finishing & kitting',
    body: 'Lamination, mounting, die cutting, and hand assembly — one partner through delivery.',
    icon: 'finish',
  },
] as const

export const workItems = [
  {
    id: '1',
    title: 'Retail facade wrap',
    cat: 'Signage',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '2',
    title: 'Product launch flyers',
    cat: 'Marketing',
    img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '3',
    title: 'Trade show backdrop',
    cat: 'Large format',
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '4',
    title: 'Business card suite',
    cat: 'Stationery',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '5',
    title: 'Window vinyl campaign',
    cat: 'Signage',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '6',
    title: 'Interior wall graphics',
    cat: 'Large format',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  },
] as const

export const stats = [
  { label: 'Jobs annually', value: '4.8k' },
  { label: 'On-time delivery', value: '99.1%' },
  { label: 'Avg. proof rounds', value: '1.3' },
] as const

export const processSteps = [
  { step: '1', title: 'Brief & files', body: 'We review dimensions, substrates, and deadlines — then confirm feasibility.' },
  { step: '2', title: 'Proof', body: 'Soft or hard proof with ICC-managed color so stakeholders sign off once.' },
  { step: '3', title: 'Produce', body: 'Calibrated presses, finishing, QC photos, and packed pallets or courier handoff.' },
] as const
