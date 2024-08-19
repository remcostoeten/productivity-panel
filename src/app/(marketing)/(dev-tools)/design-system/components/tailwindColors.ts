import config from "@/../tailwind.config";

export function GetCustomColors() {
  const colors = config.theme?.extend?.colors || {};
  const customColors: Record<string, string> = {};

  Object.entries(colors).forEach(([key, value]) => {
    if (typeof value === "string") {
      customColors[key] = value;
    } else if (typeof value === "object") {
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (subKey === "DEFAULT") {
          customColors[key] = subValue as string;
        } else {
          customColors[`${key}-${subKey}`] = subValue as string;
        }
      });
    }
  });

  return customColors;
}
