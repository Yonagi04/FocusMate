<template>
  <div class="pomodoro-timer">
    <h2>
      <template v-if="!started">欢迎使用FocusMate</template>
      <template v-else>
        <template v-if="!running">已暂停</template>
        <template v-else-if="isWork">工作中，请专心工作哦~</template>
        <template v-else>休息中，放松一下吧~</template>
      </template>
    </h2>
    <h3>
      <template v-if="!started"></template>
      <template v-else>第 {{ round }} 轮 {{ isWork ? '工作' : '休息' }}</template>
    </h3>
    <div class="timer">{{ minutes }}:{{ seconds }}</div>
    <div class="actions">
      <transition name="button-fade" mode="out-in">
        <button
          v-if="!started || (!running && started)" 
          @click="startTimer"
          key="start"
          class="action-btn start-btn"
        >
          开始
        </button>
        <button
          v-else-if="running"
          @click="pauseTimer"
          key="pause"
          class="action-btn pause-btn"
        >
          暂停
        </button>
      </transition>
      <transition name="button-slide" mode="out-in">
        <button
          v-if="started" 
          @click="endTimer"
          key="end"
          class="action-btn end-btn"
        >
          结束
        </button>
      </transition>
    </div>
    <div class="bottom-btns">
      <div class="settings-btn" @click="showSettings = true" title="设置">
        <svg v-if="!isLight" t="1754227355950" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21685" width="32" height="32"><path d="M878.08 466.944l-129.3824-253.0816a98.8672 98.8672 0 0 0-88.064-53.8624H366.08c-36.864 0-70.656 20.48-87.6544 53.1456l-132.096 253.0816a98.8672 98.8672 0 0 0 0 91.5456l132.096 253.0816a98.8672 98.8672 0 0 0 87.6544 53.1456h294.5536c37.1712 0 71.168-20.7872 88.064-53.8624l129.3824-253.1328a98.8672 98.8672 0 0 0 0-90.0096z m-72.3968 372.3264a162.8672 162.8672 0 0 1-145.0496 88.7296H366.08a162.8672 162.8672 0 0 1-144.384-87.552l-132.096-253.0816a162.8672 162.8672 0 0 1 0-150.7328l132.096-253.1328a162.8672 162.8672 0 0 1 144.384-87.5008h294.5536c61.184 0 117.1968 34.304 145.0496 88.7296l129.3824 253.1328c23.808 46.592 23.808 101.7344 0 148.2752l-129.3824 253.1328z" fill="#bfbfbf" p-id="21686"></path><path d="M512 697.6a185.6 185.6 0 1 1 0-371.2 185.6 185.6 0 0 1 0 371.2z m0-64a121.6 121.6 0 1 0 0-243.2 121.6 121.6 0 0 0 0 243.2z" fill="#bfbfbf" p-id="21687"></path></svg>
        <svg v-else t="1754227355950" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21685" width="32" height="32"><path d="M878.08 466.944l-129.3824-253.0816a98.8672 98.8672 0 0 0-88.064-53.8624H366.08c-36.864 0-70.656 20.48-87.6544 53.1456l-132.096 253.0816a98.8672 98.8672 0 0 0 0 91.5456l132.096 253.0816a98.8672 98.8672 0 0 0 87.6544 53.1456h294.5536c37.1712 0 71.168-20.7872 88.064-53.8624l129.3824-253.1328a98.8672 98.8672 0 0 0 0-90.0096z m-72.3968 372.3264a162.8672 162.8672 0 0 1-145.0496 88.7296H366.08a162.8672 162.8672 0 0 1-144.384-87.552l-132.096-253.0816a162.8672 162.8672 0 0 1 0-150.7328l132.096-253.1328a162.8672 162.8672 0 0 1 144.384-87.5008h294.5536c61.184 0 117.1968 34.304 145.0496 88.7296l129.3824 253.1328c23.808 46.592 23.808 101.7344 0 148.2752l-129.3824 253.1328z" fill="#515151" p-id="21686"></path><path d="M512 697.6a185.6 185.6 0 1 1 0-371.2 185.6 185.6 0 0 1 0 371.2z m0-64a121.6 121.6 0 1 0 0-243.2 121.6 121.6 0 0 0 0 243.2z" fill="#515151" p-id="21687"></path></svg>
      </div>
    </div>
    <div class = "white-noise-btn" @click="showWhiteNoise = true" title="白噪音列表">
      <svg v-if="!isLight" t="1754709424697" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2538" width="35" height="35"><path d="M419.037 287.953h413.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H419.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM419.028 543.17h411.608c17.673 0 32-14.327 32-32s-14.327-32-32-32H419.028c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 735.802H419.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h413.124c17.673 0 32-14.327 32-32s-14.327-32-32-32z" fill="#bfbfbf" p-id="2539"></path><path d="M256.037 255.953m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#bfbfbf" p-id="2540"></path><path d="M256.037 510.787m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#bfbfbf" p-id="2541"></path><path d="M256.037 767.621m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#bfbfbf" p-id="2542"></path></svg>
      <svg v-else t="1754709424697" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2538" width="35" height="35"><path d="M419.037 287.953h413.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H419.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM419.028 543.17h411.608c17.673 0 32-14.327 32-32s-14.327-32-32-32H419.028c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 735.802H419.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h413.124c17.673 0 32-14.327 32-32s-14.327-32-32-32z" fill="#515151" p-id="2539"></path><path d="M256.037 255.953m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#515151" p-id="2540"></path><path d="M256.037 510.787m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#515151" p-id="2541"></path><path d="M256.037 767.621m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#515151" p-id="2542"></path></svg>
    </div>
    <transition name="menu-fade">
      <SettingsModal
        v-if="showSettings"
        :isLight="isLight"
        :work="WORK_DURATION / 60"
        :breakTime="BREAK_DURATION / 60"
        :longBreak="LONG_BREAK_DURATION / 60"
        :longBreakRound="LONG_BREAK_ROUND"
        :sysNotify="SYS_NOTIFY"
        :theme="THEME"
        @apply="onApplySettings"
        @cancel="closeSettings"
      />
    </transition>
    <transition name="menu-fade">
      <WhiteNoiseModal v-if="showWhiteNoise" :isLight="isLight" @close="closeWhiteNoise" />
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import WhiteNoiseModal from './modal/whiteNoiseModal/WhiteNoiseModal.vue'
import SettingsModal from './modal/SettingsModal/SettingsModal.vue'
import { showNotification } from '../utils/index.js'

async function getSetting(key, def) {
  if (window.settingsAPI) {
    const val = await window.settingsAPI.get(key)
    return val !== undefined && val !== null ? val : def
  }
  return def 
}

function setSetting(key, value) {
  if (!window.settingsAPI) return
  window.settingsAPI.set(key, value)
}

const Store = window.require ? window.require('electron-store') : null
const store = Store ? new Store({ name: 'pomodoro-settings' }) : null

const DEFAULT_WORK = 25 // 默认工作时长 25分钟
const DEFAULT_BREAK = 5 // 默认休息时长 5分钟
const DEFAULT_LONG_BREAK = 15 // 默认长休息时长 15分钟
const DEFAULT_LONG_BREAK_ROUND = 4 // 默认长休息轮数 4轮
const DEFAULT_SYS_NOTIFY = true // 默认系统通知音开启
const DEFAULT_THEME = 'dark' // 默认主题

const WORK_DURATION = ref(DEFAULT_WORK * 60)
const BREAK_DURATION = ref(DEFAULT_BREAK * 60)
const LONG_BREAK_DURATION = ref(DEFAULT_LONG_BREAK * 60)
const LONG_BREAK_ROUND = ref(DEFAULT_LONG_BREAK_ROUND)
const SYS_NOTIFY = ref(DEFAULT_SYS_NOTIFY)
const THEME = ref(DEFAULT_THEME)

const isWork = ref(true)
const timeLeft = ref(WORK_DURATION.value)
const running = ref(false)
const started = ref(false)
const round = ref(1)
let timer = null

const showSettings = ref(false)

const minutes = computed(() => String(Math.floor(timeLeft.value / 60)).padStart(2, '0'))
const seconds = computed(() => String(timeLeft.value % 60).padStart(2, '0'))

const isLight = ref(false)
const showWhiteNoise = ref(false)

let cleanupSystemThemeListener = null

onUnmounted(() => {
  if (cleanupSystemThemeListener) {
    cleanupSystemThemeListener()
  }
})

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function applyTheme(themeMode) {
  let targetTheme = themeMode

  if (targetTheme === 'system') {
    targetTheme = getSystemTheme()
  }
  if (targetTheme === 'light') {
    document.body.classList.add('light')
    document.body.classList.remove('el-theme-dark')
    isLight.value = true
  } else {
    document.body.classList.remove('light')
    document.body.classList.add('el-theme-dark')
    isLight.value = false
  }
}

function closeWhiteNoise() {
  showWhiteNoise.value = false
}

function startTimer() {
  if (running.value) return
  running.value = true
  started.value = true
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      pauseTimer()
      if (isWork.value) {
        showNotification('工作时间结束', '请休息一下，放松一下眼睛和大脑！')
      } else {
        showNotification('休息时间结束', '请继续工作，保持专注！')
      }
      switchMode()
    }
  }, 1000)
}

function pauseTimer() {
  running.value = false
  if (timer) {
    clearInterval(timer)  
    timer = null
  }
}

function resetTimer() {
  if (running.value) {
    // 弹窗提示
    if (confirm('当前计时器正在运行，是否要重置？')) {
      pauseTimer()
    } else {
      return
    }
  }
  pauseTimer()
  if (!isWork.value && round.value % LONG_BREAK_ROUND.value === 0) {
    timeLeft.value = LONG_BREAK_DURATION.value
  } else {
    timeLeft.value = isWork.value ? WORK_DURATION.value : BREAK_DURATION.value
  }
}

function endTimer() {
  if (running.value) {
    // 弹窗提示
    if (confirm('当前计时器正在运行，是否要结束？')) {
      pauseTimer()
    } else {
      return
    }
  }
  pauseTimer()
  // 回到开始之前的状态
  started.value = false
  running.value = false
  round.value = 1
  isWork.value = true
  timeLeft.value = WORK_DURATION.value
}

function switchMode() {
  isWork.value = !isWork.value
  if (!isWork.value && round.value % LONG_BREAK_ROUND.value === 0) {
    timeLeft.value = LONG_BREAK_DURATION.value
  } else {
    timeLeft.value = isWork.value ? WORK_DURATION.value : BREAK_DURATION.value
  }
  if (isWork.value) {
    round.value++
  }
}

function closeSettings() {
  showSettings.value = false
}

function onApplySettings(payload) {
  // 更新内存值
  WORK_DURATION.value = payload.work * 60
  BREAK_DURATION.value = payload.breakTime * 60
  LONG_BREAK_DURATION.value = payload.longBreak * 60
  LONG_BREAK_ROUND.value = payload.longBreakRound
  SYS_NOTIFY.value = payload.sysNotify
  THEME.value = payload.theme

  // 应用主题
  applyTheme(THEME.value)

  // 持久化
  setSetting('work', payload.work)
  setSetting('break', payload.breakTime)
  setSetting('longBreak', payload.longBreak)
  setSetting('longBreakRound', payload.longBreakRound)
  setSetting('sysNotify', payload.sysNotify)
  setSetting('theme', payload.theme)

  // 重置计时并关闭
  resetTimer()
  closeSettings()
}

function setupSystemThemeListener() {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')
  
  const handleSystemThemeChange = (e) => {
    if (THEME.value === 'system') {
      applyTheme('system')
    }
  }
  
  mediaQuery.addEventListener('change', handleSystemThemeChange)
  
  // 返回清理函数
  return () => {
    mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }
}

onMounted(async () => {
  const w = await getSetting('work', DEFAULT_WORK)
  const b = await getSetting('break', DEFAULT_BREAK)
  const lb = await getSetting('longBreak', DEFAULT_LONG_BREAK)
  const lbr = await getSetting('longBreakRound', DEFAULT_LONG_BREAK_ROUND)
  const sn = await getSetting('sysNotify', DEFAULT_SYS_NOTIFY)
  const th = await getSetting('theme', DEFAULT_THEME)

  WORK_DURATION.value = w * 60
  BREAK_DURATION.value = b * 60
  LONG_BREAK_DURATION.value = lb * 60
  LONG_BREAK_ROUND.value = lbr
  SYS_NOTIFY.value = sn
  THEME.value = th
  applyTheme(THEME.value)

  if (!started.value) {
    timeLeft.value = isWork.value ? WORK_DURATION.value : BREAK_DURATION.value
  }
  cleanupSystemThemeListener = setupSystemThemeListener()
})
</script>

<style scoped>
  @import './PomodoroTimer.css';
</style>