interface TruncateProps {
  text: string;
  lines?: number;
  chars?: number;
  end?: string;
}

const Truncate: React.FC<TruncateProps> = ({
  text,
  lines,
  chars,
  end = '...',
}) => {
  const truncateText = (text: string, chars?: number, lines?: number) => {
    if (chars && text.length > chars) {
      return text.substring(0, chars) + end;
    }
    if (lines) {
      const linesArray = text?.split('\n');
      if (linesArray?.length > lines) {
        return linesArray.slice(0, lines).join('\n') + end;
      }
    }
    return text;
  };

  return <div>{truncateText(text, chars, lines)}</div>;
};

export default Truncate;
