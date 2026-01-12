import React from 'react';

interface PageContainerProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    action?: React.ReactNode;
}

export default function PageContainer({
                                          title,
                                          description,
                                          children,
                                          action
                                      }: PageContainerProps) {
    return (
        <div className="w-full animate-fade-in">
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="page-title">{title}</h1>
                    {description && (
                        <p className="text-brand-muted -mt-6 mb-4">{description}</p>
                    )}
                </div>
                {action && (
                    <div className="flex-shrink-0">
                        {action}
                    </div>
                )}
            </div>

            <div className="space-y-6">
                {children}
            </div>
        </div>
    );
}
