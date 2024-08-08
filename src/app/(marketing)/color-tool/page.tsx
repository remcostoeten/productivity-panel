'use client';

import { Button } from '@/components/ui/button';
import CodeHighlight from '@/components/ui/CodeHighlight/CodeHighlight';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrashIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import FileUploadUi from '../color/_components/FileUploadUi';

interface ColorItem {
  color: string;
  cssVar: string;
}

interface Folder {
  name: string;
  colors: ColorItem[];
}

export default function Component() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [activeFolder, setActiveFolder] = useState<string>('');
  const [pickingColor, setPickingColor] = useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState<string>('');
  const [isAddFolderDialogOpen, setIsAddFolderDialogOpen] = useState(false);
  const [editingColor, setEditingColor] = useState<ColorItem | null>(null);
  const [editedCssVar, setEditedCssVar] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [tailwindCode, setTailwindCode] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const savedFolders = localStorage.getItem('colorFolders');
    if (savedFolders) {
      const parsedFolders = JSON.parse(savedFolders);
      setFolders(parsedFolders);
      setActiveFolder(parsedFolders[0]?.name || '');
    } else {
      const defaultFolder = { name: 'Default', colors: [] };
      setFolders([defaultFolder]);
      setActiveFolder('Default');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('colorFolders', JSON.stringify(folders));
  }, [folders]);

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

  const [isMoveColorDialogOpen, setIsMoveColorDialogOpen] = useState(false);
  const [colorToMove, setColorToMove] = useState<ColorItem | null>(null);
  const [selectedTargetFolder, setSelectedTargetFolder] = useState<string>('');

  const openMoveColorDialog = (colorItem: ColorItem) => {
    setColorToMove(colorItem);
    setIsMoveColorDialogOpen(true);
  };

  const closeMoveColorDialog = () => {
    setIsMoveColorDialogOpen(false);
    setColorToMove(null);
  };

  const handleMoveColor = () => {
    if (colorToMove && selectedTargetFolder) {
      moveColor(activeFolder, selectedTargetFolder, colorToMove);
      closeMoveColorDialog();
    }
  };

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

        setFolders((prevFolders) =>
          prevFolders.map((folder) =>
            folder.name === activeFolder
              ? { ...folder, colors: [...folder.colors, newColorItem] }
              : folder,
          ),
        );

        setColor(pickedColor);
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
    if (
      newFolderName &&
      !folders.some((folder) => folder.name === newFolderName)
    ) {
      setFolders([...folders, { name: newFolderName, colors: [] }]);
      setActiveFolder(newFolderName);
      setNewFolderName('');
      setIsAddFolderDialogOpen(false);
    }
  };

  const deleteFolder = (folderName: string) => {
    setFolders(folders.filter((folder) => folder.name !== folderName));
    if (activeFolder === folderName) {
      setActiveFolder(folders[0]?.name || '');
    }
  };

  const deleteColor = (folderName: string, colorToDelete: ColorItem) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.name === folderName
          ? {
              ...folder,
              colors: folder.colors.filter((c) => c !== colorToDelete),
            }
          : folder,
      ),
    );
  };

  const startEditingColor = (colorItem: ColorItem) => {
    setEditingColor(colorItem);
    setEditedCssVar(colorItem.cssVar);
  };

  const saveEditedColor = () => {
    if (editingColor) {
      setFolders((prevFolders) =>
        prevFolders.map((folder) =>
          folder.name === activeFolder
            ? {
                ...folder,
                colors: folder.colors.map((c) =>
                  c === editingColor ? { ...c, cssVar: editedCssVar } : c,
                ),
              }
            : folder,
        ),
      );
      setEditingColor(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const moveColor = (
    fromFolder: string,
    toFolder: string,
    colorToMove: ColorItem,
  ) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) => {
        if (folder.name === fromFolder) {
          return {
            ...folder,
            colors: folder.colors.filter((c) => c !== colorToMove),
          };
        }
        if (folder.name === toFolder) {
          return { ...folder, colors: [...folder.colors, colorToMove] };
        }
        return folder;
      }),
    );
  };

  const generateCode = () => {
    let cssVars = '';
    let tailwindColors = '';

    folders.forEach((folder) => {
      folder.colors.forEach((colorItem) => {
        cssVars += `  ${colorItem.cssVar}: ${colorItem.color};\n`;
      });
    });

    folders.forEach((folder) => {
      folder.colors.forEach((colorItem) => {
        tailwindColors += `      '${colorItem.cssVar.slice(2)}': '${colorItem.color}',\n`;
      });
    });

    const rootCode = `:root {\n${cssVars}}`;
    const tailwindConfigCode = `extend: {\n    colors: {\n${tailwindColors}    },\n  },`;

    setGeneratedCode(`/* CSS Variables */\n${rootCode}\n`);
    setTailwindCode(`/* Tailwind CSS Configuration */\n${tailwindConfigCode}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-background text-foreground">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Color Picker</h1>
        <div className="flex items-center gap-2">
          <Button
            variant={pickingColor ? 'destructive' : 'outline'}
            onClick={() => setPickingColor(!pickingColor)}
          >
            {pickingColor ? 'Cancel' : 'Pick Color'}
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsAddFolderDialogOpen(true)}
          >
            Add Folder
          </Button>
          <Button variant="outline" onClick={generateCode}>
            Generate Code
          </Button>
        </div>
      </div>
      {isAddFolderDialogOpen && (
        <Dialog
          open={isAddFolderDialogOpen}
          onOpenChange={setIsAddFolderDialogOpen}
        >
          <DialogContent className="w-full max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Folder</DialogTitle>
            </DialogHeader>
            <div>
              <div className="space-y-4">
                <Input
                  placeholder="Folder Name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addFolder();
                    }
                  }}
                />
              </div>
            </div>
            <DialogFooter className="flex !justify-between w-[100%] items-center">
              <Button
                variant="destructive"
                onClick={() => setIsAddFolderDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="outline" onClick={addFolder}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Upload Image</h2>
          {imageSrc ? (
            <div className="relative">
              <img
                src={imageSrc}
                alt="Uploaded"
                ref={imgRef}
                className="w-full rounded-lg cursor-crosshair"
                onClick={handleColorPick}
                onMouseMove={handleMouseMove}
              />
              <canvas
                ref={canvasRef}
                className="hidden"
                width={imgRef.current?.width}
                height={imgRef.current?.height}
              />
              {pickingColor && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Last Picked Color
                  </h3>
                  {color && (
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-8 h-8 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      ></div>
                      <span>{color}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <FileUploadUi handleFileUpload={handleFileUpload} />
          )}
        </div>
        <div className="bg-[#161717] p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Color Folders</h2>
          <div className="grid gap-4">
            {folders.map((folder) => (
              <div key={folder.name} className="p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-md font-bold">{folder.name}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteFolder(folder.name)}
                  >
                    <TrashIcon className="w-5 h-5 text-destructive" />
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {folder.colors.map((colorItem) => (
                    <div
                      key={`${colorItem.color}-${colorItem.cssVar}`}
                      className="bg-[var(--color-card)] p-2 rounded-lg flex flex-col items-center justify-center"
                    >
                      <div
                        className="w-12 h-12 rounded-full"
                        style={{ backgroundColor: colorItem.color }}
                      />
                      <div className="text-xs mt-2 text-muted-foreground">
                        {editingColor === colorItem ? (
                          <Input
                            value={editedCssVar}
                            onChange={(e) => setEditedCssVar(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                saveEditedColor();
                              }
                            }}
                            className="w-24 text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
                            autoFocus
                          />
                        ) : (
                          <>
                            <div>{colorItem.cssVar}</div>
                            <div className="text-xs">{colorItem.color}</div>
                          </>
                        )}
                      </div>
                      <div className="mt-2 space-x-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => copyToClipboard(colorItem.cssVar)}
                        >
                          Copy
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => startEditingColor(colorItem)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => openMoveColorDialog(colorItem)}
                        >
                          Move
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteColor(folder.name, colorItem)}
                        >
                          <TrashIcon className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {generatedCode && (
        <Tabs defaultValue="tailwind">
          <TabsList>
            <TabsTrigger value="tailwind">Tailwind Config</TabsTrigger>
            <TabsTrigger value="variables">CSS Variables</TabsTrigger>
          </TabsList>
          <TabsContent value="tailwind">
            <CodeHighlight title="tailwind.config.js" fileIcon="" avatarSrc="">
              {tailwindCode}
            </CodeHighlight>
          </TabsContent>
          <TabsContent value="variables">
            <CodeHighlight title="variables.css" fileIcon="" avatarSrc="">
              {generatedCode}
            </CodeHighlight>
          </TabsContent>
        </Tabs>
      )}
      {isMoveColorDialogOpen && (
        <Dialog
          open={isMoveColorDialogOpen}
          onOpenChange={setIsMoveColorDialogOpen}
        >
          <DialogContent className="w-full max-w-md">
            <DialogHeader>
              <DialogTitle>Move Color</DialogTitle>
            </DialogHeader>
            <div>
              <div className="space-y-4">
                <div className="text-sm mb-2">Select target folder:</div>
                <select
                  value={selectedTargetFolder}
                  onChange={(e) => setSelectedTargetFolder(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded-md"
                >
                  <option value="">Select a folder</option>
                  {folders
                    .filter((folder) => folder.name !== activeFolder)
                    .map((folder) => (
                      <option key={folder.name} value={folder.name}>
                        {folder.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <DialogFooter className="flex !justify-between w-[100%] items-center">
              <Button variant="destructive" onClick={closeMoveColorDialog}>
                Cancel
              </Button>
              <Button variant="outline" onClick={handleMoveColor}>
                Move
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
