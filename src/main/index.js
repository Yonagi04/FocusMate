import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: 'FocusMate',
    width: 400,
    height: 550,
    resizable: false,
    show: false,
    autoHideMenuBar: true,
    icon: icon,
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
}

import Store from 'electron-store'
import { writeFile } from 'fs/promises'
import { homedir } from 'os'

const store = new Store({ name: 'pomodoro-settings' })
const noteStore = new Store({ name: 'pomodoro-notes' })

ipcMain.handle('get-settings', (event, key) => {
  return store.get(key)
})

ipcMain.handle('set-settings', (event, key, value) => {
  return store.set(key, value)
})

// 笔记相关API
ipcMain.handle('note-load', async () => {
  try {
    return noteStore.get('content', '')
  } catch (error) {
    console.error('加载笔记失败:', error)
    return ''
  }
})

ipcMain.handle('note-save', async (event, content) => {
  try {
    noteStore.set('content', content)
    noteStore.set('lastModified', new Date().toISOString())
    return true
  } catch (error) {
    console.error('保存笔记失败:', error)
    return false
  }
})

ipcMain.handle('note-export', async (event, content) => {
  try {
    // 获取下载文件夹路径
    const downloadPath = join(homedir(), 'Downloads')
    
    // 生成文件名
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
    const filename = `笔记_${timestamp}.txt`
    const filePath = join(downloadPath, filename)
    
    // 写入文件
    await writeFile(filePath, content, 'utf8')
    
    // 打开下载文件夹
    shell.openPath(downloadPath)
    
    return { success: true, filePath }
  } catch (error) {
    console.error('导出笔记失败:', error)
    return { success: false, error: error.message }
  }
})

// Markdown编辑器相关API
let markdownWindow = null

ipcMain.handle('markdown-open-editor', async (event, content) => {
  try {
    console.log('开始创建Markdown编辑器窗口，内容长度:', content ? content.length : 0)
    
    // 如果已经存在Markdown窗口，先关闭并清理
    if (markdownWindow && !markdownWindow.isDestroyed()) {
      console.log('关闭已存在的Markdown窗口')
      try {
        markdownWindow.removeAllListeners()
        markdownWindow.close()
      } catch (error) {
        console.error('关闭旧窗口失败:', error)
      }
      markdownWindow = null
    }
    
    // 确保旧窗口引用已清理
    if (markdownWindow) {
      console.log('等待旧窗口完全关闭...')
      return { success: false, error: '旧窗口仍在关闭中，请稍后重试' }
    }
    
    // 创建新的Markdown编辑器窗口
    markdownWindow = new BrowserWindow({
      title: 'Markdown编辑器 - FocusMate',
      width: 1000,
      height: 700,
      resizable: true,
      show: false,
      autoHideMenuBar: true,
      icon: icon,
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false,
        nodeIntegration: false,
        contextIsolation: true
      }
    })
    
    console.log('Markdown窗口创建成功，开始加载页面')
    
    try {
      // 加载Markdown编辑器页面
      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        const url = `${process.env['ELECTRON_RENDERER_URL']}/#/markdown`
        console.log('开发模式，加载URL:', url)
        await markdownWindow.loadURL(url)
      } else {
        const filePath = join(__dirname, '../renderer/index.html')
        console.log('生产模式，加载文件:', filePath)
        await markdownWindow.loadFile(filePath)
        // 等待页面加载完成后再设置hash
        markdownWindow.webContents.once('did-finish-load', () => {
          console.log('页面加载完成，设置hash为markdown')
          if (markdownWindow && !markdownWindow.isDestroyed()) {
            markdownWindow.webContents.executeJavaScript(`window.location.hash = 'markdown'`)
          }
        })
      }
    } catch (error) {
      console.error('加载页面失败:', error)
      // 清理失败的窗口
      if (markdownWindow && !markdownWindow.isDestroyed()) {
        markdownWindow.close()
      }
      markdownWindow = null
      throw error
    }
    
    // 窗口准备好后显示
    markdownWindow.once('ready-to-show', () => {
      console.log('窗口准备显示')
      if (markdownWindow && !markdownWindow.isDestroyed()) {
        markdownWindow.show()
        console.log('Markdown窗口已显示，准备发送内容:', content ? content.length : 0)
        
        // 等待页面完全加载后再发送内容
        markdownWindow.webContents.once('did-finish-load', () => {
          console.log('页面加载完成，发送Markdown内容')
          if (markdownWindow && !markdownWindow.isDestroyed()) {
            markdownWindow.webContents.send('markdown-content-loaded', content)
          }
        })
      }
    })
    
    // 添加错误处理
    markdownWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
      console.error('页面加载失败:', { errorCode, errorDescription, validatedURL })
    })
    
    // 添加控制台消息监听
    markdownWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
      console.log(`[Markdown窗口] ${level}: ${message} (${sourceId}:${line})`)
    })
    
    // 窗口关闭时清理引用
    markdownWindow.on('closed', () => {
      console.log('Markdown窗口已关闭')
      markdownWindow = null
    })
    
    // 添加窗口销毁事件监听
    markdownWindow.on('destroyed', () => {
      console.log('Markdown窗口已销毁')
      markdownWindow = null
    })
    
    // 添加页面加载失败处理
    markdownWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
      console.error('页面加载失败:', { errorCode, errorDescription, validatedURL })
      // 如果页面加载失败，清理窗口引用
      if (markdownWindow && !markdownWindow.isDestroyed()) {
        markdownWindow.close()
      }
      markdownWindow = null
    })
    
    return { success: true }
  } catch (error) {
    console.error('打开Markdown编辑器失败:', error)
    return { success: false, error: error.message }
  }
})

ipcMain.handle('markdown-save', async (event, content) => {
  try {
    noteStore.set('content', content)
    noteStore.set('lastModified', new Date().toISOString())
    return { success: true }
  } catch (error) {
    console.error('保存Markdown内容失败:', error)
    return { success: false, error: error.message }
  }
})

ipcMain.handle('markdown-export', async (event, content) => {
  try {
    // 获取下载文件夹路径
    const downloadPath = join(homedir(), 'Downloads')
    
    // 生成文件名
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
    const filename = `笔记_${timestamp}.md`
    const filePath = join(downloadPath, filename)
    
    // 写入文件
    await writeFile(filePath, content, 'utf8')
    
    // 打开下载文件夹
    shell.openPath(downloadPath)
    
    return { success: true, filePath }
  } catch (error) {
    console.error('导出Markdown失败:', error)
    return { success: false, error: error.message }
  }
})

// 关闭窗口
ipcMain.handle('close-window', (event) => {
  try {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win && !win.isDestroyed()) {
      console.log('关闭窗口:', win.getTitle())
      win.close()
      return true
    } else {
      console.log('窗口不存在或已销毁')
      return false
    }
  } catch (error) {
    console.error('关闭窗口失败:', error)
    return false
  }
})

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

  createWindow()

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
