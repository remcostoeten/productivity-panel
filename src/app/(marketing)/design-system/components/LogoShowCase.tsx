'use client';

import BrandLogo from '@/components/theme/BrandLogo';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useState } from 'react';

const LogoShowcase = () => {
  const [animate, setAnimate] = useState(true);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Logo Showcase</h1>

      <div className="mb-4">
        <Button
          onClick={() => setAnimate(!animate)}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
        >
          Toggle Animation: {animate ? 'On' : 'Off'}
        </Button>
        <Button
          onClick={toggleTheme}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Toggle Theme: {theme}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Icon Version</h2>
          <BrandLogo icon width="100" height="100" />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Full Version</h2>
          <BrandLogo width="200" height="80" />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Linked Icon</h2>
          <BrandLogo icon width="100" height="100" link="/home" />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Linked Full Version</h2>
          <BrandLogo width="200" height="80" link="/about" />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Custom Class</h2>
          <BrandLogo
            icon
            width="100"
            height="100"
            className="border border-gray-300 p-2"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Custom Dimensions</h2>
          <BrandLogo width="150" height="60" />
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase;
