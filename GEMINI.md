# Gemini CLI 프로젝트 지침: nova_f

이 파일은 `nova_f` 프로젝트의 기초적인 의무 사항, 아키텍처 규칙 및 기술 가이드라인을 포함하고 있습니다.
이 워크스페이스에서 작업할 때는 반드시 이 지침을 엄격하게 준수해야 합니다.

## 1. 기술 스택 및 환경 (Tech Stack & Environment)
- **프레임워크:** Next.js 16 (App Router)
- **UI 라이브러리:** React 19, TypeScript
- **스타일링:** Tailwind CSS v4, Vanilla CSS
- **데이터 페칭:** React Query v5 (`@tanstack/react-query`)
- **테스팅:** Playwright (`e2e/` 디렉토리)
- **패키지 매니저:** pnpm

## 2. 멀티테넌트 아키텍처 (Multi-Tenant Architecture)
이 프로젝트는 표준 구현과 테넌트별 오버라이드를 분리하는 견고한 멀티테넌트 시스템을 기반으로 구축되었습니다.
- **`src/standard/`**: 컴포넌트, 서비스, 로케일의 기본/표준 구현체입니다.
- **`src/tenants/`**: 테넌트별 오버라이드 코드를 포함합니다 (예: `apr`, `demo`).
- **`src/core/config/tenant.config.ts`**: 표준 모듈을 로드할지 테넌트 특정 모듈을 로드할지 결정하는 단일 진실 공급원(SSOT)입니다.
- **오버라이드 원칙:** `standard/` 파일 내부에 `if (tenant === 'x')` 와 같은 로직을 넣어 코드를 오염시키지 마십시오. 테넌트별로 다른 동작이 필요하다면 `src/tenants/[tenant_id]/...` 내에 오버라이드 파일을 생성하고 해당 테넌트의 설정 파일(예: `apr.config.ts`)에 등록하세요.

## 3. 앱 라우터 및 페이지 컴포넌트 조립 (App Router & Page Composition)
- `src/app/` 디렉토리는 엄격하게 **레이아웃 및 페이지 조립(Layout & Page Composition) 레이어**로만 사용됩니다.
- **슬롯 조합 (Slot Composition):** 테넌트마다 완전히 별개의 페이지를 만들지 마십시오. 교체 가능한 슬롯 컴포넌트를 사용하여 페이지를 조립하세요 (예: 상세 페이지에서 `ContractDetailTop`, `ContractDetailLeft`, `ContractDetailRight`를 조립).
- **프록시/미들웨어:** `src/proxy.ts`는 호스트네임을 통한 테넌트 감지, 언어 라우팅을 처리하며 요청에 `x-tenant-id` 및 `x-lang` 헤더를 주입합니다.

## 4. UI 킷 스타일링 규칙 (`src/uikit/`)
- 모든 공통 재사용 UI 요소는 `src/uikit/`에 위치합니다.
- **내부 스타일링:** 컴포넌트는 `variant`, `tone`, `size`와 같은 prop을 사용하여 기본적인 디자인을 정의합니다.
- **외부 주입:** uikit 컴포넌트를 사용할 때는 추가적인 Tailwind 클래스를 주입하기 위해 `uniqueClassName` prop을 사용하세요 (표준 `className`을 사용하지 마십시오).
- **Prop 네이밍:** 네이티브 HTML 속성과의 충돌을 방지하기 위해 접두사가 붙은 속성 이름을 사용하세요 (예: 폼 입력 시 `size` 대신 `inputSize` 사용).

## 5. 데이터 페칭 및 상태 관리 (Data Fetching & State Management)
- **서버 컴포넌트 (RSC):** 초기 데이터 로드에 사용하세요. 페이지 레벨에서 데이터를 한 번 페칭하고 하위 컴포넌트에 prop으로 전달합니다.
- **클라이언트 컴포넌트:** 상호작용, 데이터 변경(POST) 또는 이벤트 기반 GET 요청에 사용하세요. 여기서의 데이터 페칭은 React Query로 관리해야 합니다.
- **서버 액션 금지:** 이 프로젝트는 상태 업데이트를 위해 Next.js Server Actions의 사용을 명시적으로 피하고 있습니다. 표준 API 호출과 React Query에 의존하세요.

## 6. 다국어 지원 (Internationalization - i18n)
- **동적 라우팅:** 라우트는 `/[lang]/...` 패턴을 따릅니다.
- **지원 언어:** `ko` (기본값) 및 `en`.
- **번역:** JSON 로케일 파일은 `standard/`와 `tenants/` 간에 분리되어 있습니다.
- 클라이언트 측에서 문자열을 처리할 때는 `useCoreTranslation` 훅을 사용하세요.

## 7. 테스팅 (Testing)
- E2E 테스트는 Playwright로 작성되며 `e2e/` 디렉토리에 위치합니다.
- 새로운 기능을 구현하거나 버그를 수정할 때 관련된 Playwright 테스트 스펙이 생성되거나 업데이트되었는지 확인하세요.

## 8. 일반 워크플로우 규칙 (General Workflow Rules)
- **아키텍처 확인:** 파일을 수정하기 전에 변경 사항이 모든 테넌트(`standard/`)에 적용되는지 특정 테넌트(`tenants/`)에 적용되는지 반드시 이해해야 합니다.
- **임포트 (Imports):** 폴더 경계를 존중하세요. `standard/` 코드는 `tenants/`의 코드를 임포트해서는 안 됩니다.
- **의존성 (Dependencies):** 기존 UI 원시 컴포넌트나 React Query를 사용하여 구축할 수 있는 기능의 경우, 타당한 이유 없이 새로운 패키지나 라이브러리를 추가하는 것을 피하세요.
