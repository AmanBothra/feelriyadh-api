import cn from 'classnames';
import React from 'react';
interface ButtonProps {
  className?: string;
  theme?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button = ({
  className,
  theme = 'primary',
  children,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        'py-4 px-8 cursor-pointer uppercase transition-all duration-300 flex items-center justify-center text-lg text-white',
        theme === 'primary' && 'bg-primary  hover:bg-secondary',
        theme === 'secondary' && 'bg-secondary  hover:bg-dark',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
