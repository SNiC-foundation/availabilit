export const API_BASE_URL = 'http://localhost:3001/api';

export function apiUrl(endpoint: string): string {
    return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
}

export function staticUrl(path: string): string {
    return `${API_BASE_URL}/static${path.startsWith('/') ? path : '/' + path}`;
}

export const config = {
    api: {
        baseUrl: API_BASE_URL,
    },
};