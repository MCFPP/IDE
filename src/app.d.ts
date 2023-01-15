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
                move: (source: string, destination: string) => void,
                createFile: (filepath: string) => void,
                createDirectory: (filepath: string) => void,
            },
            separator: string,
        };
    }
}
