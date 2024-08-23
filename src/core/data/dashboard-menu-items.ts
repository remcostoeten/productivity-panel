import { MenuItemType } from "@/types/menu";
import {
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

export const sidebarItems: MenuItemType[] = [
  { icon: PlusIcon, label: "Add", href: "/add" },
  { icon: FolderIcon, label: "Files", href: "/files" },
  { icon: HomeIcon, label: "Home", href: "/" },
  { icon: SearchIcon, label: "Search", href: "/search" },
  { icon: MessageCircleIcon, label: "Messages", href: "/messages" },
  { icon: BellIcon, label: "Notifications", href: "/notifications" },
];

export const menuItems: MenuItemType[] = [
  { icon: HomeIcon, label: "Dashboard", href: "/dashboard" },
  { icon: HeartIcon, label: "Wishlist", href: "/dashboard/wishlist" },
  { icon: BookOpenIcon, label: "Notes", href: "/dashboard/notes" },
  { icon: LockIcon, label: "Vault", href: "/vault", disabled: true },
  { icon: CalendarIcon, label: "Agenda", href: "/agenda", disabled: true },
  { icon: CheckSquareIcon, label: "Todo", href: "/todo", disabled: true },
];

export const accountItems: MenuItemType[] = [
  { icon: UserIcon, label: "My account", href: "/account" },
  { icon: CreditCardIcon, label: "Billing", href: "/billing" },
  { icon: SettingsIcon, label: "Settings", href: "/settings" },
];

export const bottomItems: MenuItemType[] = [
  { icon: MoonIcon, label: "Appearance", href: "/appearance" },
  { icon: HelpCircleIcon, label: "Help", href: "/help" },
];
