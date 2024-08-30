import { MenuItemType } from "@/app/dashboard/dashboard.types";
import {
  BellDotIcon,
  BellIcon,
  BookOpenIcon,
  CalendarIcon,
  CheckSquareIcon,
  CreditCardIcon,
  FolderIcon,
  HeartIcon,
  HelpCircleIcon,
  HomeIcon,
  LockIcon,
  MessageCircleIcon,
  MoonIcon,
  PlusIcon,

  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

const DASHBOARD_ROUTE_PREFIX = "/dashboard";

export const sidebarItems: MenuItemType[] = [
  { icon: PlusIcon, label: "Add", href: "/add" },
  { icon: FolderIcon, label: "Files", href: "/files" },
  { icon: HomeIcon, label: "Home", href: "/" },
  { icon: SearchIcon, label: "Search", href: "/search" },
  { icon: MessageCircleIcon, label: "Messages", href: "/messages" },
  { icon: BellIcon, label: "Notifications", href: "/notifications" },
];


export const menuItems: MenuItemType[] = [
  { icon: HomeIcon, label: "Dashboard", href: "/" },
  { icon: BellDotIcon, label: "Inbox", href: "/inbox" },
  { icon: HeartIcon, label: "Wishlist", href: "/wishlist" },
  { icon: BookOpenIcon, label: "Notes", href: "/note" },
  { icon: LockIcon, label: "Assets", href: "/assets" },
  { icon: CalendarIcon, label: "Agenda", href: "/agenda", disabled: true },
  { icon: CheckSquareIcon, label: "Todo", href: "/todo", disabled: true },
].map((item) => ({ ...item, href: `${DASHBOARD_ROUTE_PREFIX}${item.href}` }));

export const accountItems: MenuItemType[] = [
  { icon: UserIcon, label: "My account", href: "/dashboard/account" },
  {
    icon: CreditCardIcon,
    label: "Billing",
    href: "/dashboard/billing",
    disabled: true,
  },
  {
    icon: SettingsIcon,
    label: "Settings",
    href: "/dashboard/settings",
    disabled: true,
  },
];

export const bottomItems: MenuItemType[] = [
  { icon: MoonIcon, label: "Appearance", href: "/dashboard/appearance" },
  { icon: HelpCircleIcon, label: "Help", href: "/help", disabled: true },
];
