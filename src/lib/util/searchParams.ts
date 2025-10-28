/**
 * Get a URL parameter from the current page's query string
 * @param paramName - The name of the parameter to retrieve
 * @param defaultValue - Optional default value if parameter is not found
 * @returns The parameter value as a string, or default value if not found
 */
export function getUrlParam(paramName: string, defaultValue: string = ''): string {
    if (typeof window === 'undefined') return defaultValue; // SSR safety
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName) || defaultValue;
}

/**
 * Get a URL parameter as an integer
 * @param paramName - The name of the parameter to retrieve
 * @param defaultValue - Optional default value if parameter is not found or invalid
 * @returns The parameter value as a number, or default value if not found/invalid
 */
export function getUrlParamInt(paramName: string, defaultValue: number = 0): number {
    const value = getUrlParam(paramName);
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Get all URL parameters as an object
 * @returns An object with all URL parameters as key-value pairs
 */
export function getAllUrlParams(): Record<string, string> {
    if (typeof window === 'undefined') return {};
    const urlParams = new URLSearchParams(window.location.search);
    const params: Record<string, string> = {};
    
    for (const [key, value] of urlParams.entries()) {
        params[key] = value;
    }
    
    return params;
}
