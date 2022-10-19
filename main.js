'use strict';

// Modules
const {app, BrowserWindow} = require('electron');
const windowStateKeeper = require('electron-window-state');

let mainWindow;

console.log('checking ready: ' + app.isReady());

// Create a new BrowserWindow when `app` is ready
function createWindow() {

	let mainWindowState = windowStateKeeper({
		defaultWidth: 800,
		defaultHeight: 800
	 });

	console.log("creating windows...");
	mainWindow = new BrowserWindow({

		width: mainWindowState.width, height: mainWindowState.height,
		x: mainWindowState.x, y: mainWindowState.y,
		//frame: false,
		webPreferences: {
			// --- !! IMPORTANT !! ---
			// Disable 'contextIsolation' to allow 'nodeIntegration'
			// 'contextIsolation' defaults to "true" as from Electron v12
			contextIsolation: false,
			nodeIntegration: true,
			//show: false
			backgroundColor: '#00105a'
		}
	});

	mainWindowState.manage(mainWindow);

	// Load index.html into the new BrowserWindow
	mainWindow.loadFile('index.html');

	mainWindow.once('ready-to-show', mainWindow.show);

	// Open DevTools - Remove for PRODUCTION!
	//mainWindow.webContents.openDevTools();

	// let wc = mainWindow.webContents
	// console.log(wc);

	// wc.on('before-input-event', (e, input) => {
	// 	console.log(`${input.key} : ${input.type}`)
	// });

	// Listen for window being closed
	mainWindow.on('closed',  () => {
		//debugger
		mainWindow = null
	});
}

// Electron `app` is ready
app.on('ready', () => {
	console.log('app is ready? ' + app.isReady());

	// console.log(app.getPath('home'));
	// console.log(app.getPath('appData'));
	// console.log(app.getPath('userData'));
	// console.log(app.getPath('desktop'));
	// console.log(app.getPath('documents'));
	// console.log(app.getPath('downloads'));

	createWindow()
});

//
// Quit when all windows are closed
app.on('window-all-closed', () => {
	// check platform to avoid quitting (MacOS = Darwin)
	if (process.platform !== 'darwin') app.quit();
	// app.quit();
});

// MacOS only
// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
	console.log('activate triggered');
	if (mainWindow === null)
		createWindow();
});

app.on('before-quit', e => {
	console.log('app is quitting...');
	// check whether the work needs to be saved before quitting
	// console.log('prevent app from quitting');
	// e.preventDefault();
});

// app.on('browser-window-blur', () => {
// 	console.log('app unfocused')
// });

// app.on('browser-window-focus', () => {
// 	console.log('app focused')
// });
