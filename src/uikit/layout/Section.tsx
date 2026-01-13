export function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>
            {children}
        </section>
    );
}
