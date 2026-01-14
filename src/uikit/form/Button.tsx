import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export function Button({ children, fullWidth, className = '', style, ...props }: Props) {
  return (
    <button
      className={`px-4 py-2.5 text-white font-medium rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${fullWidth ? 'w-full' : ''} ${className}`}
      style={style} // 테마 컬러 적용을 위해 style prop 허용
      {...props}
    >
      {children}
    </button>
  );
}

