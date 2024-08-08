import React from 'react';

export default function File() {
  return (
    <div className="bg-[#1a1b1e] rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-[#2c2d30] text-sm font-medium text-[#b3b3b3]">
        Code Snippet
      </div>
      <pre className="p-4 text-[#d4d4d4] font-mono text-sm">
        <code className="language-javascript">{`const handleClick = () => {
  console.log('Button clicked!');
};

return (
  <button onClick={handleClick}>
    Click me
  </button>
);`}</code>
      </pre>
      <div className="px-4 py-2 bg-[#2c2d30] text-sm font-medium text-[#b3b3b3] flex justify-end">
        Page 1 of 3
      </div>
    </div>
  );
}
