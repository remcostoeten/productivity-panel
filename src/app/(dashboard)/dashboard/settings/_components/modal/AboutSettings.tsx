import { Button } from "@/components/ui/button";
import Flex from "~/src/components/atoms/Flex";
import BrandLogo from "~/src/components/theme/BrandLogo";
import UniqueBadge from "~/src/components/ui/UniqueBadge";

export default function AboutSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <BrandLogo />
        <Flex dir="col" gap="1">
          <h2 className="text-2xl font-bold">Remco's panel</h2>
          <p className="flex items-center gap-4 text-muted">
            Version 0.1{" "}
            <UniqueBadge
              text="Beta"
              textColor="text-white/40"
              className="animate-pulse"
              size="sm"
            />
          </p>
        </Flex>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="secondary" className="w-full justify-start">
          <span className="mr-2">Welcome Guide</span>
          <span className="text-muted-foreground text-sm">
            Your introduction to Clay
          </span>
        </Button>
        <Button variant="secondary" className="w-full justify-start">
          <span className="mr-2">What's new</span>
          <span className="text-muted-foreground text-sm">
            Updates & improvements
          </span>
        </Button>
        <Button variant="secondary" className="w-full justify-start">
          <span className="mr-2">Help & Support</span>
          <span className="text-muted-foreground text-sm">
            In-depth guides & FAQ's
          </span>
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="w-full">
          <span className="mr-2">🍎</span> Download for iOS
        </Button>
        <Button variant="outline" className="w-full">
          <span className="mr-2">💻</span> Download for Desktop
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        We believe in creating work that we're proud of, and we hope you enjoy
        using Clay as much as we enjoy building it.
      </p>
    </div>
  );
}
