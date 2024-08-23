const menuItems = [
  {
    id: 3,
    label: "Wishlist",
    href: "/dashboard/wishlist",
  },
];

export default menuItems;

const prefix = "/design-system";

export const designSystemItems = [
  { href: "/color-tool", label: "Color UI picker" },
  { href: "/easing", label: "(Bezier) ease showcase" },
  { href: "/color-adjuster", label: "Color Tweaker" },
  { href: "/tag-input", label: "Tag input showcase" },
  { href: "/loaders", label: "All loaders" },
  { href: "/tailwind-colors", label: "Theme tailwind colors" },
].map((item) => ({ ...item, href: `${prefix}${item.href}` }));

export const dashboardMenuItems = [
  { href: "/clerk-flow", label: "Clerk flow" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/notes", label: "Notes" },
  { href: "/dashboard/settings", label: "Settings" },
];

export const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/color-tool", label: "Color tool" },
  { href: "/dashboard/settings", label: "Settings" },
  { href: "#", label: "Terms of service" },
];
