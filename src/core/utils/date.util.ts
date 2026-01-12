/**
 * Date를 YYYY-MM-DD 형식으로 변환
 */
export function formatYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Date를 YYYY년 MM월 DD일 형식으로 변환
 */
export function formatKoreanDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
}

/**
 * ISO String을 Date로 변환 (Safe)
 */
export function parseISOSafe(isoString: string): Date | null {
    try {
        const date = new Date(isoString);
        return isNaN(date.getTime()) ? null : date;
    } catch {
        return null;
    }
}
