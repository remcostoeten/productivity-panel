import { getColorByName } from "@/core/helpers/theme-colors";

export default function PrimaryColoredDiv() {
  return (
    <div style={{ backgroundColor: getColorByName("theme-primary") }}>
      This div has the primary theme color as its background.
    </div>
  );
}
