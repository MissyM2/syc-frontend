import React from 'react';
import type { ButtonHTMLAttributes } from 'react';

interface RoundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const RoundButton: React.FC<RoundButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`
            flex justify-center items-center 
            w-14 h-14 rounded-full
            bg-rose-300 text-white
            hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-opacity-50
            ${className || ''}
          `}
      {...props}
    >
      {children}
    </button>
  );
};

export default RoundButton;
