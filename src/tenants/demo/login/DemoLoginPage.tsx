'use client';
import { Button } from '@/uikit/form/Button';

export default function DemoLoginPage() {
    return (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-900">Buptle Biz Demo</h1>
                <p className="text-blue-600">Experience the future of legal tech.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-xl w-96">
                <div className="bg-yellow-100 p-3 rounded mb-4 text-sm text-yellow-800">
                    Tip: You can use to login.
                </div>
                <Button fullWidth>Quick Demo Access</Button>
            </div>
        </div>
    );
}
