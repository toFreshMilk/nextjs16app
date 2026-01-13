'use client';
import { useAppConfig } from '@/core/contexts/AppConfigContext';
import { Button } from '@/uikit/form/Button';
import { Input } from '@/uikit/form/Input';

export default function LoginPage() {
    const { config } = useAppConfig();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-100">
                <h1 className="text-2xl font-bold text-center mb-6">
                    {config.name} <span className="text-gray-400 font-normal">Login</span>
                </h1>
                <form className="space-y-4">
                    <Input label="Email" placeholder="user@buptle.com" />
                    <Input label="Password" type="password" />
                    <Button fullWidth style={{ backgroundColor: config.theme.primaryColor }}>
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
}
