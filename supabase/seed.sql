insert into public.posts (
  title,
  slug,
  excerpt,
  category,
  content,
  read_time,
  published_date,
  published
)
values
  (
    'Five things every small business website needs',
    'five-things-every-small-business-website-needs',
    'A useful website does not need to be complicated. It needs to answer the questions people actually arrive with, and make the next step obvious.',
    'Websites',
    'A useful website does not need to be complicated. It needs to answer the questions people actually arrive with, and make the next step obvious.',
    '4 min read',
    '2026-09-18',
    true
  ),
  (
    'Why mobile-first design matters',
    'why-mobile-first-design-matters',
    'Most people will meet your business on a phone. Designing for that small screen first changes the decisions you make about everything else.',
    'Design',
    'Most people will meet your business on a phone. Designing for that small screen first changes the decisions you make about everything else.',
    '4 min read',
    '2026-09-05',
    true
  ),
  (
    'How to prepare your content before building a website',
    'how-to-prepare-your-content-before-building-a-website',
    'Content is usually the slowest part of a website project. A little preparation before design starts keeps the timeline honest.',
    'Process',
    'Content is usually the slowest part of a website project. A little preparation before design starts keeps the timeline honest.',
    '5 min read',
    '2026-08-24',
    true
  )
on conflict (slug) do nothing;
