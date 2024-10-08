"use client";

import CodeHighlight from "@/components/ui/CodeHighlight/CodeHighlight";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@c/ui";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { DesignSystemWrapper } from "../_components/DesignSystemWrapper";
import { useColorPicker } from "./ _hooks/use-color-picker";
import useFileUpload from "./ _hooks/use-file-upload";
import AddFolderDialog from "./_components/AddFolderDialog";
import ButtonBar from "./_components/ButtonBar";
import ColorFolder from "./_components/ColorFolder";
import FileUploadUi from "./_components/FileUploadUi";
import MoveColorDialog from "./_components/MoveColorDialog";
import { ColorItem, Folder } from "./types.color-tool";

export default function ColorToolPage() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [activeFolder, setActiveFolder] = useState<string>("");
  const [isAddFolderDialogOpen, setIsAddFolderDialogOpen] = useState(false);
  const [isMoveColorDialogOpen, setIsMoveColorDialogOpen] = useState(false);
  const [colorToMove, setColorToMove] = useState<ColorItem | null>(null);
  const [editingColor, setEditingColor] = useState<ColorItem | null>(null);
  const [editedCssVar, setEditedCssVar] = useState("");
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [tailwindCode, setTailwindCode] = useState<string>("");
  const [useCssVariables, setUseCssVariables] = useState(true);
  const [isNewFolderPopoverOpen, setIsNewFolderPopoverOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [tempPickedColor, setTempPickedColor] = useState<ColorItem | null>(
    null,
  );

  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { imageSrc, handleFileUpload } = useFileUpload();
  const {
    color,
    pickingColor,
    setPickingColor,
    hoverColor,
    cursorScale,
    handleColorPick,
    handleMouseMove,
    handleScroll,
  } = useColorPicker();

  useEffect(() => {
    const savedFolders = localStorage.getItem("colorFolders");
    if (savedFolders) {
      const parsedFolders = JSON.parse(savedFolders);
      setFolders(parsedFolders);
      setActiveFolder(parsedFolders[0]?.name || "");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("colorFolders", JSON.stringify(folders));
  }, [folders]);

  const handleClearLocalStorage = () => {
    localStorage.removeItem("colorFolders");
    setFolders([]);
    setActiveFolder("");
    toast.success("Local storage cleared");
  };

  const handleColorPickEvent = (event: React.MouseEvent<HTMLImageElement>) => {
    if (pickingColor && imgRef.current && canvasRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        const pickedColor = `#${pixelData[0].toString(16).padStart(2, "0")}${pixelData[1].toString(16).padStart(2, "0")}${pixelData[2].toString(16).padStart(2, "0")}`;
        const newColorItem = handleColorPick(pickedColor);

        if (folders.length === 0) {
          setTempPickedColor(newColorItem);
          setIsNewFolderPopoverOpen(true);
        } else {
          addColorToFolder(activeFolder, newColorItem);
          toast.success("Color added to folder");
        }
      }
    }
  };

  const handleMouseMoveEvent = (event: React.MouseEvent<HTMLImageElement>) => {
    if (pickingColor && imgRef.current && canvasRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        handleMouseMove(pixelData);
      }
    }
  };

  const handleScrollEvent = (event: React.WheelEvent<HTMLImageElement>) => {
    if (pickingColor) {
      const delta = Math.sign(event.deltaY);
      handleScroll(delta);
    }
  };

  const addFolder = (name: string, description: string) => {
    if (name && !folders.some((folder) => folder.name === name)) {
      setFolders((prevFolders) => [
        ...prevFolders,
        { name, description, colors: [] },
      ]);
      setActiveFolder(name);
      setIsAddFolderDialogOpen(false);
      toast.success("Folder added");
    }
  };

  const createNewFolderWithColor = () => {
    if (newFolderName && tempPickedColor) {
      const newFolder: Folder = {
        name: newFolderName,
        description: "",
        colors: [tempPickedColor],
      };
      setFolders((prevFolders) => [...prevFolders, newFolder]);
      setActiveFolder(newFolderName);
      setIsNewFolderPopoverOpen(false);
      setNewFolderName("");
      setTempPickedColor(null);
      toast.success("Folder created with picked color");
    }
  };

  const deleteFolder = (folderName: string) => {
    setFolders((prevFolders) =>
      prevFolders.filter((folder) => folder.name !== folderName),
    );
    if (activeFolder === folderName) {
      setActiveFolder(folders[0]?.name || "");
    }
    toast.success("Folder deleted");
  };

  const addColorToFolder = (folderName: string, colorItem: ColorItem) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.name === folderName
          ? { ...folder, colors: [...folder.colors, colorItem] }
          : folder,
      ),
    );
    toast.success("Color added to folder");
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
    toast.success("Color deleted");
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
      toast.success("Color edited");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const openMoveColorDialog = (colorItem: ColorItem) => {
    setColorToMove(colorItem);
    setIsMoveColorDialogOpen(true);
  };

  const handleMoveColor = (targetFolder: string) => {
    if (colorToMove) {
      setFolders((prevFolders) =>
        prevFolders.map((folder) => {
          if (folder.name === activeFolder) {
            return {
              ...folder,
              colors: folder.colors.filter((c) => c !== colorToMove),
            };
          }
          if (folder.name === targetFolder) {
            return {
              ...folder,
              colors: [
                ...folder.colors,
                { ...colorToMove, color: color || colorToMove.color },
              ],
            };
          }
          return folder;
        }),
      );
      setIsMoveColorDialogOpen(false);
      setColorToMove(null);
      toast.success("Color moved");
    }
  };

  const generateCode = () => {
    let cssVars = "";
    let tailwindColors = "";

    folders.forEach((folder) => {
      folder.colors.forEach((colorItem) => {
        cssVars += `  ${colorItem.cssVar}: ${colorItem.color};\n`;
      });
    });

    folders.forEach((folder) => {
      folder.colors.forEach((colorItem) => {
        if (useCssVariables) {
          tailwindColors += `      '${colorItem.cssVar.slice(2)}': 'var(${colorItem.cssVar})',\n`;
        } else {
          tailwindColors += `      '${colorItem.cssVar.slice(2)}': '${colorItem.color}',\n`;
        }
      });
    });

    const rootCode = `:root {\n${cssVars}}`;
    const tailwindConfigCode = `extend: {\n    colors: {\n${tailwindColors}    },\n  },`;

    setGeneratedCode(`${rootCode}\n`);
    setTailwindCode(`${tailwindConfigCode}`);
    toast.success("Code generated");
  };

  return (
    <div>
      <DesignSystemWrapper
        title="Color Picker"
        description="The Color Picker feature streamlines color management with an intuitive
          interface for uploading images, picking colors, and generating CSS
          variables. Users can organize colors into folders, manipulate them, and
          get code snippets for easy integration. All data is saved locally for
          easy access."
      />
      <ButtonBar
        pickingColor={pickingColor}
        setPickingColor={setPickingColor}
        handleClearLocalStorage={handleClearLocalStorage}
        setIsAddFolderDialogOpen={setIsAddFolderDialogOpen}
        generateCode={generateCode}
        useCssVariables={useCssVariables}
        setUseCssVariables={setUseCssVariables}
      />
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
                onClick={handleColorPickEvent}
                onMouseMove={handleMouseMoveEvent}
                onWheel={handleScrollEvent}
                style={{
                  cursor: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${64 * cursorScale}" height="${64 * cursorScale}" viewBox="0 0 64 64"><g transform="translate(32, 32)"><circle r="${28 * cursorScale}" fill="${hoverColor}" stroke="white" stroke-width="${6 * cursorScale}"/><line x1="-32" x2="32" y1="0" y2="0" stroke="white" stroke-width="${4 * cursorScale}"/><line x1="0" x2="0" y1="-32" y2="32" stroke="white" stroke-width="${4 * cursorScale}"/></g></svg>') ${32 * cursorScale} ${32 * cursorScale}, auto`,
                }}
              />
              <canvas
                ref={canvasRef}
                className="hidden"
                width={imgRef.current?.width}
                height={imgRef.current?.height}
              />
              {pickingColor && (
                <>
                  <hr />
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
                </>
              )}
            </div>
          ) : (
            <FileUploadUi handleFileUpload={handleFileUpload} />
          )}
        </div>

        <div className="flex flex-col gap-4">
          {folders.length !== 0 ? (
            <h2 className="text-lg font-bold mb-4">Color Folders</h2>
          ) : (
            <div className="h-[28px] mb-4" />
          )}
          {folders.map((folder) => (
            <ColorFolder
              key={folder.name}
              folder={folder}
              deleteFolder={deleteFolder}
              deleteColor={deleteColor}
              startEditingColor={startEditingColor}
              saveEditedColor={saveEditedColor}
              editingColor={editingColor}
              editedCssVar={editedCssVar}
              setEditedCssVar={setEditedCssVar}
              copyToClipboard={copyToClipboard}
              openMoveColorDialog={openMoveColorDialog}
            />
          ))}
        </div>
      </div>

      {generatedCode && (
        <Tabs defaultValue="tailwind">
          <TabsList>
            <TabsTrigger value="tailwind">Tailwind Config</TabsTrigger>
            <TabsTrigger value="variables">CSS Variables</TabsTrigger>
          </TabsList>
          <TabsContent value="tailwind">
            <CodeHighlight
              language="tsx"
              title="tailwind.config.js"
              fileIcon=""
              avatarSrc=""
            >
              {tailwindCode}
            </CodeHighlight>
          </TabsContent>
          <TabsContent value="variables">
            <CodeHighlight
              language="css"
              title="variables.css"
              fileIcon=""
              avatarSrc=""
            >
              {generatedCode}
            </CodeHighlight>
          </TabsContent>
        </Tabs>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        {isAddFolderDialogOpen && (
          <AddFolderDialog
            isOpen={isAddFolderDialogOpen}
            onClose={() => setIsAddFolderDialogOpen(false)}
            onAddFolder={addFolder}
          />
        )}
        {isMoveColorDialogOpen && (
          <MoveColorDialog
            isOpen={isMoveColorDialogOpen}
            onClose={() => setIsMoveColorDialogOpen(false)}
            folders={folders}
            activeFolder={activeFolder}
            colorToMove={colorToMove}
            onMoveColor={handleMoveColor}
          />
        )}
      </Suspense>

      <Popover
        open={isNewFolderPopoverOpen}
        onOpenChange={setIsNewFolderPopoverOpen}
      >
        <PopoverTrigger asChild>
          <div className="hidden">Trigger</div>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <h3 className="font-medium leading-none">Create New Folder</h3>
            <p className="text-sm text-muted-foreground">
              You've picked your first color! Let's create a folder to store it.
            </p>
            <div className="grid gap-2">
              <Input
                id="new-folder-name"
                placeholder="Enter folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
            </div>
            <Button onClick={createNewFolderWithColor}>Create Folder</Button>
          </div>
        </PopoverContent>
      </Popover>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#040404",
            color: "#ffffff",
            border: "1px solid white",
            borderRadius: "8px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
          },
          success: {
            icon: <CheckIcon className="w-5 h-5 text-success" />,
          },
          error: {
            icon: <ExclamationTriangleIcon className="w-5 h-5 text-error" />,
          },
        }}
      />
    </div>
  );
}
