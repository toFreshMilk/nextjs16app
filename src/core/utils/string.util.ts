/**
 * 문자열을 Title Case로 변환
 */
export function toTitleCase(input: string): string {
    return input
        .split(' ')
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

/**
 * 문자열 자르기 (말줄임표 추가)
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

/**
 * 이메일 마스킹 (개인정보 보호)
 */
export function maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    if (!local || !domain) return email;
    const masked = local.charAt(0) + '***';
    return `${masked}@${domain}`;
}
