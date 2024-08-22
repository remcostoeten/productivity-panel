"use client";
import LoadingDot from "@/components/effect/loaders/three-dots-loader";
import CodeHighlight from "@/components/ui/CodeHighlight/CodeHighlight";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { DesignSystemWrapper } from "../_components/DesignSystemWrapper";

const Emblor = ({
  initialTags = [],
  variant = "default",
  shape = "default",
  placeholder = "Add a tag",
  ...props
}) => {
  const [tags, setTags] = useState(initialTags);
  const [input, setInput] = useState("");

  const handleAddTag = () => {
    if (input && !tags.includes(input)) {
      setTags([...tags, input]);
      setInput("");
      toast.success(`Added tag: ${input}`);
    } else if (tags.includes(input)) {
      toast.error("Tag already exists!");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
    toast.success(`Removed tag: ${tagToRemove}`);
  };

  const variantStyles = {
    default: "bg-gray-800 text-gray-200",
    primary: "bg-gray-700 text-gray-100",
    success: "bg-green-900 text-green-200",
    warning: "bg-yellow-900 text-yellow-200",
  };

  const shapeStyles = {
    default: "rounded-md",
    square: "rounded-none",
    pill: "rounded-full",
    badge: "rounded-full py-0.5 px-2 text-xs font-semibold",
  };

  function typeDots() {
    return <span className="text-gray-400">...</span>;
  }

  return (
    <div
      className={`flex flex-wrap gap-2 p-2 border border-[#252525] ${shapeStyles[shape]} bg-[#040404] shadow-sm`}
    >
      <AnimatePresence>
        {tags.map((tag) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`${variantStyles[variant]} ${shapeStyles[shape]} px-2 py-1 text-sm flex items-center`}
          >
            {tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="ml-1 text-gray-400 hover:text-gray-200 focus:outline-none"
            >
              ×
            </button>
          </motion.span>
        ))}
      </AnimatePresence>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
        placeholder={placeholder + typeDots()}
        className={`flex-grow outline-none bg-transparent relative text-sm text-gray-200 placeholder-gray-500 ${shapeStyles[shape]}`}
      />
      <LoadingDot size="sm" className="opacity-40" />
    </div>
  );
};

// Example component remains the same
const Example = ({ title, description, children, code }) => (
  <div className="mb-16">
    <h3 className="text-xl font-semibold mb-2 text-gray-100">{title}</h3>
    <p className="text-gray-400 mb-4">{description}</p>
    <div className="mb-4">{children}</div>
    <CodeHighlight language="tsx" title={title}>
      {code}
    </CodeHighlight>
  </div>
);

export default function EmblorTagInputShowcase() {
  const examples = [
    {
      title: "Default Shape",
      description: "The standard tag input with slightly rounded corners.",
      component: (
        <Emblor
          initialTags={["React", "Vue", "Angular"]}
          placeholder="Add a framework"
        />
      ),
      code: `<Emblor 
  initialTags={['React', 'Vue', 'Angular']}
  placeholder="Add a framework" 
/>`,
    },
    {
      title: "Square Shape",
      description: "A variant with sharp corners for a more structured look.",
      component: (
        <Emblor
          initialTags={["CSS", "HTML", "JavaScript"]}
          shape="square"
          variant="primary"
          placeholder="Add a web technology"
        />
      ),
      code: `<Emblor 
  initialTags={['CSS', 'HTML', 'JavaScript']}
  shape="square" 
  variant="primary"
  placeholder="Add a web technology" 
/>`,
    },
    {
      title: "Pill Shape",
      description:
        "A variant with fully rounded corners for a softer appearance.",
      component: (
        <Emblor
          initialTags={["Node.js", "Express", "MongoDB"]}
          shape="pill"
          variant="success"
          placeholder="Add a backend technology"
        />
      ),
      code: `<Emblor 
  initialTags={['Node.js', 'Express', 'MongoDB']}
  shape="pill" 
  variant="success"
  placeholder="Add a backend technology" 
/>`,
    },
    {
      title: "Badge Shape",
      description:
        "A compact, badge-like variant for a more subtle tag appearance.",
      component: (
        <Emblor
          initialTags={["Frontend", "Backend", "Full Stack"]}
          shape="badge"
          variant="warning"
          placeholder="Add a developer role"
        />
      ),
      code: `<Emblor 
  initialTags={['Frontend', 'Backend', 'Full Stack']}
  shape="badge" 
  variant="warning"
  placeholder="Add a developer role" 
/>`,
    },
  ];

  const content = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {examples.map((example, index) => (
        <Example
          title={example.title}
          description={example.description}
          code={example.code}
          children={example.component}
        >
          {example.component}
        </Example>
      ))}
    </div>
  );

  return (
    <DesignSystemWrapper
      title="Tag Input component"
      description="A versatile and customizable tag input component with various shapes and styles. Just start typing and press Enter to add a tag!"
    >
      {content}
    </DesignSystemWrapper>
  );
}
