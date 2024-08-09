'use client';

import { useState } from 'react';
import { Center } from '../atoms/Center';
import { Button } from '../ui';

function SpinneCodepen() {
  const [theme, setTheme] = useState('default');

  return (
    <main className="p-4">
      <Button variant="outline" className="m-4" onClick={toggleTheme}>
        Toggle Theme
      </Button>
      <Center fullScreen>
        <div style={spinnerContainerStyle(theme)}>
          <div
            style={{
              ...circleStyle(),
              '--progress': '60%',
              inset: '4vmin',
              animationDelay: '1s',
            }}
          />
          <div
            style={{
              ...circleStyle(),
              '--progress': '60%',
              inset: '8vmin',
              animationDelay: '0.5s',
            }}
          />
          <div style={{ ...circleStyle(), '--progress': '60%' }} />
          <div style={afterContentStyle()}>🧙‍♂️✨</div>
        </div>
      </Center>
    </main>
  );

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === 'default' ? 'toggled' : 'default'));
  }
}
function spinnerContainerStyle(theme) {
  return {
    position: 'relative',
    width: '40vmin',
    aspectRatio: '1',
    filter: 'drop-shadow(0 0 0.8vmin hsla(0, 0, 0%, 1))',
    '--c1': theme === 'default' ? '#6eccee' : '#ff5733',
    '--c2': theme === 'default' ? '#f672ca' : '#33ff57',
    '--c3': theme === 'default' ? '#fdb428' : '#3357ff',
    '--c4': theme === 'default' ? '#b9f' : '#5733ff',
  };
}

function circleStyle() {
  return {
    position: 'absolute',
    borderRadius: '50%',
    mask: 'radial-gradient(circle at center, transparent 65%, black 65%)',
    background:
      'conic-gradient(at center, var(--c1) var(--progress), black var(--progress), var(--c2) calc(var(--progress) + 20%), var(--c3) calc(var(--progress) + 30%), var(--c3) calc(var(--progress) + 50%), transparent, transparent, transparent, transparent)',
    animation: 'progress 4s linear infinite',
  };
}

function afterContentStyle() {
  return {
    content: '"@🧙‍♂️✨"',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: '2.5vmin',
    inset: '0',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  };
}

export default SpinneCodepen;
