# 📝 Next.js 16 어플리케이션 

기업용 계약 및 법무 관리 솔루션을 제공하는 B2B SaaS 프론트엔드 애플리케이션입니다.

미리보기:
- **APR 테넌트**: https://apr.buptlebiz-fe2.pages.dev/ko/contract
- **DEMO 테넌트**: https://demo.buptlebiz-fe2.pages.dev/ko/contract

---

## 🚀 Tech Stack

- **Framework**: Next.js 16.1 (App Router, MCP Enabled)
- **Runtime**: React 19 (React Compiler 적용)
- **Language**: TypeScript 5
- **Routing**: Next.js App Router (`src/app/[lang]/...`)
- **Middleware**: `src/proxy.ts` — 호스트 기반 테넌트/로케일 감지 및 헤더 주입
- **Styling**: Tailwind CSS v4, Vanilla CSS
- **State Management**:
  - Server State: `@tanstack/react-query`
  - URL State: `nuqs` 규약 — UI 상호작용 상태는 URL Query로 기록 (CLAUDE.md §5)
- **i18n**: `i18next`, `react-i18next`, `i18next-korean-postposition-processor` (조사 자동 처리)
- **UI Components**: `@tanstack/react-table`, `recharts`
- **Testing**: Playwright (E2E, `e2e/`)
- **Package Manager**: pnpm 10

---

## 🏗️ Architecture Highlights

### 1. Multi-tenant System (멀티 테넌트)
서브도메인(예: `apr.buptle.com`, `demo.buptle.com`)을 `src/proxy.ts`에서 식별하여, 각 고객사 설정과 UI 컴포넌트를 동적으로 주입합니다.

- **`src/app/`** — Composition 레이어. 페이지 뼈대를 슬롯 단위로 조립.
- **`src/standard/`** — 모든 테넌트가 공유하는 표준 구현 (Base).
- **`src/tenants/{tenantId}/`** — 특정 테넌트(예: `apr`, `demo`) 오버라이드.
- **`src/core/config/`** — SSOT. 테넌트별 Feature Flag, i18n 범위, 컴포넌트 매핑을 정의.

> **Standard 코드 오염 금지**: `standard/` 내부에 `if (tenant === 'apr')` 같은 분기를 절대 두지 않는다. 차별화는 `tenants/{id}/` 파일 단위 오버라이드 + `tenant.config.ts` 매핑으로 처리한다. (CLAUDE.md §4.2)

### 2. URL-driven i18n (라우팅 기반 다국어)
상태 유실 방지와 SEO를 위해 **"URL이 진실의 원천"**이 되는 다국어 시스템을 채택했습니다.

- 라우팅 구조: `/{lang}/...` (예: `/ko/contract`, `/en/contract`)
- 로케일 감지·정규화는 `src/proxy.ts`에서 처리.
- 모든 텍스트는 `locales/*.json`에 정의하고 `useCoreTranslation` 훅으로 호출 (CLAUDE.md §7).
- **한국어 조사 처리**: 번역 파일에 `"'{{title}}'[[를]]"` 형태로 작성하면, 받침 유무와 따옴표 문맥을 파악하여 '을/를', '이/가' 등을 자동 교정.

### 3. URL State Management (`nuqs` 규약)
컴포넌트 간 결합도를 낮추기 위해, 검색 필터·활성 탭 등 조회 조건은 React State가 아닌 URL Query Parameter로 관리합니다. 서버 데이터는 다시 받아오고, 로컬 UI 상태만 URL에 반영합니다.

### 4. RSC-first 데이터 페칭
- **RSC**: 초기 데이터 로드는 페이지 레벨에서 수행하여 Props로 전달.
- **Client Components**: 상호작용 및 Mutation에만 사용. React Query로 관리.
- **Server Actions 금지**: 표준 API 호출 + React Query를 사용 (CLAUDE.md §5).

---

## 📂 Directory Structure

상세 설명: 👉 **[structor.md](./structor.md)**

---

## 💻 Scripts

```bash
# 개발 서버 (port 3200, MCP enabled)
pnpm dev

# 타입 검사 및 프로덕션 빌드
pnpm build

# 환경별 빌드
pnpm build:stg
pnpm build:prod

# 프로덕션 서버 (port 3200)
pnpm start

# 린트
pnpm lint

# 포맷
pnpm format

# E2E 테스트
pnpm test
pnpm test:e2e:headed
```

---

## 🛠️ UI Kit 규칙 (`src/uikit/`)

- **Internal Style**: 컴포넌트 내부에서 `variant`, `tone`, `size` 등을 정의.
- **External Injection**: 외부 스타일 주입 시 `uniqueClassName` prop 사용 (`className` 금지).
- **Prop Naming**: HTML 기본 속성과 충돌 방지를 위해 `inputSize`, `selectSize` 형태로 명명.

---

## 📋 Development Convention

1. **억지 타입 캐스팅(`as`) 금지** — 타입 가드/좁히기로 명확한 타입 설계 지향.
2. **컴포넌트 독립성** — 페이지를 구성하는 컴포넌트는 다른 컴포넌트 상태에 직접 의존하지 않고, URL Query(`nuqs` 규약)를 매개로만 동기화. 테넌트별 컴포넌트 교체 시 사이드이펙트 차단이 목적.
3. **i18n Fallback 명시** — `useCoreTranslation('contract')` 사용 시 `common` 네임스페이스가 자동으로 묶이도록 설계. 공통 문구는 prefix 없이 사용 가능.
4. **데이터 타입은 서비스 파일에 정의** — DTO/응답 타입은 가능하면 `*.service.ts`에 모은다 (CLAUDE.md §5).

---

## 🔌 MCP (Model Context Protocol) 워크플로우

Next.js 16의 MCP 도구를 사용해 추측이 아닌 실시간 데이터로 진단합니다.

| 도구                                          | 용도                                            |
|----------------------------------------------|------------------------------------------------|
| `mcp__next-devtools__init`                   | 세션 시작 시 컨텍스트 초기화                       |
| `mcp__next-devtools__nextjs_index`           | 실행 중 dev 서버 디스커버리                       |
| `mcp__next-devtools__nextjs_call`            | `get_errors`, `get_routes` 등 sub-tool 호출    |
| `mcp__next-devtools__browser_eval`           | Playwright 자동화 (hydration 오류 캡처)         |
| `mcp__next-devtools__nextjs_docs`            | 공식 문서 페치                                  |

`get_errors`와 `get_routes`는 별도 도구가 아니라 `nextjs_call`의 sub-tool로 호출합니다. 자세한 절차는 **CLAUDE.md §3** 참조.
