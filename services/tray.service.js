const { app, Tray, Menu } = require("electron");
const path = require("path");

const trayService = {
  createTray(trayWindow) {
    let tray;
    tray = new Tray(path.join(__dirname, "../copy.png")); // Ensure you have a tray icon image
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Quit",
        click: () => {
          app.quit();
        },
      },
    ]);

    tray.setToolTip("Electron Tray App");
    tray.setContextMenu(contextMenu);

    tray.on("click", (event, bounds) => {
      // Click event bounds
      const { x, y } = bounds;

      // Window size
      const { width, height } = trayWindow.getBounds();

      // Calculate window position
      const xPos = Math.round(x - width / 2);
      const yPos = Math.round(y - height);

      // Position and show the window
      trayWindow.setPosition(xPos, yPos, false);
      trayWindow.isVisible() ? trayWindow.hide() : trayWindow.show();
    });

    return tray;
  },
};

module.exports = trayService;
