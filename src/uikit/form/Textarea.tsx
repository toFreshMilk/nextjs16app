// src/uikit/form/Textarea.tsx
import { type ChangeEvent, type ReactNode, type TextareaHTMLAttributes } from 'react';

type TextareaCustom = {
  containerClassName?: string;
  labelClassName?: string;
  textareaClassName?: string;
  errorClassName?: string;
};

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  labelSuffix?: ReactNode;
  error?: string;
  custom?: TextareaCustom;
  onValueChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function Textarea({ label, labelSuffix, error, className, custom, onChange, onValueChange, ...props }: Props) {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(event);
    onValueChange?.(event.target.value, event);
  };

  return (
    <div className={`flex flex-col gap-1 ${custom?.containerClassName ?? ''}`}>
      {label && (
        <label className={`text-sm font-medium text-gray-700 ${custom?.labelClassName ?? ''}`}>
          {label}
          {labelSuffix}
        </label>
      )}
      <textarea
        className={`px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition disabled:bg-gray-100 ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
        } ${className ?? ''} ${custom?.textareaClassName ?? ''}`}
        onChange={handleChange}
        {...props}
      />
      {error && <span className={`text-xs text-red-500 ${custom?.errorClassName ?? ''}`}>{error}</span>}
    </div>
  );
}
