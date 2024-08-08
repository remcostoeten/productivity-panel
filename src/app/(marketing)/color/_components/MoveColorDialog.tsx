import {
    Button,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/';
import { useState } from 'react';
import { MoveColorDialogProps } from './types.colors';

export default function MoveColorDialog({
    isOpen,
    onClose,
    folders,
    activeFolder,
    colorToMove,
    moveColor,
}: MoveColorDialogProps) {
    const [selectedTargetFolder, setSelectedTargetFolder] = useState('');

    const handleMoveColor = () => {
        if (colorToMove && selectedTargetFolder) {
            moveColor(activeFolder, selectedTargetFolder, colorToMove);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
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
                    <Button variant="destructive" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="outline" onClick={handleMoveColor}>
                        Move
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}