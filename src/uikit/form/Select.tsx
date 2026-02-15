// src/uikit/form/Select.tsx
import { type ChangeEvent, type SelectHTMLAttributes } from 'react';

interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
}

type SelectCustom = {
  containerClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
};

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  custom?: SelectCustom;
  onValueChange?: (value: string, event: ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({ label, options, className, custom, onChange, onValueChange, ...props }: Props) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event);
    onValueChange?.(event.target.value, event);
  };

  return (
    <div className={`flex flex-col gap-1 ${custom?.containerClassName ?? ''}`}>
      {label && <label className={`text-sm font-medium text-gray-700 ${custom?.labelClassName ?? ''}`}>{label}</label>}
      <select
        className={`px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white ${
          className ?? ''
        } ${custom?.selectClassName ?? ''}`}
        onChange={handleChange}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
