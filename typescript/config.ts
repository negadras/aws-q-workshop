export const config = {
    basePath: process.env.WORKSHOP_MODE === 'false' ? '' : '/proxy/8090',
    getFullPath: (path: string): string => {
        const base = process.env.WORKSHOP_MODE === 'false' ? '' : '/proxy/8090';
        // Ensure we don't double up on slashes
        return `${base}${path.startsWith('/') ? path : `/${path}`}`;
    }
};
