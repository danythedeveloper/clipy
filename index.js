// This will be executed by our Electron runtime inside our terminal.

//Common modules
const electron = require("electron");
const path = require("path");

//IPC System is being accessed through electron
const { app, ipcMain, Tray, clipboard } = electron;

//Services
const windowService = require("./services/window.service");
const trayService = require("./services/tray.service");
const clipBoardService = require("./services/clipboard.service");

let trayWindow;
let tray;
let lastClipboardText = clipboard.readText();

function initApp() {
  trayWindow = windowService.createTrayWindow();
  tray = trayService.createTray(trayWindow);
}

app.on("ready", initApp);

ipcMain.on("clips:copy", (event, value) => {
  //Write the passed text into the clipboard
  clipboard.writeText(value);
});

function handleNewClip(clipText) {
  //Sometimes the user may coppy an image producing an empty clipText
  if (clipText) {
    clipBoardService.addClip(clipText);
    const allClips = clipBoardService.getClips();
    trayWindow.webContents.send("clips:get", allClips);
  }
}

setInterval(() => {
  const currentClipboardText = clipboard.readText();
  if (currentClipboardText) {
    if (currentClipboardText !== lastClipboardText) {
      //Sent the clip text to the IPC
      handleNewClip(currentClipboardText);
      lastClipboardText = currentClipboardText;
    }
  }
}, 1000);
