import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export function Button({ fullWidth, className, ...props }: Props) {
  return (
    <button 
      className={`px-4 py-2 rounded text-white font-bold transition hover:opacity-90 active:scale-95 ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props} 
    />
  );
}

