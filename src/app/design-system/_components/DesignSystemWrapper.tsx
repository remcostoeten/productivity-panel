import { Button, Card } from "@/components/ui/";
import { DesignSystemWrapperProps } from "../design-system.types";

export function DesignSystemWrapper({
  title,
  description,
  actionButtons = [],
  children,
}: DesignSystemWrapperProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>
      {actionButtons.length > 0 && (
        <Card className="bg-dark-section mb-8 ">
          <div className="flex flex-wrap gap-4">
            {actionButtons.map((button, index) => (
              <Button
                key={index}
                onClick={button.onClick}
                variant="outline"
                className="bg-dark-section--lighter hover:bg-theme-primary hover:text-black transition-colors"
              >
                {button.label}
              </Button>
            ))}
          </div>
        </Card>
      )}
      <div className="bg-dark-section py-4 px-8 rounded-lg border-seperator">
        {children}
      </div>
    </div>
  );
}
