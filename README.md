1. 디렉토리나 파일명에 고객사 하드코딩된거 개선할수없나




/ (Project Root)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── src/
├── middleware.ts
├── proxy.ts
│
├── app/
│   ├── layout.tsx            # [Root Layout]
│   ├── DashboardPage.tsx              # [Landing]
│   ├── globals.css
│   │
│   └── [tenant]/
│       ├── layout.tsx        # [Tenant Layout] 테마만 주입
│       │
│       ├── login/            # [독립] 로그인 (TopNavbar 없음)
│       │   └── DashboardPage.tsx
│       │
│       └── (main)/           # [Route Group] 메인 앱
│           ├── layout.tsx    # [Main Layout] TopNavbar 포함
│           ├── dashboard/
│           │   └── DashboardPage.tsx
│           └── contract/
│               └── DashboardPage.tsx
│
├── core/
│   ├── config/tenant.config.ts
│   ├── contexts/AppConfigContext.tsx
│   ├── hooks/useObservable.ts
│   ├── store/global.store.ts
│   └── utils/
│       ├── date.util.ts
│       └── string.util.ts
│
├── standard/
│   ├── standard.css
│   ├── widgets/TopNavbar.tsx
│   │
│   ├── login/
│   │   ├── widgets/LoginForm.tsx
│   │   ├── LoginPage.tsx
│   │   └── index.tsx         # [Registry] 테넌트별 분기
│   │
│   ├── dashboard/
│   │   ├── store/dashboard.store.ts
│   │   ├── widgets/DashboardStatsWidget.tsx
│   │   ├── DashboardPage.tsx
│   │   └── index.tsx         # [Registry]
│   │
│   └── contract/
│       ├── store/contract.store.ts
│       ├── widgets/ContractListWidget.tsx
│       ├── ContractPage.tsx
│       └── index.tsx         # [Registry]
│
├── tenants/
│   ├── sk/
│   │   ├── sk.css
│   │   ├── login/SkLoginPage.tsx
│   │   ├── dashboard/SkDashboardPage.tsx
│   │   └── contract/SkContractPage.tsx
│   └── lg/
│       └── dashboard/IicContractPage.tsx
│
└── uikit/
├── card/StatCard.tsx
├── chart/SimpleChart.tsx
└── layout/PageContainer.tsx
