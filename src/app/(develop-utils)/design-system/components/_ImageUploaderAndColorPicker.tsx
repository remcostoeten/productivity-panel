'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, PlusCircle } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface ColorItem {
  color: string;
  cssVar: string;
}

interface Folder {
  name: string;
  colors: ColorItem[];
}

const ImageUploaderAndColorPicker: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [folders, setFolders] = useState<Folder[]>([
    { name: 'Default', colors: [] },
  ]);
  const [activeFolder, setActiveFolder] = useState<string>('Default');
  const [pickingColor, setPickingColor] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            const blob = items[i].getAsFile();
            if (blob) {
              const reader = new FileReader();
              reader.onload = (e) => setImageSrc(e.target?.result as string);
              reader.readAsDataURL(blob);
            }
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const enableColorPicker = () => setPickingColor(true);
  const cancelColorPicker = () => setPickingColor(false);

  const handleColorPick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (pickingColor && imgRef.current && canvasRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        const pickedColor = `#${pixelData[0].toString(16).padStart(2, '0')}${pixelData[1].toString(16).padStart(2, '0')}${pixelData[2].toString(16).padStart(2, '0')}`;

        const cssVarName = `--picker-${generateColorName(pickedColor)}`;
        const newColorItem: ColorItem = {
          color: pickedColor,
          cssVar: cssVarName,
        };

        setColor(pickedColor);
        setFolders((prevFolders) =>
          prevFolders.map((folder) =>
            folder.name === activeFolder
              ? { ...folder, colors: [...folder.colors, newColorItem] }
              : folder,
          ),
        );
        setPickingColor(false);
      }
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    if (pickingColor && imgRef.current && canvasRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        const hoverColor = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;

        // Update cursor style to show color
        event.currentTarget.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="${hoverColor}" stroke="white" stroke-width="4"/></svg>') 16 16, auto`;
      }
    }
  };

  const generateColorName = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (r === g && g === b) {
      return r === 255
        ? 'white'
        : r === 0
          ? 'black'
          : `gray-${Math.round(r / 25.5)}`;
    }
    const hue = rgbToHsl(r, g, b)[0];
    const hueNames = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
    return hueNames[Math.floor(hue / 60)];
  };

  const rgbToHsl = (
    r: number,
    g: number,
    b: number,
  ): [number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  };

  const addFolder = () => {
    const folderName = prompt('Enter folder name:');
    if (folderName && !folders.some((folder) => folder.name === folderName)) {
      setFolders([...folders, { name: folderName, colors: [] }]);
      setActiveFolder(folderName);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="mb-4"
      />
      <Button onClick={enableColorPicker} className="mr-2">
        Pick Color
      </Button>
      {pickingColor && (
        <Button onClick={cancelColorPicker} variant="secondary">
          Cancel
        </Button>
      )}

      {imageSrc && (
        <div className="relative mt-4">
          <img
            src={imageSrc}
            alt="Uploaded"
            ref={imgRef}
            onClick={handleColorPick}
            onMouseMove={handleMouseMove}
            className={`max-w-full h-auto ${pickingColor ? 'cursor-crosshair' : ''}`}
          />
          <canvas
            ref={canvasRef}
            className="hidden"
            width={imgRef.current?.width}
            height={imgRef.current?.height}
          />
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Picked Colors</h3>
        <Tabs value={activeFolder} onValueChange={setActiveFolder}>
          <TabsList>
            {folders.map((folder) => (
              <TabsTrigger key={folder.name} value={folder.name}>
                {folder.name}
              </TabsTrigger>
            ))}
            <Button variant="ghost" size="sm" onClick={addFolder}>
              <PlusCircle className="w-4 h-4" />
            </Button>
          </TabsList>
          {folders.map((folder) => (
            <TabsContent key={folder.name} value={folder.name}>
              <div className="flex flex-wrap gap-2">
                {folder.colors.map((colorItem, index) => (
                  <Card
                    key={index}
                    className="w-32 h-32 flex flex-col items-center justify-center relative"
                    style={{ backgroundColor: colorItem.color }}
                  >
                    <span className="text-xs font-mono mb-1">
                      {colorItem.color}
                    </span>
                    <span className="text-xs font-mono mb-1">
                      {colorItem.cssVar}
                    </span>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-1 right-1"
                      onClick={() =>
                        copyToClipboard(
                          `${colorItem.color} ${colorItem.cssVar}`,
                        )
                      }
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {color && (
        <Card
          className="mt-4 w-32 h-32 flex flex-col items-center justify-center relative"
          style={{ backgroundColor: color }}
        >
          <span className="text-xs font-mono mb-1">{color}</span>
          <span className="text-xs font-mono mb-1">{`var(--picker-${generateColorName(color)})`}</span>
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-1 right-1"
            onClick={() =>
              copyToClipboard(
                `${color} var(--picker-${generateColorName(color)})`,
              )
            }
          >
            <Copy className="w-4 h-4" />
          </Button>
        </Card>
      )}
    </div>
  );
};

export default ImageUploaderAndColorPicker;
