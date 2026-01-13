buptlebiz_fe/
│
└── src/
│
├── proxy.ts                                # Tenant 감지 및 검증 로직
│
├── app/
│   ├── layout.tsx                          # Root Layout
│   ├── globals.css
│   ├── not-found.tsx                       # Global 404
│   │
│   └── [tenant]/
│       ├── layout.tsx                      # Tenant Config 주입
│       ├── error.tsx                       # [추가] Tenant 에러 핸들링
│       ├── not-found.tsx                   # [추가] Tenant 404
│       │
│       ├── login/
│       │   └── page.tsx                    # Dynamic Login Page
│       │
│       └── (main)/
│           ├── layout.tsx                  # Main Layout (Navbar)
│           ├── dashboard/
│           │   └── page.tsx                # Dynamic Dashboard
│           └── contract/
│               └── page.tsx                # Dynamic Contract
│
├── core/
│   ├── config/
│   │   ├── tenant.config.ts                # Config Loader
│   │   └── tenants/
│   │       ├── demo.config.ts              # Demo Config
│   │       └── apr.config.ts               # APR Config
│   │
│   ├── contexts/
│   │   └── AppConfigContext.tsx
│   │
│   ├── hooks/
│   │   ├── useObservable.ts
│   │   └── useTenant.ts                    # Tenant 식별 Hook
│   │
│   ├── store/
│   │   └── global.store.ts
│   │
│   └── utils/
│       ├── object.util.ts
│       ├── date.util.ts
│       └── string.util.ts
│
├── standard/                               # [Base] 기본 구현체
│   ├── standard.css
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   └── TopNavbar.tsx
│   │   └── services/
│   │       └── navbar.service.ts
│   │
│   ├── login/
│   │   ├── services/
│   │   │   └── login.service.ts            # [통합] API + Validator + Logic
│   │   ├── store/
│   │   │   └── login.store.ts
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── LoginHeader.tsx
│   │   └── LoginPage.tsx
│   │
│   ├── dashboard/
│   │   ├── services/
│   │   │   └── dashboard.service.ts        # [통합] API + Logic
│   │   ├── store/
│   │   │   └── dashboard.store.ts
│   │   ├── components/
│   │   │   ├── DashboardSummary.tsx
│   │   │   ├── DashboardChart.tsx
│   │   │   └── DashboardStats.tsx
│   │   └── DashboardPage.tsx
│   │
│   └── contract/
│       ├── services/
│       │   ├── contract.service.ts         # [통합] API + Logic
│       │   ├── contract.validator.ts
│       │   └── contract-calculation.service.ts
│       ├── store/
│       │   └── contract.store.ts
│       ├── components/
│       │   ├── ContractForm.tsx
│       │   ├── ContractList.tsx
│       │   └── ContractDetail.tsx
│       └── ContractPage.tsx
│
├── tenants/                                # [Override] 실제 오버라이드 파일만 존재
│   ├── demo/
│   │   ├── demo.css
│   │   ├── login/
│   │   │   ├── components/
│   │   │   │   └── DemoLoginBanner.tsx
│   │   │   └── DemoLoginPage.tsx
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── DemoPromoBanner.tsx
│   │   │   │   └── DemoFeatureLock.tsx
│   │   │   └── DemoDashboardPage.tsx
│   │   └── contract/
│   │       ├── components/
│   │       │   └── DemoContractLimit.tsx
│   │       └── DemoContractPage.tsx
│   │
│   └── apr/
│       ├── apr.css
│       ├── login/
│       │   ├── services/
│       │   │   └── apr-sso.service.ts      # SSO 전용 로직
│       │   ├── components/
│       │   │   └── AprSsoButton.tsx
│       │   └── AprLoginPage.tsx
│       └── dashboard/
│           ├── services/
│           │   └── apr-report.service.ts   # Report 생성 로직
│           ├── components/
│           │   └── AprKpiWidget.tsx
│           └── AprDashboardPage.tsx
│
└── uikit/
├── card/
│   ├── StatCard.tsx
│   └── InfoCard.tsx
├── chart/
│   ├── SimpleChart.tsx
│   └── BarChart.tsx
├── form/
│   ├── Input.tsx
│   ├── Button.tsx
│   └── Select.tsx
└── layout/
├── PageContainer.tsx
└── Section.tsx
