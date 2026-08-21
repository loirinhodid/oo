const { app, BrowserWindow, ipcMain, shell } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    frame: false,
    backgroundColor: '#090b10',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, '../renderer/index.html'));
}

ipcMain.handle('window:minimize', () => win?.minimize());
ipcMain.handle('window:maximize', () => {
  if (!win) return false;
  win.isMaximized() ? win.unmaximize() : win.maximize();
  return win.isMaximized();
});
ipcMain.handle('window:close', () => win?.close());
ipcMain.handle('game:launch', async (_event, executable) => {
  if (!executable || typeof executable !== 'string') throw new Error('Executável inválido');
  spawn(executable, [], { detached: true, stdio: 'ignore' }).unref();
  return true;
});
ipcMain.handle('game:folder', async (_event, executable) => {
  if (!executable || typeof executable !== 'string') throw new Error('Caminho inválido');
  await shell.showItemInFolder(executable);
  return true;
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
