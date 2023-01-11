const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("API", {
    request: {
        userOverrides: function () {
            return ipcRenderer.invoke("request::userOverrides");
        },
    },
});
