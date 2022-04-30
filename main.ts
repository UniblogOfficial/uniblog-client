/* const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadFile('index.html');
}

app.on('ready', createWindow);

let link: any;

// This will catch clicks on links such as <a href="foobar://abc=1">open in foobar</a>
app.on('open-url', (event: any, data: any) => {
  event.preventDefault();
  link = data;
});

app.setAsDefaultProtocolClient('foobar');

// Export so you can access it from the renderer thread
export const getLink = () => link; */
export {};
