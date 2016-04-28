// Initial Variables
var menubar = require('menubar');
var Menu = require('menu');
var ipc = require('electron').ipcMain;
var globalShortcut = require('global-shortcut');

// The Window is set to nothing. Clean Slate.
var mb = menubar({
  dir: __dirname,
  width: 450,
  height: 450,
  icon: __dirname + '/assets/favicon.png',
  preloadWindow: true
});
// When the menubar is ready to run.
mb.on('ready', function ready() {
  console.log('Ready!');
});

mb.on('show', function () {
  mb.window.webContents.send('show');
});

mb.app.on('activate', function () {
  mb.showWindow();
});

ipc.on('abort', function () {
  mb.hideWindow();
});

var template = [
  {
    label: 'MenuMeme',
    submenu: [
      {
        label: 'Copy',
        accelerator: 'CommandOrCtrl+C',
        selector: 'copy:'
      },
      {
        label: 'Paste',
        accelerator: 'CommandOrCtrl+V',
        selector: 'paste:'
      },
      {
        label: 'Select All',
        accelerator: 'CommandOrCtrl+A',
        selector: 'selectAll:'
      },
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function (item, focusedWindow) { if (focusedWindow) focusedWindow.reload() }
      },
      {
        label: 'Preferance',
        accelerator: 'CommandOrCtrl+,',
        click: function () { mb.window.webContents.send('open-preference') }
      },
      {
        label: 'Quit App',
        accelerator: 'CommandOrCtrl+Q',
        selector: 'terminate:'
      },
      {
        label: 'Toggle DevTools',
        accelerator: 'Alt+CommandOrCtrl+I',
        click: function () { mb.window.toggleDevTools() }
      }
    ]
  }
];

mb.on('ready', function ready () {
  // Build default menu for text editing and devtools. (gone since electron 0.25.2)
  var menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});
// This code is not needed, as this is a menubar application.
// app.on('ready', function() {
//  mainWindow = new BrowserWindow({
//    height: 600,
//    width: 800
//  });
//  mainWindow.loadUrl('file://' + __dirname + './index.html')
// });
