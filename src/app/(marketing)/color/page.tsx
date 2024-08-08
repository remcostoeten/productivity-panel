'use client';

import { Button } from '@/components/ui/button';
import { SetStateAction, useEffect, useState } from 'react';
import AddFolderDialog from './_components/AddFolderDialog';
import CodeBlock from './_components/CodeBlockShell';
import ColorFolders from './_components/ColorFolders';
import ImageUploader from './_components/ImageUploader';
import MoveColorDialog from './_components/MoveColorDialog';
import { useColorPicker } from './hooks/useColorPicker';
import useFolders from './hooks/useFolders';

export default function ColorPicker() {
    const [isAddFolderDialogOpen, setIsAddFolderDialogOpen] = useState(false);
    const [isMoveColorDialogOpen, setIsMoveColorDialogOpen] = useState(false);
    const [colorToMove, setColorToMove] = useState(null);
    const [generatedCode, setGeneratedCode] = useState('');

    const {
        folders,
        activeFolder,
        setActiveFolder,
        addColor,
        addFolder,
        deleteFolder,
        deleteColor,
        moveColor,
    } = useFolders();

    const {
        imageSrc,
        setImageSrc,
        color,
        pickingColor,
        setPickingColor,
        handleColorPick,
        handleMouseMove,
        imgRef,
        canvasRef,
    } = useColorPicker(folders, activeFolder, addColor, moveColor);

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
    }, [setImageSrc]);

    const openMoveColorDialog = (colorItem: SetStateAction<null>) => {
        setColorToMove(colorItem);
        setIsMoveColorDialogOpen(true);
    };

    function generateCode() {
        let code = '';
        folders.forEach((folder) => {
            code += `// ${folder.name}\n`;
            folder.colors.forEach((colorItem) => {
                code += `export const ${colorItem.cssVar} = '${colorItem.color}';\n`;
            });
            code += '\n';
        });

        setGeneratedCode(code);
    }

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUploader
                    imageSrc={imageSrc}
                    setImageSrc={setImageSrc}
                    pickingColor={pickingColor}
                    color={color}
                    handleColorPick={handleColorPick}
                    handleMouseMove={handleMouseMove}
                    imgRef={imgRef}
                    canvasRef={canvasRef}
                />
                <ColorFolders
                    folders={folders}
                    deleteFolder={deleteFolder}
                    deleteColor={deleteColor}
                    openMoveColorDialog={openMoveColorDialog}
                />
            </div>

            <AddFolderDialog
                isOpen={isAddFolderDialogOpen}
                onClose={() => setIsAddFolderDialogOpen(false)}
                addFolder={addFolder}
            />

            <MoveColorDialog
                isOpen={isMoveColorDialogOpen}
                onClose={() => setIsMoveColorDialogOpen(false)}
                folders={folders}
                activeFolder={activeFolder}
                colorToMove={colorToMove}
                moveColor={moveColor}
            />

            {generatedCode && (
                <CodeBlock
                    code={generatedCode}
                    language="jsx"
                    showLineNumbers={true}
                    maxHeight="400px"
                />
            )}
        </div>
    );
}