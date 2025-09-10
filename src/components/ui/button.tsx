'use client';

import { cloneElement, type ReactElement, type ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({ children, className = '', asChild = false, onClick, disabled }: ButtonProps) {
  if (asChild && children && typeof children === 'object') {
    const child = children as ReactElement;
    const childClass = ((child.props as any)?.className || '') as string;
    return cloneElement(child, {
      className: `${childClass} ${className}`.trim(),
      onClick,
      'aria-disabled': disabled ? true : undefined,
    } as any);
  }
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded px-4 py-2 ${className} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`.trim()}
    >
      {children}
    </button>
  );
}

export default Button;






