# 🚀 Claude Code 프로젝트 지침: buptlebiz_fe (nova_f)

이 파일은 `buptlebiz_fe` 프로젝트의 아키텍처 규칙, 기술 스택 및 **Next.js 16 MCP(Model Context Protocol)** 기반의 개발 워크플로우를 정의합니다. Claude Code는 모든 작업 시 이 지침을 최우선으로 준수해야 합니다.

## 1. 답변 작성 절차 (Mandatory)

모든 답변은 다음 절차를 거친다. 이 섹션은 도메인 규칙(§2 이하)보다 먼저 적용된다.

### 1.1 답변 시작 전 점검
1. **CLAUDE.md 재참조**: 답변 작성 전 이 파일을 다시 읽고 현재 답변에 적용될 규칙을 식별한다.
2. **충돌 표면화**: 사용자 요청이 CLAUDE.md 규칙과 충돌하면, 답변 첫머리에서 "이 변경은 §X.Y 규칙과 충돌한다"는 점을 명시한다. 코드 결정 전에 CLAUDE.md 자체의 갱신이 필요한지 먼저 확인한다.
3. **MCP 도구 가용성 확인**: §3에 명시된 MCP 도구가 이 환경에서 실제 호출 가능한지 우선 확인한다. 가용하지 않으면 그 사실을 명시하고 대체 절차를 밝힌다.

### 1.2 추정과 검증
1. **실시간 데이터 우선**: 코드/아키텍처 결정에서 일반 패턴 비교나 추정으로 답하지 않는다. 실제 파일을 먼저 읽고, 가용한 MCP 도구로 진단한 뒤 답한다.
2. **추정 명시**: 추정으로 답할 때는 "추정"이라고 표시한다. 추정과 검증된 사실을 같은 톤으로 섞지 않는다.
3. **매끄러움 ≠ 정확성**: 일반 소프트웨어 패턴은 학습 데이터에 흔해서 매끄럽게 출력된다. 그 매끄러움이 정확성처럼 느껴지면 한 번 더 의심한다. 프로젝트 고유 맥락이 반영됐는지 점검한다.

### 1.3 입장 일관성
1. **약한 신호로 입장 변경 금지**: 사용자의 "동의 안 됨", "그건 아닌 것 같다" 같은 표시 신호만으로 분석을 약화시키지 않는다. 구체적 반박이나 사실 정정이 와야 분석을 재검토한다.
2. **약한 주장은 처음부터 약하게**: 처음에 강하게 말하고 나중에 후퇴시키지 않는다. 주장 강도를 처음부터 정확히 표시한다.
3. **편향 없는 옵션 비교**: 옵션 비교 시 한쪽에 무의식적 선호가 작동하는지 점검한다. "새로운 구조가 더 깔끔하다", "큰 변경이 더 멋지다" 같은 편향이 비교를 기울이지 않게, 합리적 옵션을 비대칭 없이 펼친다.

### 1.4 잘못 인정의 방식
1. **의인화 금지**: "게으름", "잊었다", "신경 못 썼다" 같은 사람한테 쓰는 단어로 메커니즘을 가리지 않는다. 메커니즘 차원에서 설명한다.
2. **사과 시간 끌기 금지**: 사과/반성으로 분량을 채우지 않는다. 짧게 인정하고 진단한 뒤 다음 행동으로 넘어간다.
3. **자기비판 모드 경계**: 자기비판 모드 자체가 책임 회피 패턴이 될 수 있음을 경계한다. "잘못했다"의 반복은 진단도 행동도 아니다.

## 2. 기술 스택 및 환경 (Tech Stack)
- **Framework:** Next.js 16.1+ (App Router, **MCP Enabled**)
- **Library:** React 19, TypeScript, TanStack Query v5
- **Styling:** Tailwind CSS v4, Vanilla CSS
- **Middleware:** `src/proxy.ts` (Tenant/Locale 감지 및 헤더 주입)
- **Testing:** Playwright (`e2e/`)

## 3. MCP 기반 "Runtime-First" 워크플로우 (Mandatory)

Next.js 16의 MCP 도구를 사용하여 추측이 아닌 **실시간 데이터**에 기반해 판단하십시오.

### 3.0 노출되는 MCP 도구 (확인됨, 2026-04-28 기준)

| 도구 (Claude Code 노출명)                          | 용도                                                                |
|----------------------------------------------------|---------------------------------------------------------------------|
| `mcp__next-devtools__init`                         | 세션 시작 시 Next.js 지식 reset, 항상 `nextjs_docs` 우선             |
| `mcp__next-devtools__nextjs_index`                 | 실행 중 dev 서버 + 노출 sub-tool 디스커버리                          |
| `mcp__next-devtools__nextjs_call`                  | dev 서버의 sub-tool 호출 (`get_errors`, `get_routes` 등이 sub-tool) |
| `mcp__next-devtools__browser_eval`                 | Playwright 자동화 (hydration 오류, console 캡처)                     |
| `mcp__next-devtools__nextjs_docs`                  | 공식 문서 페치 — 사전에 `nextjs-docs://llms-index` 리소스로 path 확보 |
| `mcp__next-devtools__enable_cache_components`      | Cache Components 기능 활성화 (Next.js 16 신기능)                     |
| `mcp__next-devtools__upgrade_nextjs_16`            | Next.js 15 이하 업그레이드 어시스턴트                                |

`get_errors`와 `get_routes`는 **별도 도구가 아님** — `nextjs_call({ port: "3200", toolName: "get_errors" })`처럼 sub-tool로 호출.

### 3.1 사용 절차

1.  **진단:** 변경 전후 `nextjs_call`로 `get_errors`를 호출해 컴파일/런타임 에러를 확인.
2.  **라우트 확인:** 새 페이지/링크 작업 시 `nextjs_call`로 `get_routes` 호출.
3.  **브라우저 검증:** UI/클라이언트 로직 변경 후 `browser_eval`로 hydration 오류 확인.
4.  **문서 참조:** Next.js API 의문이 생기면 `nextjs_docs` (사전에 `nextjs-docs://llms-index` 리소스 읽기).

### 3.2 전제조건과 폴백 (§1.1.3 구체화)

- `nextjs_call`/`get_errors`/`get_routes`/`browser_eval`은 dev 서버 실행을 전제(`pnpm dev`, port 3200 — `package.json`의 `dev` 스크립트와 일치).
- `nextjs_index`가 `No running Next.js dev servers with MCP enabled found` 반환 시: 그 사실을 답변에 명시하고 **정적 폴백** — `pnpm exec tsc --noEmit`, `pnpm exec eslint`, Read/Grep으로 코드 직접 확인.
- MCP 도구 자체가 노출되지 않은 세션이면 (다른 등록 환경에서 호출되었거나 재시작 직후): 도구 가용성을 한 줄로 명시한 뒤 정적 폴백.

## 3.5 위임 매트릭스 (work-executor 전용)

work-executor는 다음 작업 유형을 직접 수행하지 않고 좁은 sub-agent에 위임한다:

| 작업 유형                         | 위임 대상              |
|----------------------------------|----------------------|
| 슬롯 추출 (1개 슬롯)              | slot-refactor        |
| ContractDetail 필드 추가          | detail-field-adder   |
| 신규 컴포넌트 registry 등록       | registry-syncer      |
| 신규 테넌트 scaffold              | tenant-scaffolder    |
| Playwright spec 생성              | e2e-generator        |
| i18n drift 검사 (read-only)       | i18n-validator       |
| 비자명 아키텍처 결정 2차 의견     | gemini-second-opinion|

표에 없는 작업만 work-executor가 직접 수행한다.
change-verifier와 test-runner는 위임 대상이 아니라 파이프라인의 다음 단계이며,
work-executor 종료 후 호출자(메인 Claude Code 에이전트)가 순차 실행한다.

검증 단계는 **change-verifier + i18n-validator** 둘 다 호출한다 — change-verifier는 i18n 정밀 검사를 흡수하지 않는다.

### gemini-second-opinion 자동 트리거 (메인 에이전트 책임)

work-executor 호출 **전** 다음 중 하나라도 해당하면 gemini-second-opinion을 먼저 돌린다:
- standard ↔ tenants 경계 변경
- 새로운 추상화 도입 (신규 hook, util, 공유 타입 패턴)
- slot-refactor 호출 직전 (slot 경계 결정 검증)

change-verifier 통과 **후** 다음 중 하나라도 해당하면 추가로 돌린다:
- 변경 line 합계 > 200
- 신규 디렉터리 생성
- `src/standard/registry.ts` 다중 항목 변경

## 4. 멀티테넌트 및 조립 아키텍처 (Architecture)

### 4.1 레이어별 책임
- **`src/app/` (Composition):** 페이지의 뼈대를 조립하는 레이어입니다. 직접적인 비즈니스 로직이나 복잡한 스타일링을 피하고, 슬롯(Slot) 컴포넌트를 배치하는 역할만 수행합니다.
- **`src/standard/` (Base):** 모든 테넌트가 공유하는 기본 구현체입니다.
- **`src/tenants/` (Override):** 특정 테넌트(예: `apr`, `demo`)를 위한 오버라이드 코드입니다.
- **`src/core/config/` (SSOT):** 어떤 컴포넌트/서비스를 사용할지 결정하는 단일 진실 공급원입니다.

### 4.2 오버라이드 원칙
- **Standard 코드 오염 금지:** `standard/` 파일 내부에 `if (tenant === 'apr')`와 같은 분기 처리를 절대 하지 마십시오.
- **파일 단위 오버라이드:** 차별화가 필요하면 `tenants/[id]/`에 파일을 만들고 `tenant.config.ts`에서 매핑을 업데이트하십시오.

> **주의:** 4.1, 4.2는 "standard가 안정적 기준"이라는 전제 위에 서있다. 고객사별 격차가 커서 이 전제가 흔들리는 경우, §1.1.2 절차에 따라 변경 첫머리에서 충돌을 표면화하고 이 섹션 자체의 갱신을 먼저 논의한다.

## 5. 데이터 페칭 및 상태 관리
- **RSC (Server Components):** 초기 데이터 로드는 페이지 레벨에서 수행하여 Props로 전달하십시오.
- **Client Components:** 상호작용 및 Mutation(POST/PUT/DELETE)에만 사용하십시오. 데이터 관리는 React Query를 사용합니다.
- **Server Actions 금지:** 이 프로젝트는 명시적으로 Server Actions를 지양합니다. 표준 API 호출과 React Query를 사용하십시오.
- **데이터 타입 정의:** 최대한 서비스 파일에서 정의합니다.
- **nuqs 스타일 적용:** 서버데이터가 아닌 UI 컴포넌트 상호작용에서 생겨난 상태값은 URL에 파라미터로 기록합니다.

## 6. UI 킷 스타일링 규칙 (`src/uikit/`)
- **Internal Style:** 컴포넌트 내부에 `variant`, `tone`, `size` 등을 정의합니다.
- **External Injection:** 외부에서 스타일 주입 시 `uniqueClassName` prop을 사용하십시오 (`className` 사용 금지).
- **Prop Naming:** HTML 기본 속성과의 충돌 방지를 위해 `inputSize`, `selectSize`와 같이 명명하십시오.

## 7. 다국어 지원 (i18n)
- 모든 텍스트는 `locales/*.json`에 정의하고 `useCoreTranslation` 훅을 통해 호출하십시오.
- 라우팅은 `/[lang]/...` 구조를 따르며, `src/proxy.ts`에서 처리됩니다.

---
**지침 확인:** 이 파일의 내용을 숙지하고, 이후 모든 작업 수행 시 §1을 가장 먼저 적용한 뒤 §2 이하 도메인 규칙을 따르십시오.
