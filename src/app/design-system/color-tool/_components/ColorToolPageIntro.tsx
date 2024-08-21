interface ColorToolIntroProps {
  title: string;
  description: string;
}

export default function ToolIntro({ title, description }: ColorToolIntroProps) {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold pb-2">{title}</h1>
      <p className="text-muted-foreground text-lg pb-4 border-b border-neutral-700 mb-8">
        {description}
      </p>
    </div>
  );
}
