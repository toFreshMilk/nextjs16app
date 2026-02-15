// src/uikit/form/Button.tsx
import { ButtonHTMLAttributes } from 'react';

type ButtonCustom = {
  baseClassName?: string;
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  custom?: ButtonCustom;
  onPress?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({ fullWidth, className, custom, onClick, onPress, ...props }: Props) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    onPress?.(event);
  };

  return (
    <button
      className={`px-4 py-2 rounded text-white font-bold transition hover:opacity-90 active:scale-95 ${fullWidth ? 'w-full' : ''} ${
        className ?? ''
      } ${custom?.baseClassName ?? ''}`}
      onClick={handleClick}
      {...props}
    />
  );
}
