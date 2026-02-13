// src/app/[lang]/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { DEFAULT_LANG } from '@/core/config/tenant.config';

export default async function LangRootPage() {
  // ✅ 언어 정책/정규화 결과는 proxy.ts가 결정하고 x-lang으로 내려준다.
  // - URL params.lang에 의존하지 않아서 책임이 더 명확해짐
  const headersList = await headers();
  const lang = headersList.get('x-lang') || DEFAULT_LANG;
  redirect(`/${lang}/contract`);
}
