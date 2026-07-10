// The site is fully static: images that used to be served from the backend
// static server are now bundled into the app. `staticUrl` maps a stored
// filename (e.g. "partners/logo.svg" or "/speakers/photo.jpg") to the hashed
// asset URL Vite produces at build time.
const assets = {
    ...import.meta.glob('./images/speakers/*', { eager: true, query: '?url', import: 'default' }),
    ...import.meta.glob('./images/partners/*', { eager: true, query: '?url', import: 'default' }),
} as Record<string, string>;

export function staticUrl(path: string): string {
    const clean = path.replace(/^\/+/, '');
    return assets[`./images/${clean}`] ?? '';
}
