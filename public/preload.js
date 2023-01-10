const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("API", {
    // Later to be accessed from window.api.*
});
