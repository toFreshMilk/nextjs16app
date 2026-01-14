buptlebiz_fe/
│
└── src/
│
├── proxy.ts                                # Tenant 감지 및 검증 로직
│
├── app/
│   ├── layout.tsx                          # Root Layout
│   ├── page.tsx                            # Root Page
│   ├── globals.css                         # Global Styles
│   ├── not-found.tsx                       # Global 404
│   │
│   └── [tenant]/
│       ├── layout.tsx                      # Tenant Config 주입
│       ├── page.tsx                        # Tenant Root Page
│       ├── error.tsx                       # Tenant 에러 핸들링
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
│   │   └── AppConfigContext.tsx            # App Config Context
│   │
│   ├── hooks/
│   │   ├── useObservable.ts                # Observable Hook
│   │   └── useTenant.ts                    # Tenant 식별 Hook
│   │
│   ├── store/
│   │   └── global.store.ts                 # Global Store
│   │
│   └── utils/
│       ├── component-loader.ts             # Component Loader Utility
│       ├── object.util.ts                  # Object Utilities
│       ├── date.util.ts                    # Date Utilities
│       └── string.util.ts                  # String Utilities
│
├── standard/                               # [Base] 기본 구현체
│   ├── standard.css                        # Standard Styles
│   │
│   ├── shared/
│   │   └── components/
│   │       └── TopNavbar.tsx               # Shared TopNavbar Component
│   │
│   ├── services/
│   │   └── TopNavbar.tsx                   # TopNavbar Service
│   │
│   ├── login/
│   │   ├── services/
│   │   │   └── login.service.ts            # [통합] API + Validator + Logic
│   │   ├── store/
│   │   │   └── login.store.ts              # Login Store
│   │   ├── components/
│   │   │   ├── LoginForm.tsx               # Login Form Component
│   │   │   └── LoginHeader.tsx             # Login Header Component
│   │   └── LoginPage.tsx                   # Login Page Component
│   │
│   ├── dashboard/
│   │   ├── services/
│   │   │   └── dashboard.service.ts        # [통합] API + Logic
│   │   ├── store/
│   │   │   └── dashboard.store.ts          # Dashboard Store
│   │   ├── components/
│   │   │   └── DashboardChart.tsx         # Dashboard Chart Component
│   │   └── DashboardPage.tsx               # Dashboard Page Component
│   │
│   └── contract/
│       ├── services/
│       │   └── contract.service.ts         # [통합] API + Logic
│       ├── store/
│       │   └── contract.store.ts           # Contract Store
│       ├── components/
│       │   └── ContractList.tsx            # Contract List Component
│       └── ContractPage.tsx                # Contract Page Component
│
├── tenants/                                # [Override] 실제 오버라이드 파일만 존재
│   ├── demo/
│   │   ├── demo.css                        # Demo Tenant Styles
│   │   ├── login/
│   │   │   └── DemoLoginPage.tsx           # Demo Login Page Override
│   │   └── dashboard/
│   │       └── DemoDashboardPage.tsx       # Demo Dashboard Page Override
│   │
│   └── apr/
│       ├── apr.css                         # APR Tenant Styles
│       ├── login/
│       │   ├── components/
│       │   │   └── AprSsoButton.tsx        # APR SSO Button Component
│       │   └── AprLoginPage.tsx            # APR Login Page Override
│       └── dashboard/
│           └── AprDashboardPage.tsx        # APR Dashboard Page Override
│
└── uikit/                                  # UI Kit Components
    ├── card/
    │   └── StatCard.tsx                    # Stat Card Component
    ├── chart/
    │   └── BarChart.tsx                    # Bar Chart Component
    ├── form/
    │   ├── Button.tsx                      # Button Component
    │   ├── Input.tsx                       # Input Component
    │   └── Select.tsx                      # Select Component
    └── layout/
        ├── PageContainer.tsx               # Page Container Component
        └── Section.tsx                     # Section Component
