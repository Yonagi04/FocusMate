export function showNotification(title, body) {
  if (window.Notification && Notification.permission === 'granted') {
    new Notification(title, { body, silent: !SYS_NOTIFY.value, icon: new URL('../assets/icon.png', import.meta.url).href })
  } else if (window.Notification && Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      new Notification(title, { body, silent: !SYS_NOTIFY.value, icon: new URL('../assets/icon.png', import.meta.url).href })
    }
    })
  }
}