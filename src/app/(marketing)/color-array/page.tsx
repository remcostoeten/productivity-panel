import {
  default as PrimaryColoredDiv,
  default as ThemeColorArrayShowcase,
} from "./_components/__PrimaryColoredDiv";
import FindSpecificColor from "./_components/__find-specific-color";

export default function ColorArrayPage() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-background text-foreground">
      <div className="flex flex-col items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Color Array</h1>
        <p className="text-sm text-muted">
          src/app/(marketing)/color-array/page.tsx
        </p>
      </div>
      <section className="py-6">
        <h3>getColorByName</h3>
        <PrimaryColoredDiv />
        <hr />

        <h3>FindSpecificColor</h3>
        <FindSpecificColor />
        <hr />
        <h3>ThemeColorArrayShowcase</h3>
        <ThemeColorArrayShowcase />
      </section>
    </div>
  );
}
