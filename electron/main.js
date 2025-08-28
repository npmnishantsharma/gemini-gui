import { app, BrowserWindow, ipcMain, dialog } from "electron";
import serve from "electron-serve";
import path from "path";
import fs from "fs";
import { promisify } from "util";



const __dirname = path.resolve();
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const unlink = promisify(fs.unlink);
const rmdir = promisify(fs.rmdir);

const appServe = app.isPackaged ? serve({
  directory: path.join(__dirname, "../out")
}) : null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "electron", "preload.js"),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Show window after it's ready to prevent visual flash
  win.once('ready-to-show', () => {
    win.show();
  });

  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL("app://-");
    });
  } else {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
    win.webContents.on("did-fail-load", (e, code, desc) => {
      console.log('Failed to load:', code, desc);
      win.webContents.reloadIgnoringCache();
    });
  }
}

// IPC handlers for file system operations
ipcMain.handle('open-folder', async () => {
  try {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
      title: 'Select Project Folder'
    });
    
    if (!result.canceled && result.filePaths.length > 0) {
      return result.filePaths[0];
    }
    return null;
  } catch (error) {
    console.error('Error in open-folder handler:', error);
    throw error;
  }
});

ipcMain.handle('read-directory', async (event, dirPath) => {
  try {
    console.log('Reading directory (recursive):', dirPath);

    const readDirectoryRecursive = async (currentPath) => {
      const items = await readdir(currentPath);
      const results = [];

      for (const item of items) {
        const itemPath = path.join(currentPath, item);
        const stats = await stat(itemPath);
        const entry = {
          name: item,
          path: itemPath,
          type: stats.isDirectory() ? 'folder' : 'file',
          size: stats.size,
          modified: stats.mtime
        };
        results.push(entry);

        if (stats.isDirectory()) {
          const children = await readDirectoryRecursive(itemPath);
          results.push(...children);
        }
      }

      return results;
    };

    const fileStats = await readDirectoryRecursive(dirPath);
    console.log('Total items (recursive):', fileStats.length);
    return fileStats;
  } catch (error) {
    console.error('Error reading directory:', error);
    throw error;
  }
});

ipcMain.handle('read-file', async (event, filePath) => {
  try {
    console.log('Reading file:', filePath);
    const content = await readFile(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
});

ipcMain.handle('get-file-stats', async (event, filePath) => {
  try {
    console.log('Getting file stats:', filePath);
    const stats = await stat(filePath);
    return {
      size: stats.size,
      modified: stats.mtime,
      isDirectory: stats.isDirectory(),
      isFile: stats.isFile()
    };
  } catch (error) {
    console.error('Error getting file stats:', error);
    throw error;
  }
});

// Additional IPC handlers for extended file system operations
ipcMain.handle('write-file', async (event, filePath, content) => {
  try {
    console.log('Writing file:', filePath);
    await writeFile(filePath, content, 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing file:', error);
    throw error;
  }
});

ipcMain.handle('create-directory', async (event, dirPath) => {
  try {
    console.log('Creating directory:', dirPath);
    await mkdir(dirPath, { recursive: true });
    return true;
  } catch (error) {
    console.error('Error creating directory:', error);
    throw error;
  }
});

ipcMain.handle('delete-file', async (event, filePath) => {
  try {
    console.log('Deleting file:', filePath);
    await unlink(filePath);
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
});

ipcMain.handle('delete-directory', async (event, dirPath) => {
  try {
    console.log('Deleting directory:', dirPath);
    await rmdir(dirPath, { recursive: true });
    return true;
  } catch (error) {
    console.error('Error deleting directory:', error);
    throw error;
  }
});

ipcMain.handle('file-exists', async (event, filePath) => {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
});

ipcMain.handle('get-file-extension', async (event, filePath) => {
  return path.extname(filePath);
});

ipcMain.handle('get-file-name', async (event, filePath) => {
  return path.basename(filePath);
});

ipcMain.handle('get-directory-name', async (event, filePath) => {
  return path.dirname(filePath);
});

ipcMain.handle('join-paths', async (event, ...paths) => {
  return path.join(...paths);
});

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});