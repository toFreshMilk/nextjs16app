1. 디렉토리나 파일명에 고객사 하드코딩된거 개선할수없나

2. firstSeg 이건 뭐야? 서브도메인이랑 뭔차이냐

3. proxy.ts 에서 사용하는 실제 도메인들 하드코딩하지 않고 환경변수로 가져온걸로 미리 정의된 실제도메인 가지고 와서 판단하게 해야해.

4. 아래 로직을 테넌트에서 검사하지말고 기본값(demo) 을 두고 입력된 서브도메인으로 덮어쓰는 식으로해야해. 오타가 나던지해서 아예 없는 값이 들어오면 에러페이지로 가야겠지




/ (Project Root)
├── package.json
├── pnpm-lock.yaml
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .eslintrc.json
├── Dockerfile
│
└── src/
├── proxy.ts                      # [Proxy] 테넌트 감지 및 URL Rewrite
│
├── app/
│   ├── layout.tsx                # [Root Layout] (html, body)
│   ├── page.tsx                  # [Landing Page] Redirector
│   ├── globals.css               # 전역 CSS (최하위 우선순위)
│   │
│   └── [tenant]/
│       ├── layout.tsx            # [Tenant Layout] CSS Variable 주입
│       │
│       ├── login/                # [독립] 로그인 페이지
│       │   └── page.tsx
│       │
│       └── (main)/               # [Route Group] 메인 앱 그룹
│           ├── layout.tsx        # [Main Layout] TopNavbar 포함
│           │
│           ├── dashboard/
│           │   └── page.tsx
│           │
│           └── contract/
│               └── page.tsx
│
├── core/
│   ├── config/
│   │   └── tenant.config.ts      # [통합] 모든 테넌트 설정 (apr, handok, iic, demo)
│   │
│   ├── contexts/
│   │   └── AppConfigContext.tsx  # Static Config Provider (Client)
│   │
│   ├── hooks/
│   │   └── useObservable.ts      # RxJS Observable → React State Hook
│   │
│   ├── store/
│   │   └── global.store.ts       # RxJS 글로벌 스토어
│   │
│   └── utils/
│       ├── date.util.ts          # 날짜 유틸리티 (순수 함수)
│       └── string.util.ts        # 문자열 유틸리티 (순수 함수)
│
├── standard/
│   ├── standard.css              # 표준 테마 CSS (중간 우선순위)
│   │
│   ├── services/                 # [공통] 전역 비즈니스 로직
│   │   └── navbar.service.ts     # TopNavbar 메뉴 필터링 로직
│   │
│   ├── login/
│   │   ├── services/
│   │   │   ├── login.service.ts     # 로그인 API 호출 로직
│   │   │   └── auth.validator.ts    # 인증 검증 로직
│   │   ├── LoginPage.tsx            # 화면 조합 (uikit 사용)
│   │   └── index.tsx                # [Registry] 동적 import 분기
│   │
│   ├── dashboard/
│   │   ├── store/
│   │   │   └── dashboard.store.ts      # RxJS 로컬 스토어
│   │   ├── services/
│   │   │   └── dashboard.service.ts    # 대시보드 데이터 로직
│   │   ├── DashboardPage.tsx           # 화면 조합 (uikit 사용)
│   │   └── index.tsx                   # [Registry] 동적 import 분기
│   │
│   └── contract/
│       ├── store/
│       │   └── contract.store.ts       # RxJS 로컬 스토어
│       ├── services/
│       │   ├── contract.service.ts     # API 호출 + 계산 로직
│       │   └── contract.validator.ts   # 계약 검증 로직
│       ├── ContractPage.tsx            # 화면 조합 (uikit 사용)
│       └── index.tsx                   # [Registry] 동적 import 분기
│
├── tenants/
│   ├── apr/
│   │   ├── apr.css                     # APR 전용 CSS (최상위 우선순위)
│   │   ├── login/
│   │   │   └── AprLoginPage.tsx
│   │   ├── dashboard/
│   │   │   └── AprDashboardPage.tsx
│   │   └── contract/
│   │       └── AprContractPage.tsx
│   │
│   ├── handok/
│   │   ├── handok.css                  # Handok 전용 CSS (최상위 우선순위)
│   │   ├── login/
│   │   │   └── HandokLoginPage.tsx
│   │   └── dashboard/
│   │       └── HandokDashboardPage.tsx
│   │
│   └── iic/
│       ├── iic.css                     # IIC 전용 CSS (최상위 우선순위)
│       └── dashboard/
│           └── IicDashboardPage.tsx
│
└── uikit/                              # [Pure UI] 로직 없음, CSS 없음 (Tailwind만)
├── card/
│   └── StatCard.tsx                # 순수 카드 UI
├── chart/
│   └── SimpleChart.tsx             # 순수 차트 UI
└── layout/
└── PageContainer.tsx           # 순수 레이아웃 Wrapper
