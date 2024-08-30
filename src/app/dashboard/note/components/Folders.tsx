"use client";

import {
  Button
} from '@/components/ui/';
import AccessibleEditForm from '@/components/shells/edit-action-popover';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function AccessibleEditFormDemo() {
    const [name, setName] = useState('John Doe');
    const [bio, setBio] = useState('This is a short bio.');
    const [richText, setRichText] = useState('<p>This is some rich text content.</p>');
    const [controlledOpen, setControlledOpen] = useState(false);

    const handleEdit = async (formData: FormData) => {
        const newValue = formData.get('editValue') as string;
        // Simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success('Edit successful!');
        return newValue;
    };

    const handleNameEdit = async (formData: FormData) => {
        const newName = await handleEdit(formData);
        setName(newName);
    };

    const handleBioEdit = async (formData: FormData) => {
        const newBio = await handleEdit(formData);
        setBio(newBio);
    };

    const handleRichTextEdit = async (formData: FormData) => {
        const newRichText = await handleEdit(formData);
        setRichText(newRichText);
    };

    return (
        <div className="container mx-auto p-4 space-y-8">
            <h1 className="text-2xl font-bold mb-4">AccessibleEditForm Demo</h1>

            <div className="space-y-4 p-4 border rounded-md">
                <h2 className="text-xl font-semibold">Default (Button trigger)</h2>
                <p>Name: <span className="font-medium">{name}</span></p>
                <AccessibleEditForm
                    itemName="Name"
                    itemId="name"
                    initialValue={name}
                    onEdit={handleNameEdit}
                    ariaLabel="Edit name"
                />
            </div>

            <div className="space-y-4 p-4 border rounded-md">
                <h2 className="text-xl font-semibold">Textarea with Icon trigger</h2>
                <p>Bio: <span className="font-medium">{bio}</span></p>
                <AccessibleEditForm
                    itemName="Bio"
                    itemId="bio"
                    initialValue={bio}
                    onEdit={handleBioEdit}
                    ariaLabel="Edit bio"
                    inputType="textarea"
                    triggerStyle="icon"
                />
            </div>

            <div className="space-y-4 p-4 border rounded-md">
                <h2 className="text-xl font-semibold">Rich Text Editor with Custom trigger</h2>
                <div className="border p-2 rounded-md" dangerouslySetInnerHTML={{ __html: richText }} />
                <AccessibleEditForm
                    itemName="Rich Text"
                    itemId="rich-text"
                    initialValue={richText}
                    onEdit={handleRichTextEdit}
                    ariaLabel="Edit rich text"
                    inputType="rich-text"
                    triggerStyle="custom"
                    customTrigger={<Button variant="outline">Edit Rich Text Content</Button>}
                    popoverWidth="w-[500px]"
                />
            </div>

            <div className="space-y-4 p-4 border rounded-md">
                <h2 className="text-xl font-semibold">Controlled Open State</h2>
                <p>Current state: <span className="font-medium">{controlledOpen ? 'Open' : 'Closed'}</span></p>
                <Button onClick={() => setControlledOpen(true)}>Open Edit Form</Button>
                <AccessibleEditForm
                    itemName="Controlled Item"
                    itemId="controlled"
                    initialValue="This is controlled externally"
                    onEdit={async (formData) => {
                        const newValue = await handleEdit(formData);
                        toast.success(`New value: ${newValue}`);
                        setControlledOpen(false);
                    }}
                    ariaLabel="Edit controlled item"
                    controlledOpen={controlledOpen}
                    onCancel={() => {
                        setControlledOpen(false);
                        toast.info('Edit cancelled');
                    }}
                />
            </div>
        </div>
    );
}
