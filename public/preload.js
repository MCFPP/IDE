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
    },
    separator: path.sep,
});
