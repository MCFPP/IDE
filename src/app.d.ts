export { };

declare global {
    interface Window {
        API: {
            request: {
                userOverrides: () => Promise<any>,
                explorerContents: () => Promise<TreeEntry[] | null>,
            },
            send: {
                removeFile: (filepath: string) => void,
            },
            separator: string,
        };
    }
}
