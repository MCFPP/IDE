const { contextBridge, ipcRenderer } = require("electron");
const path = require("path");

contextBridge.exposeInMainWorld("API", {
    request: {
        userOverrides: function () {
            return ipcRenderer.invoke("request::userOverrides");
        },
        explorerContents: function () {
            return ipcRenderer.invoke("request::explorerContents");
        },
    },
    send: {
        removeFile: function (filepath) {
            ipcRenderer.send("send::rmFile", filepath);
        },
        move: function (source, destination) {
            ipcRenderer.send("send::move", source, destination);
        },
        createFile: function (filepath) {
            ipcRenderer.send("send::createFile", filepath);
        },
        createDirectory: function (filepath) {
            ipcRenderer.send("send::mkDir", filepath);
        },
    },
    separator: path.sep,
});
