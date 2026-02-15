// src/uikit/form/Input.tsx
import { type ChangeEvent, type InputHTMLAttributes, type ReactNode } from 'react';

type InputCustom = {
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
};

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  labelSuffix?: ReactNode;
  custom?: InputCustom;
  onValueChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ label, error, labelSuffix, className, custom, onChange, onValueChange, ...props }: Props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      <input
        className={`px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition disabled:bg-gray-100 ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
        } ${className ?? ''} ${custom?.inputClassName ?? ''}`}
        onChange={handleChange}
        {...props}
      />
      {error && <span className={`text-xs text-red-500 ${custom?.errorClassName ?? ''}`}>{error}</span>}
    </div>
  );
}

type InputPresetProps = Omit<Props, 'type'>;

export function TextInput(props: InputPresetProps) {
  return <Input type="text" {...props} />;
}

export function SearchInput(props: InputPresetProps) {
  return <Input type="search" {...props} />;
}

export function EmailInput(props: InputPresetProps) {
  return <Input type="email" {...props} />;
}

export function PasswordInput(props: InputPresetProps) {
  return <Input type="password" {...props} />;
}

export function NumberInput(props: InputPresetProps) {
  return <Input type="number" {...props} />;
}
