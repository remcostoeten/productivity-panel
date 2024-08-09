'use client';

import CodeHighlight from '@/components/ui/CodeHighlight/CodeHighlight';
import { darken, lighten } from '@/core/helpers/color-modifier';
import { useState } from 'react';
import { ColorInput } from '../types.color-tweaker';

const ColorAdjuster: React.FC = () => {
  const [colorInputs, setColorInputs] = useState<ColorInput[]>([
    { id: 1, color: '', percentage: 5, operation: 'darken' },
  ]);
  const [output, setOutput] = useState<string[]>([]);

  const handleInputChange = (
    id: number,
    field: keyof ColorInput,
    value: string | number,
  ) => {
    setColorInputs((prev) =>
      prev.map((input) =>
        input.id === id ? { ...input, [field]: value } : input,
      ),
    );
  };

  const addColorInput = () => {
    const newId = colorInputs.length + 1;
    setColorInputs([
      ...colorInputs,
      { id: newId, color: '', percentage: 5, operation: 'darken' },
    ]);
  };

  const handleSubmit = () => {
    const newOutput = colorInputs.map((input) => {
      const adjustColor = input.operation === 'darken' ? darken : lighten;
      return adjustColor(input.color, input.percentage);
    });
    setOutput(newOutput);
  };

  return (
    <div className="p-4">
      {colorInputs.map((input) => (
        <div key={input.id} className="mb-4 flex items-center space-x-2">
          <input
            type="text"
            value={input.color}
            onChange={(e) =>
              handleInputChange(input.id, 'color', e.target.value)
            }
            placeholder="Color (hex, rgb, or name)"
            className="border p-2 rounded"
          />
          <input
            type="number"
            value={input.percentage}
            onChange={(e) =>
              handleInputChange(input.id, 'percentage', Number(e.target.value))
            }
            min="0"
            max="100"
            className="border p-2 rounded w-20"
          />
          <select
            value={input.operation}
            onChange={(e) =>
              handleInputChange(
                input.id,
                'operation',
                e.target.value as 'darken' | 'lighten',
              )
            }
            className="border p-2 rounded"
          >
            <option value="darken">Darken</option>
            <option value="lighten">Lighten</option>
          </select>
        </div>
      ))}
      <button
        onClick={addColorInput}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        +
      </button>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
      {output.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Output:</h3>
          <CodeHighlight title="Adjusted Colors" language="jsx">
            {output
              .map(
                (color, index) =>
                  `const adjustedColor${index + 1} = '${color}';`,
              )
              .join('\n')}
          </CodeHighlight>
        </div>
      )}
    </div>
  );
};

export default ColorAdjuster;
