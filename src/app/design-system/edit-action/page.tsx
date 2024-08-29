"use client";

import Flex from '@/components/atoms/Flex';
import { AccessibleForm } from '@/components/shells/action-form';
import AccessibleEditForm from '@/components/shells/edit-action-popover';
import Tiptap from '@/components/TipTap';
import { Button, Input } from "@/components/ui/";
import CodeHighlight from '@/components/ui/CodeHighlight/CodeHighlight';
import { useState } from 'react';
import { DesignSystemWrapper } from '../_components/DesignSystemWrapper';

export default function AccessibleEditFormShowcase() {
  const [userName, setUserName] = useState("John Doe");
  const [userNameIcon, setUserNameIcon] = useState("Jane Smith");
  const [description, setDescription] = useState("This is a long description that requires a textarea.");
  const [email, setEmail] = useState("user@example.com");
  const [profile, setProfile] = useState("John Doe");
  const [inlineEdit, setInlineEdit] = useState("Edit me inline");
  const [richContent, setRichContent] = useState("<p>This is <strong>rich</strong> content.</p>");

  // New state for combined form example
  const [combinedUserName, setCombinedUserName] = useState("John Doe");
  const [combinedUserBio, setCombinedUserBio] = useState("This is a short bio.");

  const handleEdit = async (formData: FormData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const editedValue = formData.get('editValue') as string;
    console.log('Edited:', editedValue);
    return editedValue;
  };

  const handleCombinedFormSubmit = async (formData: FormData) => {
    console.log("Combined form submitted:", Object.fromEntries(formData));
    // You can perform additional actions here, like sending data to a server
  };

  function TitleWrapper({ children }: { children?: React.ReactNode }) {
    return (
      <Flex className='mt-8  mb-0 w-fit' justify='between' dir='col' gap='4'>
        {children}
      </Flex>
    );
  }

  return (
    <DesignSystemWrapper
      title="Showcase of a flexible and accessible edit form component"
      description="When doing a lot of CRUD operations this is a pattern you'll (I) be using a lot, thus I created a `shell` component which acts as a wrapper and has all the scenarios/edge cases covered you'd need for updating any data. Below are multiple examples of `<AccessibleEditForm/>`."
    >
      <TitleWrapper>
        <h3 className="text-lg font-semibold mb-4">Basic Usage</h3>
        <Flex dir='col' gap="2">
          <p>Current value: {userName}</p>
          <AccessibleEditForm
            itemName="User"
            itemId="user1"
            initialValue={userName}
            onEdit={async (formData) => {
              const newValue = await handleEdit(formData);
              setUserName(newValue);
            }}
            ariaLabel="Edit user name"
          />
        </Flex>
        <CodeHighlight language="tsx" title="Basic Usage">
          {`<AccessibleEditForm
  itemName="User"
  itemId="user1"
  initialValue={userName}
  onEdit={async (formData) => {
    const newValue = await handleEdit(formData);
    setUserName(newValue);
  }}
  ariaLabel="Edit user name"
/>`}
        </CodeHighlight>
      </TitleWrapper>

      <Flex dir='col' flex="1">
        <h3 className="text-lg font-semibold mb-4">Icon Trigger</h3>
        <Flex dir='col' gap="2">
          <p>Current value: {userNameIcon}</p>
          <AccessibleEditForm
            itemName="User"
            itemId="user2"
            initialValue={userNameIcon}
            onEdit={async (formData) => {
              const newValue = await handleEdit(formData);
              setUserNameIcon(newValue);
            }}
            ariaLabel="Edit user name"
            triggerStyle="icon"
          />
        </Flex>
        <Flex flex="1">
          <CodeHighlight language="tsx" title="Icon Trigger">
            {`<AccessibleEditForm
  itemName="User"
  itemId="user2"
  initialValue={userNameIcon}
  onEdit={async (formData) => {
    const newValue = await handleEdit(formData);
    setUserNameIcon(newValue);
  }}
  ariaLabel="Edit user name"
  triggerStyle="icon"
/>`}
          </CodeHighlight>
        </Flex>
      </Flex>

      <TitleWrapper>
        <h3 className="text-lg font-semibold mb-4">Textarea Input</h3>
        <Flex dir='col' gap="2">
          <p>Current value: {description}</p>
          <AccessibleEditForm
            itemName="Description"
            itemId="desc1"
            initialValue={description}
            onEdit={async (formData) => {
              const newValue = await handleEdit(formData);
              setDescription(newValue);
            }}
            ariaLabel="Edit description"
            inputType="textarea"
          />
        </Flex>
        <CodeHighlight language="tsx" title="Textarea Input">
          {`<AccessibleEditForm
  itemName="Description"
  itemId="desc1"
  initialValue={description}
  onEdit={async (formData) => {
    const newValue = await handleEdit(formData);
    setDescription(newValue);
  }}
  ariaLabel="Edit description"
  inputType="textarea"
/>`}
        </CodeHighlight>
      </TitleWrapper>

      <TitleWrapper>
        <h3 className="text-lg font-semibold mb-4">Custom Validation</h3>
        <Flex dir='col' gap="2">
          <p>Current value: {email}</p>
          <AccessibleEditForm
            itemName="Email"
            itemId="email1"
            initialValue={email}
            onEdit={async (formData) => {
              const newValue = await handleEdit(formData);
              setEmail(newValue);
            }}
            ariaLabel="Edit email"
            validate={(value) => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return emailRegex.test(value) ? null : "Invalid email format";
            }}
          />
        </Flex>
        <CodeHighlight language="tsx" title="Custom Validation">
          {`<AccessibleEditForm
  itemName="Email"
  itemId="email1"
  initialValue={email}
  onEdit={async (formData) => {
    const newValue = await handleEdit(formData);
    setEmail(newValue);
  }}
  ariaLabel="Edit email"
  validate={(value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : "Invalid email format";
  }}
/>`}
        </CodeHighlight>
      </TitleWrapper>

      <TitleWrapper>
        <h3 className="text-lg font-semibold mb-4">Extra Fields</h3>
        <Flex dir='col' gap="2">
          <p>Current value: {profile}</p>
          <AccessibleEditForm
            itemName="User Profile"
            itemId="profile1"
            initialValue={profile}
            onEdit={async (formData) => {
              const newValue = await handleEdit(formData);
              setProfile(newValue);
            }}
            ariaLabel="Edit user profile"
            extraFields={
              <Input
                name="age"
                type="number"
                placeholder="Enter age"
                className="mt-2"
              />
            }
          />
        </Flex>
        <CodeHighlight language="tsx" title="Extra Fields">
          {`<AccessibleEditForm
  itemName="User Profile"
  itemId="profile1"
  initialValue={profile}
  onEdit={async (formData) => {
    const newValue = await handleEdit(formData);
    setProfile(newValue);
  }}
  ariaLabel="Edit user profile"
  extraFields={
    <Input
      name="age"
      type="number"
      placeholder="Enter age"
      className="mt-2"
    />
  }
/>`}
        </CodeHighlight>
      </TitleWrapper>

      <TitleWrapper>
        <h3 className="text-lg font-semibold mb-4">Inline Rendering</h3>
        <Flex dir='col' gap="2">
          <p>Current value: {inlineEdit}</p>
          <AccessibleEditForm
            itemName="Inline Edit"
            itemId="inline1"
            initialValue={inlineEdit}
            onEdit={async (formData) => {
              const newValue = await handleEdit(formData);
              setInlineEdit(newValue);
            }}
            ariaLabel="Edit inline"
            renderInline={true}
          />
        </Flex>
        <CodeHighlight language="tsx" title="Inline Rendering">
          {`<AccessibleEditForm
  itemName="Inline Edit"
  itemId="inline1"
  initialValue={inlineEdit}
  onEdit={async (formData) => {
    const newValue = await handleEdit(formData);
    setInlineEdit(newValue);
  }}
  ariaLabel="Edit inline"
  renderInline={true}
/>`}
        </CodeHighlight>
      </TitleWrapper>

      <TitleWrapper>
        <h3 className="text-lg font-semibold mb-4">Rich Text Editing</h3>
        <div dangerouslySetInnerHTML={{ __html: richContent }} />
        <AccessibleEditForm
          itemName="Rich Content"
          itemId="rich1"
          initialValue={richContent}
          onEdit={async (formData) => {
            const newValue = await handleEdit(formData);
            setRichContent(newValue);
          }}
          ariaLabel="Edit rich content"
          inputType="rich-text"
          richTextConfig={{
            component: Tiptap,
            props: {
              content: richContent,
              onChange: (newContent: string) => {
                console.log("Rich content changed:", newContent);
              }
            }
          }}
        />
        <CodeHighlight language="tsx" title="Rich Text Editing">
          {`<AccessibleEditForm
  itemName="Rich Content"
  itemId="rich1"
  initialValue={richContent}
  onEdit={async (formData) => {
    const newValue = await handleEdit(formData);
    setRichContent(newValue);
  }}
  ariaLabel="Edit rich content"
  inputType="rich-text"
  richTextConfig={{
    component: Tiptap,
    props: {
      content: richContent,
      onChange: (newContent) => {
        console.log("Rich content changed:", newContent);
      }
    }
  }}
/>`}
        </CodeHighlight>
      </TitleWrapper>

      <TitleWrapper>
        <h3 className="text-lg font-semibold mb-4">Combined Form Example</h3>
        <div className="p-4 bg-dark-g  border   rounded-lg">
          <h4 className="text-xl font-bold mb-4">User Profile Form</h4>

          <AccessibleForm action={handleCombinedFormSubmit} ariaLabel="User profile form">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Input type="email" id="email" name="email" required className="mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <div className="flex items-center mt-1">
                  <span className="mr-2">{combinedUserName}</span>
                  <AccessibleEditForm
                    itemName="Name"
                    itemId="combined-user-name"
                    initialValue={combinedUserName}
                    onEdit={async (formData) => {
                      const newName = await handleEdit(formData);
                      setCombinedUserName(newName);
                    }}
                    ariaLabel="Edit user name"
                    triggerStyle="icon"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <div className="flex items-start mt-1">
                  <span className="mr-2">{combinedUserBio}</span>
                  <AccessibleEditForm
                    itemName="Bio"
                    itemId="combined-user-bio"
                    initialValue={combinedUserBio}
                    onEdit={async (formData) => {
                      const newBio = await handleEdit(formData);
                      setCombinedUserBio(newBio);
                    }}
                    ariaLabel="Edit user bio"
                    inputType="textarea"
                    triggerStyle="icon"
                  />
                </div>
              </div>

              <Button type="submit">Save Profile</Button>
            </div>
          </AccessibleForm>
        </div>
        <CodeHighlight language="tsx" title="Combined Form Example">
          {`<AccessibleForm action={handleCombinedFormSubmit} ariaLabel="User profile form">
  <div className="space-y-4">
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
      <Input type="email" id="email" name="email" required className="mt-1" />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Name</label>
      <div className="flex items-center mt-1">
        <span className="mr-2">{combinedUserName}</span>
        <AccessibleEditForm
          itemName="Name"
          itemId="combined-user-name"
          initialValue={combinedUserName}
          onEdit={async (formData) => {
            const newName = await handleEdit(formData);
            setCombinedUserName(newName);
          }}
          ariaLabel="Edit user name"
          triggerStyle="icon"
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Bio</label>
      <div className="flex items-start mt-1">
        <span className="mr-2">{combinedUserBio}</span>
        <AccessibleEditForm
          itemName="Bio"
          itemId="combined-user-bio"
          initialValue={combinedUserBio}
          onEdit={async (formData) => {
            const newBio = await handleEdit(formData);
            setCombinedUserBio(newBio);
          }}
          ariaLabel="Edit user bio"
          inputType="textarea"
          triggerStyle="icon"
        />
      </div>
    </div>

    <Button type="submit">Save Profile</Button>
  </div>
</AccessibleForm>`}
        </CodeHighlight>
      </TitleWrapper>
    </DesignSystemWrapper>
  );
}
