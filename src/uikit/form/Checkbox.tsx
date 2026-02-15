// src/uikit/form/Checkbox.tsx
import { type ChangeEvent, type InputHTMLAttributes } from 'react';

type CheckboxCustom = {
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
};

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  custom?: CheckboxCustom;
  onCheckedChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({ label, className, custom, onChange, onCheckedChange, ...props }: Props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    onCheckedChange?.(event.target.checked, event);
  };

  return (
    <label className={`inline-flex items-center gap-2 ${custom?.containerClassName ?? ''}`}>
      <input
        type="checkbox"
        className={`rounded border-slate-300 ${className ?? ''} ${custom?.inputClassName ?? ''}`}
        onChange={handleChange}
        {...props}
      />
      {label && <span className={`text-sm text-slate-600 ${custom?.labelClassName ?? ''}`}>{label}</span>}
    </label>
  );
}
