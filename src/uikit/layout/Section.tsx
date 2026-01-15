// src/uikit/layout/Section.tsx
import { ReactNode } from 'react';

interface Props {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ title, children, className = '' }: Props) {
  return (
    <section className={`py-6 ${className}`}>
      {title && <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>}
      {children}
    </section>
  );
}
