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
    ├── tenants/                            # [Override] 테넌트별 오버라이드 (standard/와 동일한 모듈 구조)
    │   ├── demo/
    │   │   ├── demo.css                    # Demo Tenant Styles
    │   │   │
    │   │   ├── shared/                     # (optional) shared overrides
    │   │   │   └── components/
    │   │   │       └── TopNavbar.tsx       # Demo 전용 TopNavbar override 
    │   │   │
    │   │   ├── services/                   # (optional) 공통 service overrides
    │   │   │
    │   │   ├── login/                      # standard/login 과 동일한 구조
    │   │   │   ├── services/               # (optional) Demo Login service override
    │   │   │   ├── store/                  # (optional) Demo Login store override
    │   │   │   └── DemoLoginPage.tsx       # Demo Login Page Override
    │   │   │
    │   │   ├── dashboard/                  # standard/dashboard 과 동일한 구조
    │   │   │   ├── services/               # (optional) Demo Dashboard service override
    │   │   │   ├── store/                  # (optional) Demo Dashboard store override
    │   │   │   └── DemoDashboardPage.tsx   # Demo Dashboard Page Override
    │   │   │
    │   │   └── contract/                   # standard/contract 과 동일한 구조
    │   │       ├── services/               # (optional) Demo Contract service override
    │   │       ├── store/                  # (optional) Demo Contract store override
    │   │       └── components/             # (optional) Demo Contract UI overrides
    │   │
    │   └── apr/
    │       ├── apr.css                     # APR Tenant Styles
    │       │
    │       ├── shared/                     # (optional) shared overrides
    │       │   └── components/
    │       │       └── TopNavbar.tsx       # APR 전용 TopNavbar override (필요 시)
    │       │
    │       ├── services/                   # (optional) 공통 service overrides
    │       │
    │       ├── login/                      # standard/login 과 동일한 구조
    │       │   ├── services/               # (optional) APR Login service override
    │       │   ├── store/                  # (optional) APR Login store override
    │       │   ├── components/
    │       │   │   └── AprSsoButton.tsx    # APR 전용 SSO 버튼
    │       │   └── AprLoginPage.tsx        # APR Login Page Override
    │       │
    │       ├── dashboard/                  # standard/dashboard 과 동일한 구조
    │       │   ├── services/               # (optional) APR Dashboard service override
    │       │   ├── store/                  # (optional) APR Dashboard store override
    │       │   └── components/
    │       │       └── AprDashboardPage.tsx# APR Dashboard Page Override
    │       │
    │       └── contract/                   # standard/contract 과 동일한 구조
    │           ├── services/               # (optional) APR Contract service override
    │           ├── store/                  # (optional) APR Contract store override
    │           └── components/             # (optional) APR Contract UI overrides
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
