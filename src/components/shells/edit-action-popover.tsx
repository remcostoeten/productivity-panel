"use client";

import {
  Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, Input, Popover, PopoverContent, PopoverTrigger, Textarea
} from '@/components/ui/';
import { Loader2, Pencil } from "lucide-react";
import dynamic from 'next/dynamic';
import React, { useEffect, useState, useTransition } from 'react';
import { toast } from 'react-hot-toast';

const RichTextEditor = dynamic(() => import('@/components/TipTap'), { ssr: false });

type TriggerStyle = 'button' | 'icon' | 'text' | 'custom';
type InputType = 'input' | 'textarea' | 'rich-text';

interface AccessibleEditFormProps {
    itemName: string;
    itemId: string;
    initialValue: string;
    onEdit: (formData: FormData) => Promise<void>;
    ariaLabel: string;
    inputType?: InputType;
    triggerStyle?: TriggerStyle;
    customTrigger?: React.ReactNode;
    popoverWidth?: string;
    triggerClassName?: string;
    validate?: (value: string) => string | null;
    extraFields?: React.ReactNode;
    onCancel?: () => void;
    onError?: (error: any) => void;
    controlledOpen?: boolean;
    popoverPlacement?: 'top' | 'bottom' | 'left' | 'right';
    renderInline?: boolean;
    richTextConfig?: any;
}

export default function AccessibleEditForm({
    itemName,
    itemId,
    initialValue,
    onEdit,
    ariaLabel,
    inputType = 'input',
    
    triggerStyle = 'button',
    customTrigger,
    popoverWidth = 'w-80',
    triggerClassName = '',
    validate,
    extraFields,
    onCancel,
    onError,
    controlledOpen,
    popoverPlacement = 'bottom',
    renderInline = false,
    richTextConfig,
}: AccessibleEditFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [editValue, setEditValue] = useState(initialValue);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    useEffect(() => {
        if (controlledOpen !== undefined) {
            setIsOpen(controlledOpen);
        }
    }, [controlledOpen]);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        if (editValue !== initialValue) {
            setShowConfirmDialog(true);
        } else {
            setIsOpen(false);
            if (onCancel) {
                onCancel();
            }
        }
    };

    const handleAction = async (formData: FormData) => {
        if (validate) {
            const validationError = validate(editValue);
            if (validationError) {
                setError(validationError);
                return;
            }
        }

        startTransition(async () => {
            try {
                await onEdit(formData);
                setIsOpen(false);
                toast.success(`${itemName} updated successfully`);
            } catch (error) {
                console.error(`Failed to edit ${itemName.toLowerCase()}:`, error);
                toast.error(`Failed to update ${itemName.toLowerCase()}`);
                if (onError) {
                    onError(error);
                }
            }
        });
    };

    const renderInput = () => {
        switch (inputType) {
            case 'textarea':
                return (
                    <Textarea
                        id={`edit-${itemId}`}
                        name="editValue"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        placeholder={`Enter new ${itemName.toLowerCase()} name`}
                        disabled={isPending}
                    />
                );
            case 'rich-text':
                return (
                    <RichTextEditor
                        id={`edit-${itemId}`}
                        name="editValue"
                        value={editValue}
                        onChange={setEditValue}
                        config={richTextConfig}
                    />
                );
            default:
                return (
                    <Input
                        id={`edit-${itemId}`}
                        name="editValue"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        placeholder={`Enter new ${itemName.toLowerCase()} name`}
                        disabled={isPending}
                    />
                );
        }
    };

    const renderTrigger = () => {
        const triggerProps = {
            onClick: handleOpen,
            className: triggerClassName
        };

        switch (triggerStyle) {
            case 'icon':
                return (
                    <Button variant="ghost" size="icon" {...triggerProps}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit {itemName}</span>
                    </Button>
                );
            case 'text':
                return (
                    <span {...triggerProps} className={`cursor-pointer text-blue-600 hover:underline ${triggerClassName}`}>
                        Edit
                    </span>
                );
            case 'custom':
                return React.cloneElement(customTrigger as React.ReactElement, triggerProps);
            default:
                return (
                    <Button variant="outline" {...triggerProps}>
                        Edit {itemName}
                    </Button>
                );
        }
    };

    const renderForm = () => (
        <form action={handleAction} aria-label={ariaLabel}>
            <div className="grid gap-4">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none">Edit {itemName}</h4>
                    <p className="text-sm text-muted-foreground">
                        Make changes to your {itemName.toLowerCase()} here.
                    </p>
                </div>
                <div className="grid gap-2">
                    {renderInput()}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                {extraFields}
                <Button type="submit" disabled={isPending}>
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        "Save changes"
                    )}
                </Button>
            </div>
        </form>
    );

    if (renderInline) {
        return renderForm();
    }

    return (
        <>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    {renderTrigger()}
                </PopoverTrigger>
                <PopoverContent className={popoverWidth} side={popoverPlacement}>
                    {renderForm()}
                </PopoverContent>
            </Popover>
            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Unsaved Changes</DialogTitle>
                        <DialogDescription>
                            You have unsaved changes. Are you sure you want to close without saving?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                            Continue Editing
                        </Button>
                        <Button variant="destructive" onClick={() => {
                            setShowConfirmDialog(false);
                            setIsOpen(false);
                            setEditValue(initialValue);
                            if (onCancel) {
                                onCancel();
                            }
                        }}>
                            Discard Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
