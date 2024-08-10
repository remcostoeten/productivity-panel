import colors from "@/core/helpers/theme-colors";

export default function FindSpecificColor() {
  const textColor = colors.find((c) => c.name === "text")?.value;
  return (
    <p style={{ color: textColor }}>This paragraph uses the main text color.</p>
  );
}
