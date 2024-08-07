/**
 * This code was generated by Builder.io.
 */
import React from 'react';
import { Button, Button } from '../ui/button';

const AuthButtons: React.FC = () => {
  return (
    <div className="flex gap-2 self-start text-sm font-medium leading-none text-center">
      <Button className="px-3.5 py-2 bg-zinc-900 rounded-[96px] text-stone-300">
        Log In
      </Button>
      <Button className="px-3.5 py-2 text-white bg-orange-500 rounded-[96px]">
        Sign Up
      </Button>
    </div>
  );
};

export default AuthButtons;
