// src/app/[tenant]/error/page.tsx
export default function ErrorPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-950">
            <div className="text-center">
                <h1 className="mb-4 text-6xl font-bold text-red-500">Error</h1>
                <p className="mb-8 text-xl text-gray-400">
                    알 수 없는 테넌트이거나 잘못된 접근입니다.
                </p>
                <a
                    href="/demo/dashboard"
                    className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                >
                    Demo로 이동
                </a>
            </div>
        </div>
    );
}
