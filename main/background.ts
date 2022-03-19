import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 300,
    height: 150,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    useContentSize: true,
  });
  mainWindow.setSize(300, 150);
  mainWindow.setResizable(false);

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

  ipcMain.on("resizeWindow", (event, arg) => {
    mainWindow.setResizable(true);
    mainWindow.setSize(arg[0], arg[1]);
    mainWindow.setResizable(false);
  });

  ipcMain.on("closeWindow", () => {
    mainWindow.close();
  });
})();

app.on("window-all-closed", () => {
  app.quit();
});
