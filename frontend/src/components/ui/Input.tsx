import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error = false, ...props }, ref) => {
    const baseStyles =
      'w-full bg-slate-800 border text-slate-100 placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-slate-900';

    const stateStyles = error
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
      : 'border-slate-600 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-500';

    return (
      <input
        ref={ref}
        className={`${baseStyles} ${stateStyles} px-3 py-2 text-sm rounded-md ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

