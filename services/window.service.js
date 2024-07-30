const electron = require("electron");
const { BrowserWindow } = electron;
const path = require("path");

const windowService = {
  createTrayWindow() {
    let trayWindow;
    trayWindow = new BrowserWindow({
      width: 400,
      height: 300,
      show: false,
      frame: false,
      resizable: false,
      fullscreenable: false,
      transparent: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        preload: path.join(__dirname, "../preload.js"),
      },
    });
    trayWindow.loadFile(path.join(__dirname, "../index.html"));

    // Hide the window when it loses focus
    trayWindow.on("blur", () => {
      if (!trayWindow.webContents.isDevToolsOpened()) {
        trayWindow.hide();
      }
    });
    return trayWindow;
  },
};

module.exports = windowService;
