import { IconType } from "recharts/types/component/DefaultLegendContent";

export type MenuItemType = {
  icon: IconType;
  label: string;
  href: string;
  disabled?: boolean;
};
