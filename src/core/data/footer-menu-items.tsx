import { DiscordIcon, TwitterIcon } from '@/components/theme/icons';

interface NavItem {
  href: string;
  name: string;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

interface SocialLink {
  href: string;
  name: string;
  icon: JSX.Element;
}

export const footerNavs: NavSection[] = [
  {
    label: 'Product',
    items: [
      { href: '/', name: 'Email Collection' },
      { href: '/pricing', name: 'Pricing' },
      { href: '/faq', name: 'FAQ' },
    ],
  },
  {
    label: 'Community',
    items: [
      { href: '/', name: 'Discord' },
      { href: '/', name: 'Twitter' },
      { href: 'mailto:hello@chatcollect.com', name: 'Email' },
    ],
  },
  {
    label: 'Legal',
    items: [
      { href: '/terms', name: 'Terms' },
      { href: '/privacy', name: 'Privacy' },
    ],
  },
];
export const footerSocials: SocialLink[] = [
  {
    href: '',
    name: 'Discord',
    icon: <DiscordIcon className="size-4" />,
  },
  {
    href: '',
    name: 'Twitter',
    icon: <TwitterIcon className="size-4" />,
  },
];
