const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const log = require('electron-log');
const {autoUpdater} = require('electron-updater');
const path = require('path');
const url = require('url');

log.transports.file.file = require('os').homedir() + '/Nexus-Launcher-log.txt';
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({width: 1024, minWidth: 1024, height: 600, minHeight: 600, show: false, autoHideMenuBar: true, frame: false, icon:path.join(__dirname,'YourIcon.ico')});
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  if (require('electron-is-dev')) mainWindow.webContents.openDevTools();
  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.once('closed', () => mainWindow = null);
}

app.on('ready', createWindow);
app.on('window-all-closed', () => app.quit());

ipcMain.on('open-directory-dialog', function (event, response) {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }, function (files) {
    if (files) event.sender.send(response, files[0])
  });
});

autoUpdater.on('update-downloaded', (info) => {
  autoUpdater.quitAndInstall();  
});

autoUpdater.on('download-progress', (progress) => {
  mainWindow.webContents.send('download-progress', progress);
})

autoUpdater.on('update-available', info => {
  mainWindow.webContents.send('downloading-update', 'Downloading version ' + info.version);
})

app.on('ready', function()  {
  autoUpdater.checkForUpdates();
});

function checkAndUpdateRequiredJSON() {
  const remoteJSONUrl = "http://swgnexus.ddns.net/swg/launcher/required.json"; 
  const localJSONPath = path.join(__dirname, 'app');

  // Download the latest remote required.json
  request({ url: remoteJSONUrl, json: true }, (err, response, remoteJSON) => {
      if (err) {
          console.error("Failed to download required.json:", err);
          return;
      }

      // Read the local required.json
      fs.readFile(localJSONPath, 'utf8', (err, localJSONData) => {
          if (err) {
              console.error("Failed to read local required.json:", err);
              return;
          }

          const localJSON = JSON.parse(localJSONData);

          // Compare the local and remote required.json
          if (JSON.stringify(localJSON) !== JSON.stringify(remoteJSON)) {
              console.log("New update detected. Updating files...");

              // Update the local required.json
              fs.writeFile(localJSONPath, JSON.stringify(remoteJSON, null, 2), (err) => {
                  if (err) {
                      console.error("Failed to update local required.json:", err);
                      return;
                  }

                  // Trigger the install/update process
                  module.exports.install(swgPath, nexusPath, mods, fullScan);
              });
          } else {
              console.log("No updates found.");
          }
      });
  });
}

