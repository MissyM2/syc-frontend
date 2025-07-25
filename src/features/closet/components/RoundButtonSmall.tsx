import React from 'react';
import type { ButtonHTMLAttributes } from 'react';

interface RoundButtonSmallProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const RoundButtonSmall: React.FC<RoundButtonSmallProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`
            flex justify-center items-center 
            w-7 h-7 rounded-full
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

export default RoundButtonSmall;
