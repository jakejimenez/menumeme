// Initial Variables
var menubar = require('menubar');

// The Window is set to nothing. Clean Slate.
var mb = menubar()
mb.on('ready', function ready() {
  console.log('Ready!')
})
// This code is not needed, as this is a menubar application.
// app.on('ready', function() {
//  mainWindow = new BrowserWindow({
//    height: 600,
//    width: 800
//  });
//  mainWindow.loadUrl('file://' + __dirname + './index.html')
// });
