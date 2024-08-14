export type BudgetItem = {
  id: string;
  title: string;
  cost: number;
  description: string;
  priority: "high" | "medium" | "low";
  url?: string;
};

export type BudgetList = {
  id: string;
  title: string;
  total: number;
  items: BudgetItem[];
};

export type WishlistComponentProps = {
  userId: string;
};

export type AddItemDialogProps = {
  onAddItem: (name: string, price: number) => Promise<void>;
};
