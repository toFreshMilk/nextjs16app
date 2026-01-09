'use client';

export default function Logo({ tenantName }: { tenantName: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--primary-color)] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                L
            </div>
            <span className="text-xl font-bold text-slate-800">{tenantName}</span>
        </div>
    );
}
