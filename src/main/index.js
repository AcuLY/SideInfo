import { app, shell, BrowserWindow, ipcMain, Tray, Menu, nativeImage } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

const path = require('path')
const { screen } = require('electron')
let tray = null

let displayNumber = 4;

async function fetchBangumiCalendar() {
  const calendarResponse = await fetch('https://api.bgm.tv/calendar')
  const collectionResponse = await fetch('https://api.bgm.tv/v0/users/lucay126/collections?subject_type=2&type=3&limit=30&offset=0')
  const [calendarData, collectionData] = await Promise.all([
    (await calendarResponse).json(),
    (await collectionResponse).json()
  ])

  return [calendarData, collectionData]
}

async function fetchWeatherForecast() {
  const apiKey = '9bdf74f35fe04a18bc082956240911'
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=31.355,120.384&days=3`
  const response = await fetch(url)
  const data = await response.json()
  return data
}

function createWindow() {
  // 选择显示器
  const displays = screen.getAllDisplays()
  const selectedDisplay = displays[displayNumber - 1]
  const { width, height } = selectedDisplay.bounds
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    x: selectedDisplay.bounds.x,
    y: selectedDisplay.bounds.y,
    width: width,
    height: height,
    frame: false,
    alwaysOnTop: true,
    fullscreen: true,
    show: false,
    autoHideMenuBar: true,
    skipTaskbar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })


  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // mainWindow.webContents.openDevTools({ mode: 'detach' })

  ipcMain.handle('fetchBangumiCalendar', async () => {
    return await fetchBangumiCalendar()
  })

  ipcMain.handle('fetchWeatherForecast', async () => {
    return await fetchWeatherForecast()
  })
}

function createTray() {
  const iconPath = path.join(__dirname, 'tray-icon.png')
  tray = new Tray(nativeImage.createFromPath(iconPath))

  // 获取所有显示器
  const displays = screen.getAllDisplays()

  // 创建显示器选择菜单
  const displayMenu = displays.map((display, index) => ({
    label: `Display ${index + 1}`,
    type: 'radio',
    checked: (displayNumber === index + 1),
    click: () => {
      displayNumber = index + 1
      mainWindow.close()
      createWindow() // 切换显示器后重新创建窗口
    },
  }))

  const contextMenu = Menu.buildFromTemplate([
    ...displayMenu, // 显示器选择菜单
    {
      label: 'Quit',
      click: () => {
        app.quit()
      },
    },
  ])

  tray.setToolTip('SideView')
  tray.setContextMenu(contextMenu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()
  createTray()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
