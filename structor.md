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
├── structor.md                            # Project structure doc
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
    ├── app/                                # Next.js App Router (조립 레이어)
    │   ├── layout.tsx                      # Root Layout (Inter Font)
    │   ├── page.tsx                        # Root Page (redirect to /demo/contract)
    │   ├── globals.css                     # Global Styles (Tailwind v4 theme vars)
    │   ├── not-found.tsx                  # Global 404
    │   │
    │   ├── api/                            # API Routes
    │   │   └── contracts/
    │   │       ├── route.ts                # GET /api/contracts
    │   │       ├── detail/
    │   │       │   └── route.ts            # GET /api/contracts/detail
    │   │       ├── detail2/
    │   │       │   └── route.ts            # GET /api/contracts/detail2
    │   │       └── approve/
    │   │           └── route.ts            # POST /api/contracts/approve
    │   │
    │   └── [tenant]/                       # Tenant Dynamic Routes
    │       ├── layout.tsx                  # Tenant Config 주입 (AppConfigProvider)
    │       ├── page.tsx                    # Tenant Root (redirect to /{tenant}/contract)
    │       ├── error.tsx                   # Tenant 에러 핸들링
    │       │
    │       └── (main)/
    │           ├── layout.tsx              # Main Layout (TopNavbar, WorkspaceBanner 주입)
    │           └── contract/
    │               ├── actions/
    │                   └── contract.actions.ts         # Server Actions (approveContractAction 등)
    │               ├── page.tsx            # Contract Page (Sidebar + Main 조립)
    │               └── [id]/
    │                   └── page.tsx        # Contract Detail Page (Top + Left + Right 조립)
    │
    ├── core/
    │   ├── config/
    │   │   ├── tenant.config.ts            # Config Loader + 타입 정의
    │   │   │                                # - ContractRow, ContractService 타입
    │   │   │                                # - ContractService: getContracts(), getContractsDetail(), getContractsDetail2()
    │   │   │                                # - loadTenantConfig, getTenantComponent, getTenantService
    │   │   └── tenants/
    │   │       ├── demo.config.ts          # Demo Config (WorkspaceBanner, ContractService 오버라이드)
    │   │       └── apr.config.ts          # APR Config (WorkspaceBanner, ContractSidebar, ContractMain, ContractService 오버라이드)
    │   │
    │   ├── contexts/
    │   │   └── AppConfigContext.tsx        # App Config Context (TenantConfigData, AppConfigContextValue 타입 포함)
    │   │
    │   ├── hooks/
    │   │   └── useTenant.ts                # Tenant 식별 Hook
    │   │
    │   ├── services/
    │   │   └── apiClient.ts                # API Client (apiGet, apiPost, resolveFetchUrl)
    │   │
    │   └── utils/
    │       ├── date.util.ts                # Date utilities (formatDate)
    │       ├── object.util.ts              # Object utilities (isEmpty, deepClone)
    │       └── string.util.ts              # String utilities (capitalize, truncate)
    │
    ├── mock-data/                           # Mock Data
    │   └── contracts/
    │       ├── contracts.ts                # Mock Contract Data Loader (getMockContracts, setMockContractOverride)
    │       ├── standard.json               # Standard Tenant Mock Data
    │       ├── demo.json                   # Demo Tenant Mock Data
    │       └── apr.json                    # APR Tenant Mock Data
    │
    ├── standard/                            # [Base] 기본 구현체 (파일 보관소)
    │   ├── standard.css                    # Standard Styles
    │   │
    │   ├── shared/
    │   │   └── components/
    │   │       ├── TopNavbar.tsx           # Standard TopNavbar
    │   │       └── WorkspaceBanner.tsx     # Standard WorkspaceBanner (default: null)
    │   │
    │   └── contract/
    │       ├── components/
    │       │   ├── ContractSidebar.tsx     # Standard Contract Sidebar
    │       │   ├── ContractMain.tsx        # Standard Contract Main
    │       │   ├── ContractList.tsx        # Standard Contract List (행 클릭 시 상세 페이지 이동)
    │       │   ├── ContractDetailTop.tsx    # Standard Contract Detail Top (제목/버튼/상태표시/프로그레스바)
    │       │   ├── ContractDetailLeft.tsx   # Standard Contract Detail Left (기본정보/유저정보/기타정보/계약서 카드)
    │       │   └── ContractDetailRight.tsx  # Standard Contract Detail Right (버튼박스/공유카드/진행상황 흐름도)
    │       └── services/
    │           └── contract.service.ts     # Standard Contract Service
    │
    ├── tenants/                             # [Override] 테넌트별 오버라이드 (파일 보관소)
    │   │
    │   ├── demo/
    │   │   ├── demo.css                    # Demo Tenant Styles
    │   │   │
    │   │   ├── shared/
    │   │   │   └── components/
    │   │   │       └── WorkspaceBanner.tsx # Demo WorkspaceBanner Override
    │   │   │
    │   │   └── contract/
    │   │       └── services/
    │   │           └── contract.service.ts  # Demo Contract Service Override (콘솔 로그 포함)
    │   │
    │   └── apr/
    │       ├── apr.css                     # APR Tenant Styles
    │       │
    │       ├── shared/
    │       │   └── components/
    │       │       └── WorkspaceBanner.tsx # APR WorkspaceBanner Override
    │       │
    │       └── contract/
    │           ├── components/
    │           │   ├── ContractSidebar.tsx  # APR Contract Sidebar Override
    │           │   └── ContractMain.tsx     # APR Contract Main Override (워크보드 스타일)
    │           └── services/
    │               └── contract.service.ts   # APR Contract Service Override
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

## 아키텍처 원칙

### 1. app/ 레이어: 조립(Composition)
- `app/` 디렉토리는 **1차 뎁스 레이아웃(레이아웃 뼈대)**을 책임집니다.
- `app/[tenant]/(main)/layout.tsx`: TopNavbar, WorkspaceBanner를 테넌트 설정에 따라 주입
- `app/[tenant]/(main)/contract/page.tsx`: ContractSidebar + ContractMain을 조립
- `app/[tenant]/(main)/contract/[id]/page.tsx`: ContractDetailTop + ContractDetailLeft + ContractDetailRight를 조립
- **페이지 단위 override는 사용하지 않음** (슬롯 조립 방식만 사용)

### 2. standard/ & tenants/: 파일 보관소
- `standard/`: 기본 구현체 보관소
- `tenants/`: 테넌트별 오버라이드 파일 보관소
- 실제 사용은 `core/config/tenant.config.ts`의 설정을 통해 결정됨

### 3. 타입 정의 위치
- **Contract 관련 타입**: `core/config/tenant.config.ts`에 정의
  - `ContractStatus`, `ContractRow`, `ContractService`
  - `ContractService` 인터페이스: `getContracts()`, `getContractsDetail()`, `getContractsDetail2()` 메서드 포함
- **App Config 관련 타입**: `core/contexts/AppConfigContext.tsx`에 정의
  - `TenantConfigData`, `AppConfigContextValue`

### 4. 테넌트별 차별화 포인트
- **Demo**: WorkspaceBanner + ContractService (데모 데이터 + 콘솔 로그)
  - ContractService에 `getContractsDetail()`, `getContractsDetail2()` 메서드 오버라이드 가능
- **APR**: WorkspaceBanner + ContractSidebar + ContractMain (완전히 다른 UI) + ContractService
  - ContractDetailTop/Left/Right는 오버라이드하지 않으면 Standard 구현체 사용

### 5. 계약 상세 페이지 구조
- **URL**: `/[tenant]/contract/[id]`
- **3분할 컴포넌트 조립**:
  - `ContractDetailTop`: 상단부 (제목, 버튼, 상태표시, 상태 프로그레스바)
  - `ContractDetailLeft`: 좌측 (기본정보, 유저정보, 기타정보, 계약서 카드)
  - `ContractDetailRight`: 우측 (버튼박스, 공유카드, 진행상황 흐름도)
- **데이터 로딩**: RSC(서버 컴포넌트)에서 1회 데이터 로드 후 props로 전달 (워터폴/중복 호출 제거)
  - `app/[tenant]/(main)/contract/[id]/page.tsx`에서 `ContractService.getContractsDetail()` 호출
  - 로드된 데이터를 `contract` props로 Top/Left/Right 컴포넌트에 전달
  - 클라이언트 컴포넌트는 props로 받은 데이터만 렌더링 (서비스 호출 없음)
- **목록 페이지 데이터 로딩**: 
  - `app/[tenant]/(main)/contract/page.tsx`에서 `ContractService.getContracts()` 호출
  - URL search params(`q`, `tab`) 기반 서버 측 필터링 후 `ContractMain`에 `contracts` props로 전달
- **상태 업데이트**: Server Action + revalidatePath 사용
  - `core/actions/contract.actions.ts`의 `approveContractAction`으로 승인 처리
  - `revalidatePath`로 상세/목록 페이지 동시 최신화
- **목록에서 상세로 이동**: `ContractList` 컴포넌트에서 행 클릭 시 현재 pathname 기준으로 `/${id}` 경로로 이동
