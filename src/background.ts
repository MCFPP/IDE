"use strict";

import { app, protocol, BrowserWindow, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
import settings from "electron-settings";
import path from "path";
import fs from "fs";
const isDevelopment = process.env.NODE_ENV !== "production";
let currentProject: string | null = null;

export interface TreeEntry {
    name: string,
    content: TreeEntry[] | null,
}

function walkTree(dirPath: string, isDeep = true): TreeEntry[] {
    const entries: TreeEntry[] = [];

    for (const entry of fs.readdirSync(dirPath)) {
        const stats = fs.statSync(path.join(dirPath, entry));
        if (stats.isFile()) {
            entries.push({
                name: entry,
                content: null,
            });
        }
        if (stats.isDirectory()) {
            entries.push({
                name: entry,
                content: isDeep ? walkTree(path.join(dirPath, entry)) : [],
            });
        }
    }

    return entries;
}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
    // Create the browser window, restore previous dimensions and position if stored.
    const window = new BrowserWindow({
        width: Number(settings.getSync("window.width") || 720),
        height: Number(settings.getSync("window.height") || 360),
        x: Number(settings.getSync("window.x")),
        y: Number(settings.getSync("window.y")),
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, "..", "public", "preload.js"),
        },
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await window.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
        if (!process.env.IS_TEST) window.webContents.openDevTools();
    } else {
        createProtocol("app");
        // Load the index.html when not in development
        window.loadURL("app://./index.html");
    }

    window.on("close", () => settings.setSync("window", {
        // Store window dimensions and position on close.
        width: window.getBounds().width,
        height: window.getBounds().height,
        x: window.getBounds().x,
        y: window.getBounds().y,
    }));
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS3_DEVTOOLS);
        } catch (e: any) {
            console.error("Vue Devtools failed to install:", e.toString());
        }
    }
    createWindow();

    ipcMain.handle("request::userOverrides", () => {
        let userOverrides = settings.getSync("userOverrides");
        if (!userOverrides) {
            settings.setSync("userOverrides", {});
            userOverrides = {};
        }
        return userOverrides;
    });

    ipcMain.handle("request::explorerContents", () => {
        currentProject = "/home/admin/Desktop/test";
        if (!currentProject) return null;
        return walkTree(path.join(currentProject, "src"));
    });

    ipcMain.on("send::rmFile", (_, filepath: string) => {
        const absolutePath = path.join(currentProject as string, "src", filepath);
        fs.rmSync(absolutePath, { recursive: true });
    });

    ipcMain.on("send::mkDir", (_, filepath: string) => {
        fs.mkdirSync(path.join(currentProject as string, "src", filepath), { recursive: true });
    });

    ipcMain.on("send::createFile", (_, filepath: string) => {
        fs.writeFileSync(path.join(currentProject as string, "src", filepath), "\n", { encoding: "utf-8" });
    });

    ipcMain.on("send::move", (_, source: string, destination: string) => {
        fs.renameSync(path.join(currentProject as string, "src", source), path.join(currentProject as string, "src", destination));
    });
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === "win32") {
        process.on("message", (data) => {
            if (data === "graceful-exit") {
                app.quit();
            }
        });
    } else {
        process.on("SIGTERM", () => {
            app.quit();
        });
    }
}
