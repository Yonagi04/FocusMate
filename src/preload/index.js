import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('settingsAPI', {
      get: (key) => ipcRenderer.invoke('get-settings', key),
      set: (key, value) => ipcRenderer.invoke('set-settings', key, value)
    })
    contextBridge.exposeInMainWorld('noteAPI', {
      load: () => ipcRenderer.invoke('note-load'),
      save: (content) => ipcRenderer.invoke('note-save', content),
      export: (content) => ipcRenderer.invoke('note-export', content)
    })
    
    contextBridge.exposeInMainWorld('markdownAPI', {
      openEditor: (content) => ipcRenderer.invoke('markdown-open-editor', content),
      save: (content) => ipcRenderer.invoke('markdown-save', content),
      export: (content) => ipcRenderer.invoke('markdown-export', content)
    })
    
    contextBridge.exposeInMainWorld('electronAPI', {
      ipcRenderer: {
        on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
        removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
      },
      closeWindow: () => ipcRenderer.invoke('close-window')
    })
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
