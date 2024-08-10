import { ThemeColorObject } from "@/app/(marketing)/color-tool/types.color-tool";

export const colors: ThemeColorObject[] = [
  { name: "theme-primary", value: "#ff6c00" },
  { name: "text", value: "#f3f3f3" },
  { name: "text-accent", value: "#909090" },
  { name: "text-dimmed", value: "#cccccc" },
  { name: "border-hover", value: "#252525" },
  { name: "badge-border", value: "var(--border-hover)" },
  { name: "body", value: "#040404" },
  { name: "section", value: "#0c0c0c" },
  { name: "active-state", value: "#1b1b1b" },
  { name: "section-hover", value: "var(--section-state)" },
  { name: "card", value: "var(--section)" },
  { name: "card-hover", value: "#161616" },
  { name: "pill", value: "var(--card-hover)" },
];

export const getColorByName = (name: string): string | undefined => {
  const color = colors.find((c) => c.name === name);
  return color ? color.value : undefined;
};

export default colors;
// Theme colors
export const THEME_PRIMARY = "#ff6c00";
export const TEXT = "#f3f3f3";
export const TEXT_ACCENT = "#909090";
export const TEXT_DIMMED = "#cccccc";
export const BORDER_HOVER = "#252525";
export const BADGE_BORDER = BORDER_HOVER;
export const BODY = "#040404";
export const SECTION = "#0c0c0c";
export const ACTIVE_STATE = "#1b1b1b";
export const SECTION_HOVER = ACTIVE_STATE;
export const CARD = SECTION;
export const CARD_HOVER = "#161616";
export const PILL = CARD_HOVER;

// Animation properties
export const CUBIC = "cubic-bezier(0.4, 0, 0.2, 1)";
export const DURATION = "0.3s";

// Transition property
export const TRANSITION_PROPERTY =
  "color, background-color, border-color, text-decoration-color, fill, stroke, -webkit-text-decoration-color";

// Export all colors as a single object
export const colorss = {
  themePrimary: THEME_PRIMARY,
  text: TEXT,
  textAccent: TEXT_ACCENT,
  textDimmed: TEXT_DIMMED,
  borderHover: BORDER_HOVER,
  badgeBorder: BADGE_BORDER,
  body: BODY,
  section: SECTION,
  activeState: ACTIVE_STATE,
  sectionHover: SECTION_HOVER,
  card: CARD,
  cardHover: CARD_HOVER,
  pill: PILL,
};
