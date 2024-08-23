import DesignSystemTabs from "./_components/DirectionAwareNav";

export default function DesignSystemLayout({ children }) {
  return (
    <div className="min-h-screen bg-background mt-marketing-header">
      <DesignSystemTabs />
      <main className="container mx-auto py-6">{children}</main>
    </div>
  );
}
