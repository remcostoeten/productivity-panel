import DesignSystemTabs from "../design-system/_components/DirectionAwareNav";

export default function DesignSystemLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <DesignSystemTabs />
      <main className="container mx-auto py-6">{children}</main>
    </div>
  );
}
