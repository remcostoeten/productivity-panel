import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { ColorItemProps } from './types.colors';

export default function ColorItem({
    colorItem,
    folderName,
    deleteColor,
    openMoveColorDialog,
}: ColorItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCssVar, setEditedCssVar] = useState(colorItem.cssVar);

    const handleSave = () => {
        // Implement save logic here
        setIsEditing(false);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="bg-[var(--color-card)] p-2 rounded-lg flex flex-col items-center justify-center">
            <div
                className="w-12 h-12 rounded-full"
                style={{ backgroundColor: colorItem.color }}
            />
            <div className="text-xs mt-2 text-muted-foreground">
                {isEditing ? (
                    <Input
                        value={editedCssVar}
                        onChange={(e) => setEditedCssVar(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSave();
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
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? 'Save' : 'Edit'}
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
                    onClick={() => deleteColor(folderName, colorItem)}
                >
                    <TrashIcon className="w-4 h-4 text-destructive" />
                </Button>
            </div>
        </div>
    );
}