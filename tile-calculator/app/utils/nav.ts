export type NavItem = { label: string; to: string }

export const navItems: NavItem[] = [
  { label: 'Tile Calculator', to: '/' }, 
  { label: 'Tile Adhesive Calculator', to: '/tile-adhesive-calculator' },
  { label: 'Grout Calculator' , to: '/grout-calculator'},
  { label: 'Paint Calculator  ', to: '/paint-calculator' },
  { label: 'Primer Calculator' , to: '/primer-calculator'}
  // Later:
  // { label: 'Grout Calculator', to: '/grout-calculator' },
  // { label: 'Paint Calculator', to: '/paint-calculator' },
]
