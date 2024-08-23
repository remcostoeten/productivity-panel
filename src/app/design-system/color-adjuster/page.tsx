"use client";

import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Switch,
} from "@/components/ui/";
import { DesignSystemWrapper } from "../_components/DesignSystemWrapper";

import { CopyIcon, PlusIcon, SaveIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ColorRow } from "../design-system.types";

export default function Component() {
  const [useRgba, setUseRgba] = useState(false);
  const [rows, setRows] = useState<ColorRow[]>([
    {
      id: 1,
      color: "#000000",
      percentage: 50,
      adjustment: "lighter",
      result: null,
    },
  ]);
  const [savedResults, setSavedResults] = useState<string[]>([]);

  useEffect(() => {
    document.body.classList.add("dark");
    return () => {
      document.body.classList.remove("dark");
    };
  }, []);

  const addRow = () => {
    const newId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
    setRows([
      ...rows,
      {
        id: newId,
        color: "#000000",
        percentage: 50,
        adjustment: "lighter",
        result: null,
      },
    ]);
  };

  const removeRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const updateRow = (id: number, updates: Partial<ColorRow>) => {
    setRows(rows.map((row) => (row.id === id ? { ...row, ...updates } : row)));
  };

  const adjustColor = (id: number) => {
    const row = rows.find((r) => r.id === id);
    if (!row) return;

    const { color, percentage, adjustment } = row;
    const rgb = hexToRgb(color);
    if (!rgb) return;

    const factor = percentage / 100;
    const adjustedRgb =
      adjustment === "lighter"
        ? rgb.map((c) => Math.round(c + (255 - c) * factor))
        : rgb.map((c) => Math.round(c * (1 - factor)));

    const result = useRgba
      ? `rgba(${adjustedRgb[0]}, ${adjustedRgb[1]}, ${adjustedRgb[2]}, 1)`
      : rgbToHex(adjustedRgb);

    updateRow(id, { result });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${text} has been copied to your clipboard.`,
    });
  };

  const saveResult = (result: string) => {
    setSavedResults([...savedResults, result]);
    toast({
      title: "Result saved",
      description: `${result} has been added to saved results.`,
    });
  };

  const copySavedResults = () => {
    const text = savedResults.join("\n");
    navigator.clipboard.writeText(text);
    toast({
      title: "Saved results copied",
      description: "All saved results have been copied to your clipboard.",
    });
  };

  const hexToRgb = (hex: string): number[] | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : null;
  };

  const rgbToHex = (rgb: number[]): string => {
    return (
      "#" +
      rgb
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  return (
    <DesignSystemWrapper
      title="Color Adjuster"
      description="Adjust colors by percentage and get lighter or darker variants."
    >
      <div className="flex items-center justify-between">
        <div className="mb-2 flex items-center gap-2">
          <Switch
            id="rgba-mode"
            checked={useRgba}
            onCheckedChange={setUseRgba}
          />
          <Label htmlFor="rgba-mode">Use RGBA output</Label>
        </div>
      </div>

      {rows.map((row, index) => (
        <div key={row.id} className="space-y-4 border border-input p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor={`color-${row.id}`}>Color</Label>
              <div className="flex space-x-2">
                <Input
                  type="color"
                  id={`color-${row.id}`}
                  value={row.color}
                  onChange={(e) => updateRow(row.id, { color: e.target.value })}
                  className="w-12 h-10 p-1 rounded bg-white"
                />
                <Input
                  type="text"
                  value={row.color}
                  onChange={(e) => updateRow(row.id, { color: e.target.value })}
                  className="flex-grow bg-gray-800"
                  placeholder="Enter color (HEX or RGB)"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`percentage-${row.id}`}>Percentage</Label>
              <Input
                type="number"
                id={`percentage-${row.id}`}
                value={row.percentage}
                onChange={(e) =>
                  updateRow(row.id, { percentage: Number(e.target.value) })
                }
                min={0}
                max={100}
                className="bg-gray-800"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`adjustment-${row.id}`}>Adjustment</Label>
              <Select
                value={row.adjustment}
                onValueChange={(value: "lighter" | "darker") =>
                  updateRow(row.id, { adjustment: value })
                }
              >
                <SelectTrigger
                  id={`adjustment-${row.id}`}
                  className="bg-gray-800"
                >
                  <SelectValue placeholder="Select adjustment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lighter">Lighter</SelectItem>
                  <SelectItem value="darker">Darker</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end space-x-2">
              <Button onClick={() => adjustColor(row.id)} className="flex-grow">
                Apply Adjustment
              </Button>
              {rows.length > 1 && (
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeRow(row.id)}
                >
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Remove row</span>
                </Button>
              )}
            </div>
          </div>
          {row.result && (
            <div className="flex items-center space-x-4">
              <div
                className="w-10 h-10 rounded-full"
                style={{ backgroundColor: row.result }}
              />
              <div className="flex-grow font-mono">{row.result}</div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(row.result!)}
              >
                <CopyIcon className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => saveResult(row.result!)}
              >
                <SaveIcon className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          )}
          {index < rows.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
      <Button onClick={addRow} className="w-full">
        <PlusIcon className="h-4 w-4 mr-2" />
        Add Another Color
      </Button>

      {savedResults.length > 0 && (
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Saved Results</h3>
          <pre className="bg-gray-700 p-4 rounded-md overflow-x-auto">
            {savedResults.join("\n")}
          </pre>
          <Button onClick={copySavedResults} className="mt-4">
            <CopyIcon className="h-4 w-4 mr-2" />
            Copy All Saved Results
          </Button>
        </div>
      )}
    </DesignSystemWrapper>
  );
}
