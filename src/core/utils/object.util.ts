export function isObject(item: unknown): item is Record<string, unknown> {
    return !!item && typeof item === 'object' && !Array.isArray(item);
}

export function deepMerge<T extends Record<string, unknown>>(
    target: T,
    source: Partial<T>
): T {
    const output = { ...target };

    for (const key in source) {
        const sourceValue = source[key];
        const targetValue = output[key];

        if (isObject(sourceValue)) {
            if (isObject(targetValue)) {
                output[key] = deepMerge(
                    targetValue as Record<string, unknown>,
                    sourceValue as Record<string, unknown>
                ) as T[Extract<keyof T, string>];
            } else {
                output[key] = sourceValue as T[Extract<keyof T, string>];
            }
        } else if (sourceValue !== undefined) {
            output[key] = sourceValue as T[Extract<keyof T, string>];
        }
    }

    return output;
}
