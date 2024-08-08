import {
    Button,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle, Input
} from '@/components/ui/';
import { useState } from 'react';
import { AddFolderDialogProps } from './types.colors';

export default function AddFolderDialog({ isOpen, onClose, addFolder }: AddFolderDialogProps) {
    const [newFolderName, setNewFolderName] = useState('');

    const handleAddFolder = () => {
        if (newFolderName.trim()) {
            addFolder(newFolderName);
            setNewFolderName('');
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
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
                                    handleAddFolder();
                                }
                            }}
                        />
                    </div>
                </div>
                <DialogFooter className="flex !justify-between w-[100%] items-center">
                    <Button variant="destructive" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="outline" onClick={handleAddFolder}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}