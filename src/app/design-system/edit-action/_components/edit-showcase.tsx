"use client";

import AccessibleEditForm from '@/components/shells/edit-action-popover';
import CodeHighlight from "@/components/ui/CodeHighlight/CodeHighlight";
import { DesignSystemWrapper } from '../../_components/DesignSystemWrapper';

const EditFormShowcase: React.FC = () => {
    const handleEdit = async (formData: FormData) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Edited:', Object.fromEntries(formData));
    };

    const variants = [
        {
            title: 'Default Input',
            description: 'Basic edit form with default input type.',
            code: `<AccessibleEditForm
  itemName="Username"
  itemId="username"
  initialValue="JohnDoe"
  onEdit={async (formData) => {
    // Handle edit logic
  }}
  ariaLabel="Edit username form"
/>`,
            component: (
                <AccessibleEditForm
                    itemName="Username"
                    itemId="username"
                    initialValue="JohnDoe"
                    onEdit={handleEdit}
                    ariaLabel="Edit username form"
                />
            ),
        },
        {
            title: 'Textarea Input',
            description: 'Edit form with textarea input type.',
            code: `<AccessibleEditForm
  itemName="Bio"
  itemId="bio"
  initialValue="I am a software developer."
  onEdit={async (formData) => {
    // Handle edit logic
  }}
  ariaLabel="Edit bio form"
  inputType="textarea"
/>`,
            component: (
                <AccessibleEditForm
                    itemName="Bio"
                    itemId="bio"
                    initialValue="I am a software developer."
                    onEdit={handleEdit}
                    ariaLabel="Edit bio form"
                    inputType="textarea"
                />
            ),
        },
        {
            title: 'Icon Trigger',
            description: 'Edit form with icon trigger style.',
            code: `<AccessibleEditForm
  itemName="Email"
  itemId="email"
  initialValue="john@example.com"
  onEdit={async (formData) => {
    // Handle edit logic
  }}
  ariaLabel="Edit email form"
  triggerStyle="icon"
/>`,
            component: (
                <AccessibleEditForm
                    itemName="Email"
                    itemId="email"
                    initialValue="john@example.com"
                    onEdit={handleEdit}
                    ariaLabel="Edit email form"
                    triggerStyle="icon"
                />
            ),
        },
        {
            title: 'Custom Validation',
            description: 'Edit form with custom validation.',
            code: `<AccessibleEditForm
  itemName="Age"
  itemId="age"
  initialValue="30"
  onEdit={async (formData) => {
    // Handle edit logic
  }}
  ariaLabel="Edit age form"
  validate={(value) => {
    const age = parseInt(value);
    if (isNaN(age) || age < 0 || age > 120) {
      return "Please enter a valid age between 0 and 120";
    }
    return null;
  }}
/>`,
            component: (
                <AccessibleEditForm
                    itemName="Age"
                    itemId="age"
                    initialValue="30"
                    onEdit={handleEdit}
                    ariaLabel="Edit age form"
                    validate={(value) => {
                        const age = parseInt(value);
                        if (isNaN(age) || age < 0 || age > 120) {
                            return "Please enter a valid age between 0 and 120";
                        }
                        return null;
                    }}
                />
            ),
        },
    ];

    return (
        <div className="space-y-12">
            {variants.map((variant, index) => (
                <DesignSystemWrapper
                    key={index}
                    title={variant.title}
                    description={variant.description}
                >
                    <div className="mb-4">{variant.component}</div>
                    <CodeHighlight
                        language="tsx"
                        title="Usage"
                        fileIcon=""
                        avatarSrc=""
                    >
                        {variant.code}
                    </CodeHighlight>
                </DesignSystemWrapper>
            ))}
        </div>
    );
};

export default EditFormShowcase;
