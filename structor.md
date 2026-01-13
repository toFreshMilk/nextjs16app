buptlebiz_fe/
│
├── package.json
├── pnpm-lock.yaml
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .eslintrc.json
├── Dockerfile
│
└── src/
│
├── proxy.ts                                        # Subdomain 감지 및 Tenant 주입
│
├── app/
│   ├── layout.tsx                                  # Root Layout
│   ├── page.tsx                                    # Root Redirector
│   ├── globals.css                                 # 전역 CSS
│   │
│   └── [tenant]/
│       ├── layout.tsx                              # Tenant Config 주입
│       │
│       ├── login/
│       │   └── page.tsx                            # lazy(getTenantComponentLoader)
│       │
│       └── (main)/
│           ├── layout.tsx                          # TopNavbar 포함
│           ├── dashboard/
│           │   └── page.tsx
│           └── contract/
│               └── page.tsx
│
├── core/
│   │
│   ├── config/
│   │   ├── tenant.config.ts                        # 핵심 설정 + Component Loader
│   │   └── tenants/
│   │       ├── demo.config.ts                      # Demo Config
│   │       └── apr.config.ts                       # APR Config
│   │
│   ├── contexts/
│   │   └── AppConfigContext.tsx                    # Tenant Config Provider
│   │
│   ├── hooks/
│   │   ├── useObservable.ts
│   │   └── useTenant.ts
│   │
│   ├── store/
│   │   └── global.store.ts                         # RxJS 글로벌 스토어
│   │
│   └── utils/
│       ├── object.util.ts
│       ├── date.util.ts
│       └── string.util.ts
│
├── standard/                                       # 추상 베이스 구현
│   │
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
│   │   │   ├── login.service.ts
│   │   │   └── auth.validator.ts
│   │   ├── store/
│   │   │   └── login.store.ts
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── LoginHeader.tsx
│   │   ├── LoginPage.tsx
│   │   └── index.tsx
│   │
│   ├── dashboard/
│   │   ├── services/
│   │   │   ├── dashboard.service.ts
│   │   │   └── dashboard-api.service.ts
│   │   ├── store/
│   │   │   └── dashboard.store.ts
│   │   ├── components/
│   │   │   ├── DashboardSummary.tsx
│   │   │   ├── DashboardChart.tsx
│   │   │   └── DashboardStats.tsx
│   │   ├── DashboardPage.tsx
│   │   └── index.tsx
│   │
│   └── contract/
│       ├── services/
│       │   ├── contract.service.ts
│       │   ├── contract.validator.ts
│       │   └── contract-calculation.service.ts
│       ├── store/
│       │   └── contract.store.ts
│       ├── components/
│       │   ├── ContractForm.tsx
│       │   ├── ContractList.tsx
│       │   └── ContractDetail.tsx
│       ├── ContractPage.tsx
│       └── index.tsx
│
├── tenants/                                        # Tenant별 Override
│   │
│   ├── demo/                                       # Demo Tenant
│   │   │
│   │   ├── demo.css
│   │   │
│   │   ├── login/
│   │   │   ├── components/
│   │   │   │   └── DemoLoginBanner.tsx
│   │   │   ├── DemoLoginPage.tsx
│   │   │   └── index.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── services/
│   │   │   │   └── demo-dashboard.service.ts
│   │   │   ├── store/
│   │   │   │   └── demo-dashboard.store.ts
│   │   │   ├── components/
│   │   │   │   ├── DemoPromoBanner.tsx
│   │   │   │   └── DemoFeatureLock.tsx
│   │   │   ├── DemoDashboardPage.tsx
│   │   │   └── index.tsx
│   │   │
│   │   └── contract/
│   │       ├── services/
│   │       │   └── demo-contract.service.ts
│   │       ├── store/
│   │       │   └── demo-contract.store.ts
│   │       ├── components/
│   │       │   └── DemoContractLimit.tsx
│   │       ├── DemoContractPage.tsx
│   │       └── index.tsx
│   │
│   └── apr/                                        # APR Tenant
│       │
│       ├── apr.css
│       │
│       ├── login/
│       │   ├── services/
│       │   │   ├── apr-sso.service.ts
│       │   │   └── apr-login.service.ts
│       │   ├── store/
│       │   │   └── apr-login.store.ts
│       │   ├── components/
│       │   │   └── AprSsoButton.tsx
│       │   ├── AprLoginPage.tsx
│       │   └── index.tsx
│       │
│       ├── dashboard/
│       │   ├── services/
│       │   │   ├── apr-dashboard.service.ts
│       │   │   └── apr-report.service.ts
│       │   ├── store/
│       │   │   └── apr-dashboard.store.ts
│       │   ├── components/
│       │   │   ├── AprKpiWidget.tsx
│       │   │   └── AprReportSection.tsx
│       │   ├── AprDashboardPage.tsx
│       │   └── index.tsx
│       │
│       └── contract/
│           ├── services/
│           │   ├── apr-contract.service.ts
│           │   └── apr-approval.service.ts
│           ├── store/
│           │   └── apr-contract.store.ts
│           ├── components/
│           │   ├── AprContractWorkflow.tsx
│           │   └── AprApprovalPanel.tsx
│           ├── AprContractPage.tsx
│           └── index.tsx
│
└── uikit/                                          # Pure UI Components
│
├── card/
│   ├── StatCard.tsx
│   ├── InfoCard.tsx
│   └── index.tsx
│
├── chart/
│   ├── SimpleChart.tsx
│   ├── BarChart.tsx
│   └── index.tsx
│
├── form/
│   ├── Input.tsx
│   ├── Button.tsx
│   ├── Select.tsx
│   └── index.tsx
│
└── layout/
├── PageContainer.tsx
├── Section.tsx
└── index.tsx
