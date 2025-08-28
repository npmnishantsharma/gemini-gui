const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    on: (channel, callback) => {
        ipcRenderer.on(channel, callback);
    },
    send: (channel, args) => {
        ipcRenderer.send(channel, args);
    },
    // Basic file system APIs
    openFolder: () => ipcRenderer.invoke('open-folder'),
    readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
    readDirectory: (dirPath) => ipcRenderer.invoke('read-directory', dirPath),
    getFileStats: (filePath) => ipcRenderer.invoke('get-file-stats', filePath),
    
    // Extended file system APIs
    writeFile: (filePath, content) => ipcRenderer.invoke('write-file', filePath, content),
    createDirectory: (dirPath) => ipcRenderer.invoke('create-directory', dirPath),
    deleteFile: (filePath) => ipcRenderer.invoke('delete-file', filePath),
    deleteDirectory: (dirPath) => ipcRenderer.invoke('delete-directory', dirPath),
    fileExists: (filePath) => ipcRenderer.invoke('file-exists', filePath),
    getFileExtension: (filePath) => ipcRenderer.invoke('get-file-extension', filePath),
    getFileName: (filePath) => ipcRenderer.invoke('get-file-name', filePath),
    getDirectoryName: (filePath) => ipcRenderer.invoke('get-directory-name', filePath),
    joinPaths: (...paths) => ipcRenderer.invoke('join-paths', ...paths)
});