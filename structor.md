buptlebiz_fe/
│
├── package.json # Dependencies / Scripts
├── pnpm-lock.yaml # pnpm lockfile
├── pnpm-workspace.yaml # pnpm workspace
├── next-env.d.ts # Next.js TypeScript declarations
├── tsconfig.json # TypeScript config
├── tsconfig.tsbuildinfo # TypeScript incremental build info
├── next.config.ts # Next.js config
├── tailwind.config.ts # Tailwind config
├── postcss.config.mjs # PostCSS config
├── eslint.config.mjs # ESLint config
├── README.md # Project docs
├── structor.md # Project structure doc
│
├── public/ # Static assets
│   ├── favicons/
│   │   ├── apr.svg
│   │   ├── default.svg
│   │   └── demo.svg
│   ├── file.svg
│   ├── globe.svg
│   ├── window.svg
│   └── mock-data/
│       └── contracts/
│           ├── apr.json
│           ├── demo.json
│           ├── detail/
│           │   ├── apr.json
│           │   └── demo.json
│           └── detail2/
│               ├── apr.json
│               └── demo.json
│
└── src/
    ├── proxy.ts # Tenant 감지 및 검증 로직
    │
    ├── app/ # Next.js App Router (조립 레이어)
    │   ├── layout.tsx # Root Layout
    │   ├── page.tsx # Root Page
    │   ├── globals.css # Global Styles
    │   ├── not-found.tsx # Global 404
    │   │
    │   └── [lang]/ # Language/Tenant Dynamic Routes
    │       ├── layout.tsx # Tenant Config 주입 (AppConfigProvider)
    │       ├── page.tsx # Tenant Root
    │       ├── error.tsx # Tenant 에러 핸들링
    │       │
    │       └── (main)/
    │           ├── layout.tsx # Main Layout (TopNavbar, WorkspaceBanner 조립)
    │           └── contract/
    │               ├── layout.tsx # Contract Layout (Sidebar + Main 조립)
    │               ├── page.tsx # Contract Page (Sidebar + Main 조립)
    │               └── [id]/
    │                   └── page.tsx # Contract Detail Page (Top + Left + Right 조립)
    │
    ├── core/
    │   ├── config/
    │   │   ├── tenant.config.ts # 테넌트 설정 로더 + 서비스/컴포넌트 매핑
    │   │   ├── tenant.types.ts # Tenant/Contract 관련 타입 정의
    │   │   └── tenants/
    │   │       ├── apr.config.ts # APR Tenant Config
    │   │       └── demo.config.ts # Demo Tenant Config
    │   │
    │   ├── contexts/
    │   │   └── AppConfigContext.tsx # App Config Context (TenantConfigData 등)
    │   │
    │   ├── hooks/
    │   │   ├── useCoreTranslation.ts # 공통 i18n 훅
    │   │   └── useTenant.ts # Tenant 식별 Hook
    │   │
    │   ├── i18n/ # Internationalization
    │   │   ├── createClientI18n.ts # 클라이언트 i18n 생성 유틸
    │   │   ├── server.ts # i18n 서버 유틸리티
    │   │   └── types.ts # i18n 타입 정의
    │   │
    │   ├── providers/
    │   │   ├── I18nProvider.tsx # I18n Provider
    │   │   └── QueryProvider.tsx # React Query Provider
    │   │
    │   ├── services/
    │   │   └── apiClient.ts # API Client (apiGet, apiPost 등)
    │   │
    │   └── utils/
    │       ├── date.util.ts # Date utilities
    │       ├── host.util.ts # Hostname utilities (tenant detection)
    │       ├── object.util.ts # Object utilities
    │       ├── text.util.ts # Text/string utilities (i18n key processing)
    │       └── url.util.ts # URL utilities (path parsing, locale handling)
    │
    ├── standard/ # [Base] 기본 구현체 (파일 보관소)
    │   ├── registry.ts # Standard 컴포넌트 레지스트리
    │   │
    │   ├── shared/
    │   │   ├── components/
    │   │   │   ├── TopNavbar.tsx # Standard TopNavbar
    │   │   │   └── WorkspaceBanner.tsx # Standard WorkspaceBanner (default: null)
    │   │   └── locales/
    │   │       ├── en/
    │   │       │   └── common.json # Standard 영어 공통 번역
    │   │       └── ko/
    │   │           └── common.json # Standard 한국어 공통 번역
    │   │
    │   └── contract/
    │       ├── components/
    │       │   ├── ContractSidebar.tsx # Standard Contract Sidebar
    │       │   ├── ContractMain.tsx # Standard Contract Main
    │       │   ├── ContractList.tsx # Standard Contract List
    │       │   ├── ContractDetailTop.tsx # Standard Contract Detail Top
    │       │   ├── ContractDetailLeft.tsx # Standard Contract Detail Left
    │       │   └── ContractDetailRight.tsx # Standard Contract Detail Right
    │       ├── locales/
    │       │   ├── en/
    │       │   │   └── contract.json # Standard 영어 계약 번역
    │       │   └── ko/
    │       │       └── contract.json # Standard 한국어 계약 번역
    │       └── services/
    │           └── contract.service.ts # Standard Contract Service
    │
    ├── tenants/ # [Override] 테넌트별 오버라이드 (파일 보관소)
    │   ├── apr/
    │   │   ├── apr.css # APR Tenant Styles
    │   │   ├── contract/
    │   │   │   ├── components/
    │   │   │   │   ├── ContractDetailTop.tsx # APR Contract Detail Top Override
    │   │   │   │   ├── ContractSidebar.tsx # APR Contract Sidebar Override
    │   │   │   │   └── ContractMain.tsx # APR Contract Main Override
    │   │   │   ├── locales/
    │   │   │   │   ├── en/
    │   │   │   │   │   └── contract.json # APR 영어 계약 번역
    │   │   │   │   └── ko/
    │   │   │   │       └── contract.json # APR 한국어 계약 번역
    │   │   │   └── services/
    │   │   │       └── contract.service.ts # APR Contract Service Override
    │   │   └── shared/
    │   │       ├── APRStyleLoader.tsx # APR 스타일 로더
    │   │       ├── components/
    │   │       │   └── WorkspaceBanner.tsx # APR WorkspaceBanner Override
    │   │       └── locales/
    │   │           ├── en/
    │   │           │   └── common.json # APR 영어 공통 번역
    │   │           └── ko/
    │   │               └── common.json # APR 한국어 공통 번역
    │   │
    │   └── demo/
    │       ├── demo.css # Demo Tenant Styles
    │       ├── contract/
    │       │   ├── components/ # Demo Contract Components (비어있음)
    │       │   └── services/
    │       │       └── contract.service.ts # Demo Contract Service Override
    │       └── shared/
    │           ├── components/
    │           │   └── WorkspaceBanner.tsx # Demo WorkspaceBanner Override
    │           └── DemoStyleLoader.tsx # Demo 스타일 로더
    │
    └── uikit/ # UI Kit Components (재사용 공통 컴포넌트)
        ├── card/
        │   └── StatCard.tsx # 통계 카드 컴포넌트
        ├── chart/
        │   └── BarChart.tsx # 막대 차트 컴포넌트
        ├── form/
        │   ├── Button.tsx # 버튼 컴포넌트
        │   ├── Checkbox.tsx # 체크박스 컴포넌트
        │   ├── Input.tsx # 입력 필드 컴포넌트
        │   ├── Radio.tsx # 라디오 버튼 컴포넌트
        │   ├── Select.tsx # 셀렉트 컴포넌트
        │   └── Textarea.tsx # 텍스트 영역 컴포넌트
        └── layout/
            ├── Modal.tsx # 모달 팝업 컴포넌트 (1버튼/2버튼)
            ├── PageContainer.tsx # 페이지 컨테이너
            └── Section.tsx # 섹션 컴포넌트

## 아키텍처 원칙

### 1. app/ 레이어: 조립(Composition)

- `app/` 디렉토리는 **1차 뎁스 레이아웃(레이아웃 뼈대)**을 책임합니다.
- `app/[lang]/(main)/layout.tsx`: TopNavbar, WorkspaceBanner를 테넌트 설정에 따라 주입
- `app/[lang]/(main)/contract/page.tsx`: ContractSidebar + ContractMain을 조립
- `app/[lang]/(main)/contract/[id]/page.tsx`: ContractDetailTop + ContractDetailLeft + ContractDetailRight를 조립
- **페이지 단위 override는 사용하지 않고, 슬롯 조립 방식만 사용**합니다.

### 2. standard/ & tenants/: 파일 보관소

- `standard/`: 기본 구현체 보관소
- `tenants/`: 테넌트별 오버라이드 파일 보관소
- 실제 사용 여부는 `core/config/tenant.config.ts` 설정을 통해 결정됩니다.

### 3. 타입 정의 위치

- **Contract 관련 타입**: service.ts 파일에 정의
- **App Config 관련 타입**: `core/contexts/AppConfigContext.tsx`에 정의
  - 예: `TenantConfigData`, `AppConfigContextValue` 등

### 4. 테넌트별 차별화 포인트

- **Demo**: WorkspaceBanner + ContractService (데모 데이터 + 로깅 등)
- **APR**: WorkspaceBanner + ContractSidebar + ContractMain + ContractDetailTop (UI 차별화) + ContractService
- ContractDetailLeft/Right는 오버라이드하지 않으면 Standard 구현체를 사용합니다.

### 5. proxy.ts: Tenant/Language 정책 집행

- **역할**: Next.js 16에서 `src/proxy.ts`는 암묵적으로 미들웨어로 동작합니다.
- **책임**:
  - 호스트명 기반 테넌트 감지 및 검증
  - 언어 정책 집행 (i18n feature flag 기반)
  - URL locale prefix 처리 및 리다이렉션
  - `x-tenant-id`, `x-lang` 헤더 주입
- **에러 처리**: 테넌트 설정 로드 실패 시 `/not-found`로 rewrite (중앙 집중식)

### 6. uikit 컴포넌트 스타일링 원칙

- **내부 스타일 선언**: 모든 uikit 컴포넌트는 `variant`, `tone`, `size` 등 기본 스타일을 내부에 정의합니다.
- **uniqueClassName**: 호출부는 `uniqueClassName` prop으로만 추가 스타일을 주입합니다.
- **HTML 기본 속성 충돌 방지**: `size` 같은 HTML 기본 속성과 충돌하는 prop은 `inputSize`, `selectSize` 등으로 명명합니다.

### 7. 계약 상세 페이지 구조

- **URL**: `/[lang]/contract/[id]`
- **3분할 컴포넌트 조립**:
  - `ContractDetailTop`: 상단부 (제목, 버튼, 상태표시, 상태 프로그레스바 등)
  - `ContractDetailLeft`: 좌측 (기본정보, 유저정보, 기타정보, 계약서 카드)
  - `ContractDetailRight`: 우측 (버튼박스, 공유카드, 진행상황 흐름도)
- **데이터 로딩**: 서버 컴포넌트에서 1회 데이터 로드 후 props로 전달
  - `app/[lang]/(main)/contract/[id]/page.tsx`에서 `ContractService.getContractsDetail()` 호출
  - 로드된 데이터를 `contract` props로 Top/Left/Right 컴포넌트에 전달
- **목록 페이지 데이터 로딩**:
  - `app/[lang]/(main)/contract/page.tsx`에서 `ContractService.getContracts()` 호출
- **상태 업데이트**
  - 서버 액션은 사용하지 않음. post요청이나 이벤트에 의해 발생되는 get요청은 클라이언트 컴포넌트에서 직접 호출.
