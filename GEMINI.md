# 🚀 Gemini CLI 프로젝트 지침: buptlebiz_fe (nova_f)

이 파일은 `buptlebiz_fe` 프로젝트의 아키텍처 규칙, 기술 스택 및 **Next.js 16 MCP(Model Context Protocol)** 기반의 개발 워크플로우를 정의합니다. 제미나이 CLI는 모든 작업 시 이 지침을 최우선으로 준수해야 합니다.

## 1. 기술 스택 및 환경 (Tech Stack)
- **Framework:** Next.js 16.1+ (App Router, **MCP Enabled**)
- **Library:** React 19, TypeScript, TanStack Query v5
- **Styling:** Tailwind CSS v4, Vanilla CSS
- **Middleware:** `src/proxy.ts` (Tenant/Locale 감지 및 헤더 주입)
- **Testing:** Playwright (`e2e/`)

## 2. MCP 기반 "Runtime-First" 워크플로우 (Mandatory)
Next.js 16의 MCP 도구를 사용하여 추측이 아닌 **실시간 데이터**에 기반해 판단하십시오.

1.  **진단 (Diagnostic):** 변경 전후에 `nextjs_call`의 `get_errors`를 호출하여 컴파일/런타임 에러를 확인하십시오.
2.  **라우트 확인:** 새로운 페이지나 링크 작업 시 `get_routes`를 통해 실제 등록된 엔드포인트를 확인하십시오.
3.  **브라우저 검증:** UI 변경이나 복잡한 클라이언트 로직 수정 후에는 반드시 `browser_eval`을 사용하여 실제 렌더링 상태와 하이드레이션 오류를 검증하십시오.
4.  **문서 참조:** Next.js API 관련 의문이 생기면 반드시 `nextjs_docs`를 사용하여 최신 공식 문서를 조회하십시오.

## 3. 멀티테넌트 및 조립 아키텍처 (Architecture)

### 3.1 레이어별 책임
- **`src/app/` (Composition):** 페이지의 뼈대를 조립하는 레이어입니다. 직접적인 비즈니스 로직이나 복잡한 스타일링을 피하고, 슬롯(Slot) 컴포넌트를 배치하는 역할만 수행합니다.
- **`src/standard/` (Base):** 모든 테넌트가 공유하는 기본 구현체입니다.
- **`src/tenants/` (Override):** 특정 테넌트(예: `apr`, `demo`)를 위한 오버라이드 코드입니다.
- **`src/core/config/` (SSOT):** 어떤 컴포넌트/서비스를 사용할지 결정하는 단일 진실 공급원입니다.

### 3.2 오버라이드 원칙
- **Standard 코드 오염 금지:** `standard/` 파일 내부에 `if (tenant === 'apr')`와 같은 분기 처리를 절대 하지 마십시오.
- **파일 단위 오버라이드:** 차별화가 필요하면 `tenants/[id]/`에 파일을 만들고 `tenant.config.ts`에서 매핑을 업데이트하십시오.

## 4. 데이터 페칭 및 상태 관리
- **RSC (Server Components):** 초기 데이터 로드는 페이지 레벨에서 수행하여 Props로 전달하십시오.
- **Client Components:** 상호작용 및 Mutation(POST/PUT/DELETE)에만 사용하십시오. 데이터 관리는 React Query를 사용합니다.
- **Server Actions 금지:** 이 프로젝트는 명시적으로 Server Actions를 지양합니다. 표준 API 호출과 React Query를 사용하십시오.
- **데이터 타입 정의:** 최대한 서비스 파일에서 정의하고

## 5. UI 킷 스타일링 규칙 (`src/uikit/`)
- **Internal Style:** 컴포넌트 내부에 `variant`, `tone`, `size` 등을 정의합니다.
- **External Injection:** 외부에서 스타일 주입 시 `uniqueClassName` prop을 사용하십시오 (`className` 사용 금지).
- **Prop Naming:** HTML 기본 속성과의 충돌 방지를 위해 `inputSize`, `selectSize`와 같이 명명하십시오.

## 6. 다국어 지원 (i18n)
- 모든 텍스트는 `locales/*.json`에 정의하고 `useCoreTranslation` 훅을 통해 호출하십시오.
- 라우팅은 `/[lang]/...` 구조를 따르며, `src/proxy.ts`에서 처리됩니다.

---
**지침 확인:** 이 파일의 내용을 숙지했음을 확인하고, 이후 모든 `Directives` 수행 시 위 규칙들을 적용하십시오.
