buptlebiz_fe/
│
├── package.json                            # Dependencies / Scripts
├── pnpm-lock.yaml                          # pnpm lockfile
├── pnpm-workspace.yaml                     # pnpm workspace
├── tsconfig.json                           # TypeScript config
├── next.config.ts                          # Next.js config
├── next-env.d.ts                           # Next.js types
├── tailwind.config.ts                      # Tailwind config
├── postcss.config.mjs                      # PostCSS config
├── eslint.config.mjs                       # ESLint config
├── README.md                               # Project docs
├── structor.md                             # Project structure doc
│
├── public/                                 # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
└── src/
    ├── proxy.ts                            # Tenant 감지 및 검증 로직
    │
    ├── app/                                # Next.js App Router
    │   ├── layout.tsx                      # Root Layout (Inter Font)
    │   ├── page.tsx                        # Root Page (redirect)
    │   ├── globals.css                     # Global Styles (Tailwind v4 theme vars)
    │   ├── not-found.tsx                   # Global 404
    │   │
    │   └── [tenant]/                       # Tenant Dynamic Routes
    │       ├── layout.tsx                  # Tenant Config 주입
    │       ├── page.tsx                    # Tenant Root 
    │       ├── error.tsx                   # Tenant 에러 핸들링
    │       │
    │       ├── login/
    │       │   └── page.tsx                # Dynamic Login Page
    │       │
    │       └── (main)/
    │           ├── layout.tsx              # Main Layout
    │           ├── dashboard/
    │           │   └── page.tsx            # Dynamic Dashboard
    │           └── contract/
    │               └── page.tsx            # Dynamic Contract
    │
    ├── core/
    │   ├── config/
    │   │   ├── tenant.config.ts            # Config Loader
    │   │   └── tenants/
    │   │       ├── demo.config.ts          # Demo Config
    │   │       └── apr.config.ts           # APR Config
    │   │
    │   ├── contexts/
    │   │   └── AppConfigContext.tsx        # App Config Context
    │   │
    │   ├── hooks/
    │   │   ├── useObservable.ts            # Observable Hook
    │   │   └── useTenant.ts                # Tenant 식별 Hook
    │   │
    │   ├── store/
    │   │   └── global.store.ts             # Global Store (RxJS)
    │   │
    │   └── utils/
    │       ├── object.util.ts
    │       ├── date.util.ts
    │       └── string.util.ts
    │
    ├── standard/                           # [Base] 기본 구현체
    │   ├── standard.css                    # Standard Styles
    │   │
    │   ├── shared/
    │   │   └── components/
    │   │       └── TopNavbar.tsx           # Shared TopNavbar
    │   │
    │   ├── login/
    │   │   ├── services/
    │   │   │   └── login.service.ts
    │   │   ├── store/
    │   │   │   └── login.store.ts
    │   │   ├── components/
    │   │   │   ├── LoginForm.tsx
    │   │   │   └── LoginHeader.tsx
    │   │   └── LoginPage.tsx
    │   │
    │   ├── dashboard/
    │   │   ├── services/
    │   │   │   └── dashboard.service.ts
    │   │   ├── store/
    │   │   │   └── dashboard.store.ts
    │   │   ├── components/
    │   │   │   └── DashboardChart.tsx
    │   │   └── DashboardPage.tsx
    │   │
    │   └── contract/
    │       ├── services/
    │       │   └── contract.service.ts
    │       ├── store/
    │       │   └── contract.store.ts
    │       ├── components/
    │       │   └── ContractList.tsx
    │       └── ContractPage.tsx
    │
    ├── tenants/                            # [Override] 테넌트별 오버라이드
    │   ├── demo/
    │   │   ├── demo.css
    │   │   ├── login/
    │   │   │   └── DemoLoginPage.tsx
    │   │   └── dashboard/
    │   │       └── DemoDashboardPage.tsx
    │   │
    │   └── apr/
    │       ├── apr.css
    │       ├── login/
    │       │   ├── components/
    │       │   │   └── AprSsoButton.tsx
    │       │   └── AprLoginPage.tsx
    │       └── dashboard/
    │           └── AprDashboardPage.tsx
    │
    └── uikit/                              # UI Kit Components
        ├── card/
        │   └── StatCard.tsx
        ├── chart/
        │   └── BarChart.tsx
        ├── form/
        │   ├── Button.tsx
        │   ├── Input.tsx
        │   └── Select.tsx
        └── layout/
            ├── PageContainer.tsx
            └── Section.tsx
