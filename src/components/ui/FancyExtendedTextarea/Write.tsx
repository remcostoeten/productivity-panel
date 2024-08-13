import React, { useState, useRef, useCallback } from "react";
import { useProcessor } from "./use-processor";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface WriteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Write({ value, onChange, placeholder }: WriteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mentionRange, setMentionRange] = useState<[number, number] | null>(
    null,
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { mentions } = useProcessor();

  const filteredMentions =
    query === ""
      ? mentions
      : mentions.filter((mention) =>
          mention.name.toLowerCase().includes(query.toLowerCase()),
        );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "@") {
        const start = event.currentTarget.selectionStart;
        setMentionRange([start, start]);
        setOpen(true);
      } else if (open && event.key === "Escape") {
        setOpen(false);
        setMentionRange(null);
      } else if (open && event.key === "Enter") {
        event.preventDefault();
      }
    },
    [open],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      onChange(newValue);

      if (mentionRange) {
        const mention = newValue.slice(
          mentionRange[0],
          event.target.selectionStart,
        );
        setQuery(mention.slice(1));
      }
    },
    [mentionRange, onChange],
  );

  const handleSelectMention = useCallback(
    (mention: { id: string; name: string }) => {
      if (mentionRange && textareaRef.current) {
        const newValue = replaceMention(
          value,
          mentionRange,
          `@${mention.name}`,
        );
        onChange(newValue);
        setMentionRange(null);
        setQuery("");
        setOpen(false);
        textareaRef.current.focus();
      }
    },
    [value, mentionRange, onChange],
  );

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full h-40 p-2 resize-none border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="sr-only">Open mentions</div>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search mentions..."
              value={query}
              onValueChange={setQuery}
            />
            <CommandEmpty>No mentions found.</CommandEmpty>
            <CommandGroup>
              {filteredMentions.map((mention) => (
                <CommandItem
                  key={mention.id}
                  onSelect={() => handleSelectMention(mention)}
                >
                  {mention.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}