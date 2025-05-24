import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  ...props
}) => {
  let variantClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses = 'bg-blue-500 hover:bg-blue-700 text-white';
      break;
    case 'secondary':
      variantClasses = 'bg-gray-200 hover:bg-gray-300 text-gray-800';
      break;
    case 'outline':
      variantClasses = 'border border-gray-500 text-gray-800 hover:bg-gray-100';
      break;
    case 'text':
      variantClasses = 'text-blue-500 hover:text-blue-700';
      break;
  }

  let sizeClasses = '';

  switch (size) {
    case 'small':
      sizeClasses = 'px-2 py-1 text-sm';
      break;
    case 'medium':
      sizeClasses = 'px-4 py-2 text-base';
      break;
    case 'large':
      sizeClasses = 'px-6 py-3 text-lg';
      break;
  }

  return (
    <button
      {...props}
      className={`rounded font-medium ${variantClasses} ${sizeClasses} transition-colors duration-200`}
    >
      {children}
    </button>
  );
};
