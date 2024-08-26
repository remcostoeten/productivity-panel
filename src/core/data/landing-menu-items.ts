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
  { href: "/color-tool", label: "Color UI picker", alias: "Cfg creator" },
  { href: "/easing", label: "(Bezier) ease showcase", alias: "Cubic Ease" },
  { href: "/color-adjuster", label: "Color Tweaker", alias: "Color adjuster" },
  { href: "/tag-input", label: "Tag input showcase", alias: "Tag input" },
  { href: "/loaders", label: "All loaders", alias: "Loaders" },
  { href: "/different-toasts", label: "Toast variants", alias: "Toasts" },
  {
    href: "/vercel-geist-system",
    label: "Vercel/geist design system",
    alias: "Vercel/geist",
  },
  {
    href: "/tailwind-colors",
    label: "Theme tailwind colors",
    alias: "TW Colors",
  },
  { href: "/kbd-variants", label: "KBD variants", alias: "KBD's" },
  { href: "/theme-buttons", label: "Theme buttons", alias: "Buttons" },
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
