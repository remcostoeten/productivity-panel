import colors from "@/core/helpers/theme-colors";

export default function ThemeColorArrayShowcase() {
  return (
    <div>
      {colors.map((color) => (
        <div key={color.name} style={{ backgroundColor: color.value }}>
          {color.name}
        </div>
      ))}
    </div>
  );
}
