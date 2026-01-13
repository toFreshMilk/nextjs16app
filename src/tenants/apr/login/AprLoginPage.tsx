'use client';
import AprSsoButton from './components/AprSsoButton';

export default function AprLoginPage() {
    return (
        <div className="min-h-screen flex">
            <div className="w-1/2 bg-rose-600 flex items-center justify-center text-white">
                <h1 className="text-5xl font-bold">APR Global</h1>
            </div>
            <div className="w-1/2 flex items-center justify-center bg-white">
                <div className="w-80">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900">Employee Login</h2>
                    <AprSsoButton />
                </div>
            </div>
        </div>
    );
}
