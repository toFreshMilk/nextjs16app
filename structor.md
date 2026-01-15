buptlebiz_fe/
│
├── package.json                            # Dependencies / Scripts
├── pnpm-lock.yaml                          # pnpm lockfile
├── pnpm-workspace.yaml                     # pnpm workspace
├── tsconfig.json                           # TypeScript config
├── next.config.ts                          # Next.js config
├── tailwind.config.ts                      # Tailwind config
├── postcss.config.mjs                      # PostCSS config
├── eslint.config.mjs                       # ESLint config
├── README.md                               # Project docs
├── structor.md                             # Project structure doc
│
├── public/                                 # Static assets
│   ├── favicons/
│   │   ├── apr.svg
│   │   ├── default.svg
│   │   └── demo.svg
│   ├── file.svg
│   ├── vercel.svg
│   └── window.svg
│
└── src/
    ├── proxy.ts                            # Tenant 감지 및 검증 로직
    │
    ├── app/                                # Next.js App Router
    │   ├── layout.tsx                      # Root Layout (Inter Font)
    │   ├── page.tsx                        # Root Page (redirect to /demo/dashboard)
    │   ├── globals.css                     # Global Styles (Tailwind v4 theme vars)
    │   ├── not-found.tsx                   # Global 404
    │   │
    │   └── [tenant]/                       # Tenant Dynamic Routes
    │       ├── layout.tsx                  # Tenant Config 주입 (AppConfigProvider)
    │       ├── page.tsx                    # Tenant Root (redirect to /{tenant}/dashboard)
    │       ├── error.tsx                   # Tenant 에러 핸들링
    │       │
    │       ├── login/
    │       │   └── page.tsx                # Dynamic Login Page (getTenantPage)
    │       │
    │       └── (main)/
    │           ├── layout.tsx              # Main Layout (TopNavbar, WorkspaceBanner)
    │           ├── dashboard/
    │           │   └── page.tsx            # Dynamic Dashboard (getTenantPage)
    │           └── contract/
    │               └── page.tsx            # Dynamic Contract (getTenantPage)
    │
    ├── core/
    │   ├── config/
    │   │   ├── tenant.config.ts            # Config Loader (loadTenantConfig, getTenantPage, getTenantComponent, getTenantService)
    │   │   └── tenants/
    │   │       ├── demo.config.ts          # Demo Config
    │   │       └── apr.config.ts           # APR Config
    │   │
    │   ├── contexts/
    │   │   └── AppConfigContext.tsx        # App Config Context (useAppConfig)
    │   │
    │   ├── hooks/
    │   │   ├── useObservable.ts            # Observable Hook (RxJS)
    │   │   └── useTenant.ts                # Tenant 식별 Hook
    │   │
    │   ├── store/
    │   │   └── global.store.ts             # Global Store (RxJS BehaviorSubject)
    │   │
    │   └── utils/
    │       ├── date.util.ts                # Date utilities (formatDate)
    │       ├── object.util.ts             # Object utilities (isEmpty, deepClone)
    │       └── string.util.ts             # String utilities (capitalize, truncate)
    │
    ├── standard/                           # [Base] 기본 구현체
    │   ├── standard.css                    # Standard Styles
    │   │
    │   ├── shared/
    │   │   └── components/
    │   │       ├── TopNavbar.tsx           # Shared TopNavbar
    │   │       └── WorkspaceBanner.tsx     # Shared WorkspaceBanner (default: null)
    │   │
    │   ├── login/
    │   │   ├── LoginPage.tsx               # Standard Login Page
    │   │   ├── services/
    │   │   │   └── login.service.ts        # Standard Login Service
    │   │   ├── store/
    │   │   │   └── login.store.ts          # Standard Login Store
    │   │   └── components/
    │   │       ├── LoginSsoButton.tsx      # Standard SSO Button
    │   │       ├── LoginForm.tsx            # (optional) Login Form
    │   │       └── LoginHeader.tsx         # (optional) Login Header
    │   │
    │   ├── dashboard/
    │   │   ├── DashboardPage.tsx           # Standard Dashboard Page
    │   │   ├── services/
    │   │   │   └── dashboard.service.ts    # Standard Dashboard Service
    │   │   ├── store/
    │   │   │   └── dashboard.store.ts     # Standard Dashboard Store
    │   │   └── components/
    │   │       └── DashboardChart.tsx      # Standard Dashboard Chart
    │   │
    │   └── contract/
    │       ├── ContractPage.tsx            # Standard Contract Page
    │       ├── services/
    │       │   └── contract.service.ts     # Standard Contract Service
    │       ├── store/
    │       │   └── contract.store.ts      # Standard Contract Store
    │       └── components/
    │           └── ContractList.tsx        # Standard Contract List
    │
    ├── tenants/                            # [Override] 테넌트별 오버라이드 (standard/와 동일한 모듈 구조)
    │   │
    │   ├── demo/
    │   │   ├── demo.css                    # Demo Tenant Styles
    │   │   │
    │   │   ├── components/                 # Demo 전용 컴포넌트
    │   │   │   └── WorkspaceBanner.tsx     # Demo WorkspaceBanner Override
    │   │   │
    │   │   ├── shared/                     # Demo shared overrides
    │   │   │   └── components/
    │   │   │       └── TopNavbar.tsx       # Demo 전용 TopNavbar override
    │   │   │
    │   │   ├── login/                      # standard/login 과 동일한 구조
    │   │   │   ├── DemoLoginPage.tsx       # Demo Login Page Override
    │   │   │   └── components/
    │   │   │       └── LoginSsoButton.tsx  # Demo Login SSO Button Override
    │   │   │
    │   │   ├── dashboard/                  # standard/dashboard 과 동일한 구조
    │   │   │   ├── DemoDashboardPage.tsx   # Demo Dashboard Page Override
    │   │   │   ├── services/
    │   │   │   │   └── dashboard.service.ts # Demo Dashboard Service Override
    │   │   │   └── components/
    │   │   │       └── DashboardChart.tsx   # Demo Dashboard Chart Override
    │   │   │
    │   │   └── contract/                   # standard/contract 과 동일한 구조
    │   │       ├── DemoContractPage.tsx    # Demo Contract Page Override
    │   │       └── services/
    │   │           └── contract.service.ts  # Demo Contract Service Override
    │   │
    │   └── apr/
    │       ├── apr.css                     # APR Tenant Styles
    │       │
    │       ├── shared/                     # APR shared overrides
    │       │   └── components/
    │       │       └── WorkspaceBanner.tsx  # APR 전용 WorkspaceBanner override
    │       │
    │       ├── login/                      # standard/login 과 동일한 구조
    │       │   ├── AprLoginPage.tsx        # APR Login Page Override
    │       │   └── components/
    │       │       └── AprSsoButton.tsx    # APR 전용 SSO 버튼
    │       │
    │       ├── dashboard/                  # standard/dashboard 과 동일한 구조
    │       │   ├── AprDashboardPage.tsx    # APR Dashboard Page Override
    │       │   └── components/
    │       │       └── DashboardChart.tsx # APR Dashboard Chart Override
    │       │
    │       └── contract/                   # standard/contract 과 동일한 구조
    │           └── services/
    │               └── contract.service.ts  # APR Contract Service Override
    │
    └── uikit/                              # UI Kit Components (재사용 가능한 공통 컴포넌트)
        ├── card/
        │   └── StatCard.tsx                # 통계 카드 컴포넌트
        ├── chart/
        │   └── BarChart.tsx                # 막대 차트 컴포넌트
        ├── form/
        │   ├── Button.tsx                  # 버튼 컴포넌트
        │   ├── Input.tsx                   # 입력 필드 컴포넌트
        │   └── Select.tsx                  # 셀렉트 컴포넌트
        └── layout/
            ├── PageContainer.tsx           # 페이지 컨테이너
            └── Section.tsx                 # 섹션 컴포넌트
