import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

export default function AppearanceSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">
          THEME
        </h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-theme">Automatic Light/Dark</Label>
          <Switch id="auto-theme" />
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Matches device settings
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-muted rounded-lg p-2 flex items-center justify-center">
            <img
              src="/placeholder.svg?height=100&width=150"
              alt="Dark theme preview"
              className="rounded"
            />
          </div>
          <div className="bg-red-400 border rounded-lg p-2 flex items-center justify-center">
            <img
              src="/placeholder.svg?height=100&width=150"
              alt="Light theme preview"
              className="rounded"
            />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">
          DARK APPEARANCE
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          Choose your preferred dark appearance by toggling between Black or
          Graphite
        </p>
        <RadioGroup defaultValue="black">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="black" id="black" />
            <Label htmlFor="black">Black</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="graphite" id="graphite" />
            <Label htmlFor="graphite">Graphite</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
