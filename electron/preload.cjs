const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('rover', {
  launchGame: (executable) => ipcRenderer.invoke('game:launch', executable),
  openGameFolder: (executable) => ipcRenderer.invoke('game:folder', executable),
  minimize: () => ipcRenderer.invoke('window:minimize'),
  maximize: () => ipcRenderer.invoke('window:maximize'),
  close: () => ipcRenderer.invoke('window:close')
});
