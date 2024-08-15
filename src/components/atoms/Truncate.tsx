import React from "react";

interface TruncateProps {
  text: string;
  lines?: number;
  chars?: number;
  end?: string;
  component?: keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;
}

const Truncate: React.FC<TruncateProps> = ({
  text,
  lines,
  chars,
  end = "...",
  component: Component = React.Fragment,
}) => {
  const truncateText = (text: string, chars?: number, lines?: number) => {
    if (chars && text.length > chars) {
      return text.substring(0, chars) + end;
    }
    if (lines) {
      const linesArray = text?.split("\n");
      if (linesArray?.length > lines) {
        return linesArray.slice(0, lines).join("\n") + end;
      }
    }
    return text;
  };

  return <Component>{truncateText(text, chars, lines)}</Component>;
};

export default Truncate;
