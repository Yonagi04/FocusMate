<template>
  <div class="timer-panel">
    <TimerTabs :timerMode="timerMode" @switch="onSwitchMode" />
    <PomodoroTimer v-if="timerMode === 'pomodoro'" ref="pomodoroRef" :workDuration="WORK_DURATION"
      :breakDuration="BREAK_DURATION" :longBreakDuration="LONG_BREAK_DURATION" :longBreakRound="LONG_BREAK_ROUND"
      @start="pomodoroRunning = true" @pause="pomodoroRunning = false" />
    <StopwatchTimer v-if="timerMode === 'stopwatch'" ref="stopwatchRef" @start="stopwatchRunning = true"
      @pause="stopwatchRunning = false" />
    <div class="bottom-btns">
      <div class="settings-btn" @click="showSettings = true" title="设置">
        <svg v-if="!isLight" t="1754227355950" class="icon" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="21685" width="32" height="32">
          <path
            d="M878.08 466.944l-129.3824-253.0816a98.8672 98.8672 0 0 0-88.064-53.8624H366.08c-36.864 0-70.656 20.48-87.6544 53.1456l-132.096 253.0816a98.8672 98.8672 0 0 0 0 91.5456l132.096 253.0816a98.8672 98.8672 0 0 0 87.6544 53.1456h294.5536c37.1712 0 71.168-20.7872 88.064-53.8624l129.3824-253.1328a98.8672 98.8672 0 0 0 0-90.0096z m-72.3968 372.3264a162.8672 162.8672 0 0 1-145.0496 88.7296H366.08a162.8672 162.8672 0 0 1-144.384-87.552l-132.096-253.0816a162.8672 162.8672 0 0 1 0-150.7328l132.096-253.1328a162.8672 162.8672 0 0 1 144.384-87.5008h294.5536c61.184 0 117.1968 34.304 145.0496 88.7296l129.3824 253.1328c23.808 46.592 23.808 101.7344 0 148.2752l-129.3824 253.1328z"
            fill="#bfbfbf" p-id="21686"></path>
          <path
            d="M512 697.6a185.6 185.6 0 1 1 0-371.2 185.6 185.6 0 0 1 0 371.2z m0-64a121.6 121.6 0 1 0 0-243.2 121.6 121.6 0 0 0 0 243.2z"
            fill="#bfbfbf" p-id="21687"></path>
        </svg>
        <svg v-else t="1754227355950" class="icon" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="21685" width="32" height="32">
          <path
            d="M878.08 466.944l-129.3824-253.0816a98.8672 98.8672 0 0 0-88.064-53.8624H366.08c-36.864 0-70.656 20.48-87.6544 53.1456l-132.096 253.0816a98.8672 98.8672 0 0 0 0 91.5456l132.096 253.0816a98.8672 98.8672 0 0 0 87.6544 53.1456h294.5536c37.1712 0 71.168-20.7872 88.064-53.8624l129.3824-253.1328a98.8672 98.8672 0 0 0 0-90.0096z m-72.3968 372.3264a162.8672 162.8672 0 0 1-145.0496 88.7296H366.08a162.8672 162.8672 0 0 1-144.384-87.552l-132.096-253.0816a162.8672 162.8672 0 0 1 0-150.7328l132.096-253.1328a162.8672 162.8672 0 0 1 144.384-87.5008h294.5536c61.184 0 117.1968 34.304 145.0496 88.7296l129.3824 253.1328c23.808 46.592 23.808 101.7344 0 148.2752l-129.3824 253.1328z"
            fill="#515151" p-id="21686"></path>
          <path
            d="M512 697.6a185.6 185.6 0 1 1 0-371.2 185.6 185.6 0 0 1 0 371.2z m0-64a121.6 121.6 0 1 0 0-243.2 121.6 121.6 0 0 0 0 243.2z"
            fill="#515151" p-id="21687"></path>
        </svg>
      </div>
    </div>
    <div class="white-noise-btn" @click="showWhiteNoise = true" title="白噪音列表">
      <svg v-if="!isLight" t="1754709424697" class="icon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="2538" width="35" height="35">
        <path
          d="M419.037 287.953h413.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H419.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM419.028 543.17h411.608c17.673 0 32-14.327 32-32s-14.327-32-32-32H419.028c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 735.802H419.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h413.124c17.673 0 32-14.327 32-32s-14.327-32-32-32z"
          fill="#bfbfbf" p-id="2539"></path>
        <path d="M256.037 255.953m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#bfbfbf" p-id="2540"></path>
        <path d="M256.037 510.787m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#bfbfbf" p-id="2541"></path>
        <path d="M256.037 767.621m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#bfbfbf" p-id="2542"></path>
      </svg>
      <svg v-else t="1754709424697" class="icon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="2538" width="35" height="35">
        <path
          d="M419.037 287.953h413.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H419.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM419.028 543.17h411.608c17.673 0 32-14.327 32-32s-14.327-32-32-32H419.028c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 735.802H419.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h413.124c17.673 0 32-14.327 32-32s-14.327-32-32-32z"
          fill="#515151" p-id="2539"></path>
        <path d="M256.037 255.953m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#515151" p-id="2540"></path>
        <path d="M256.037 510.787m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#515151" p-id="2541"></path>
        <path d="M256.037 767.621m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#515151" p-id="2542"></path>
      </svg>
    </div>
    <div class="note-btn" @click="showNote = true" title="随心笔记">
      <svg v-if="!isLight" t="1755006983493" class="icon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="2706" width="32" height="32">
        <path
          d="M746.666667 64a170.666667 170.666667 0 0 1 170.666666 170.666667v554.666666a170.666667 170.666667 0 0 1-170.666666 170.666667H298.666667a170.666667 170.666667 0 0 1-170.666667-170.666667V234.666667a170.666667 170.666667 0 0 1 170.666667-170.666667h448z m0 74.666667H298.666667a96 96 0 0 0-95.893334 91.477333L202.666667 234.666667v554.666666a96 96 0 0 0 91.477333 95.893334L298.666667 885.333333h448a96 96 0 0 0 95.893333-91.477333L842.666667 789.333333V234.666667a96 96 0 0 0-91.477334-95.893334L746.666667 138.666667z"
          fill="#bfbfbf" p-id="2707"></path>
        <path
          d="M224 325.333333a37.333333 37.333333 0 0 1 3.072 74.538667l-3.072 0.128H106.666667a37.333333 37.333333 0 0 1-3.072-74.538667L106.666667 325.333333h117.333333zM224 624a37.333333 37.333333 0 0 1 3.072 74.538667l-3.072 0.128H106.666667a37.333333 37.333333 0 0 1-3.072-74.538667L106.666667 624h117.333333zM693.333333 346.666667a37.333333 37.333333 0 0 1 37.205334 34.261333l0.128 3.072v256a37.333333 37.333333 0 0 1-74.538667 3.072L656 640V384c0-20.608 16.725333-37.333333 37.333333-37.333333z"
          fill="#bfbfbf" p-id="2708"></path>
      </svg>
      <svg v-else t="1755006983493" class="icon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="2706" width="32" height="32">
        <path
          d="M746.666667 64a170.666667 170.666667 0 0 1 170.666666 170.666667v554.666666a170.666667 170.666667 0 0 1-170.666666 170.666667H298.666667a170.666667 170.666667 0 0 1-170.666667-170.666667V234.666667a170.666667 170.666667 0 0 1 170.666667-170.666667h448z m0 74.666667H298.666667a96 96 0 0 0-95.893334 91.477333L202.666667 234.666667v554.666666a96 96 0 0 0 91.477333 95.893334L298.666667 885.333333h448a96 96 0 0 0 95.893333-91.477333L842.666667 789.333333V234.666667a96 96 0 0 0-91.477334-95.893334L746.666667 138.666667z"
          fill="#707070" p-id="2707"></path>
        <path
          d="M224 325.333333a37.333333 37.333333 0 0 1 3.072 74.538667l-3.072 0.128H106.666667a37.333333 37.333333 0 0 1-3.072-74.538667L106.666667 325.333333h117.333333zM224 624a37.333333 37.333333 0 0 1 3.072 74.538667l-3.072 0.128H106.666667a37.333333 37.333333 0 0 1-3.072-74.538667L106.666667 624h117.333333zM693.333333 346.666667a37.333333 37.333333 0 0 1 37.205334 34.261333l0.128 3.072v256a37.333333 37.333333 0 0 1-74.538667 3.072L656 640V384c0-20.608 16.725333-37.333333 37.333333-37.333333z"
          fill="#707070" p-id="2708"></path>
      </svg>
    </div>
    <transition name="menu-fade">
      <SettingsModal v-if="showSettings" :isLight="isLight" :work="WORK_DURATION / 60" :breakTime="BREAK_DURATION / 60"
        :longBreak="LONG_BREAK_DURATION / 60" :longBreakRound="LONG_BREAK_ROUND" :sysNotify="SYS_NOTIFY" :theme="THEME"
        @apply="onApplySettings" @cancel="closeSettings" />
    </transition>
    <transition name="menu-fade">
      <WhiteNoiseModal v-show="showWhiteNoise" :isLight="isLight" @close="closeWhiteNoise" />
    </transition>
    <transition name="menu-fade">
      <NoteModal v-if="showNote" :isLight="isLight" @close="closeNote" />
    </transition>
    <transition name="menu-fade">
      <CustomConfirm :visible="showResetConfirm" message="修改计时设置将会重置计时器，确定要继续吗？" @confirm="confirmApply"
        @cancel="showResetConfirm = false" @close="showResetConfirm = false" />
    </transition>
    <transition name="menu-fade">
      <CustomConfirm :visible="showSwitchConfirm" message="当前计时器正在运行，是否要切换计时模式？" @confirm="confirmSwitchMode"
        @cancel="cancelSwitchMode" @close="cancelSwitchMode" />
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TimerTabs from './modal/TimerTabs/TimerTabs.vue';
import PomodoroTimer from './modal/PomodoroTimer/PomodoroTimer.vue';
import StopwatchTimer from './modal/StopwatchTimer/StopwatchTimer.vue';
import SettingsModal from './modal/SettingsModal/SettingsModal.vue'
import WhiteNoiseModal from './modal/WhiteNoiseModal/WhiteNoiseModal.vue'
import NoteModal from './modal/NoteModal/NoteModal.vue'
import CustomConfirm from './common/CustomConfirm.vue'

const pomodoroRef = ref(null)
const stopwatchRef = ref(null)

// 记录原始设置值用于取消时回填
const originalSettings = ref({
  work: DEFAULT_WORK,
  breakTime: DEFAULT_BREAK,
  longBreak: DEFAULT_LONG_BREAK,
  longBreakRound: DEFAULT_LONG_BREAK_ROUND
})

const timerMode = ref('pomodoro') // 当前计时模式，'pomodoro' 或 'stopwatch'
const pomodoroRunning = ref(false) // 番茄钟是否在运行
const stopwatchRunning = ref(false) // 秒表是否在运行
const showSettings = ref(false) // 是否显示设置面板
const showWhiteNoise = ref(false) // 是否显示白噪音面板
const showNote = ref(false) // 是否显示笔记面板
const showSwitchConfirm = ref(false) // 是否显示切换模式确认对话框
const showResetConfirm = ref(false) // 是否显示重置计时确认对话框
const pendingSwitchMode = ref(null) // 待切换的计时模式
const isLight = ref(false) // 当前是否为浅色主题

/* 切换计时模式相关逻辑 */
function onSwitchMode(mode) {
  let needConfirm = false
  if (timerMode.value === 'pomodoro' && pomodoroRunning.value) needConfirm = true
  if (timerMode.value === 'stopwatch' && stopwatchRunning.value) needConfirm = true
  if (needConfirm) {
    showSwitchConfirm.value = true
    pendingSwitchMode.value = mode
    return
  }
  timerMode.value = mode
}

function confirmSwitchMode() {
  showSwitchConfirm.value = false
  timerMode.value = pendingSwitchMode.value
  if (pomodoroRunning.value) {
    pomodoroRunning.value = false
  }
  if (stopwatchRunning.value) {
    stopwatchRunning.value = false
  }
  pendingSwitchMode.value = null
}

function cancelSwitchMode() {
  showSwitchConfirm.value = false
  pendingSwitchMode.value = null
}

/* 设置相关逻辑 */
async function getSetting(key, def) {
  try {
    if (window.settingsAPI) {
      const val = await window.settingsAPI.get(key)
      return val !== undefined && val !== null ? val : def
    }
    return def
  } catch (error) {
    console.error(`获取设置 ${key} 失败:`, error)
    return def
  }
}

async function setSetting(key, value) {
  try {
    if (!window.settingsAPI) {
      console.warn('settingsAPI 不可用')
      return false
    }
    const result = await window.settingsAPI.set(key, value)
    return result === true
  } catch (error) {
    console.error(`保存设置 ${key} 失败:`, error)
    return false
  }
}

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
  try {
    if (!themeMode || typeof themeMode !== 'string') {
      console.warn('无效的主题模式:', themeMode)
      themeMode = 'dark'
    }

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
  } catch (error) {
    console.error('应用主题失败:', error)
    // 回退到默认深色主题
    document.body.classList.remove('light')
    document.body.classList.add('el-theme-dark')
    isLight.value = false
  }
}

// 临时存储设置值，用于确认对话框确认后应用
const tempSettings = ref(null)

function confirmApply() {
  console.log('confirmApply开始，tempSettings:', tempSettings.value)

  if (!tempSettings.value || !tempSettings.value.work || !tempSettings.value.breakTime ||
    !tempSettings.value.longBreak || !tempSettings.value.longBreakRound) {
    console.warn('tempSettings无效，退出confirmApply')
    showResetConfirm.value = false
    return
  }

  try {
    console.log('应用计时相关设置:', tempSettings.value)

    // 应用所有计时相关设置
    WORK_DURATION.value = Math.max(1, Math.min(120, tempSettings.value.work)) * 60
    BREAK_DURATION.value = Math.max(1, Math.min(60, tempSettings.value.breakTime)) * 60
    LONG_BREAK_DURATION.value = Math.max(1, Math.min(120, tempSettings.value.longBreak)) * 60
    LONG_BREAK_ROUND.value = Math.max(1, Math.min(20, tempSettings.value.longBreakRound))

    console.log('更新后的时长设置:', {
      work: WORK_DURATION.value / 60,
      break: BREAK_DURATION.value / 60,
      longBreak: LONG_BREAK_DURATION.value / 60,
      longBreakRound: LONG_BREAK_ROUND.value
    })

    // 更新 originalSettings，确保下次打开设置时显示正确的值
    originalSettings.value = {
      work: tempSettings.value.work,
      breakTime: tempSettings.value.breakTime,
      longBreak: tempSettings.value.longBreak,
      longBreakRound: tempSettings.value.longBreakRound
    }

    // 更新当前计时显示值 - 使用新的方法
    if (pomodoroRef.value && pomodoroRef.value.updateTimerDuration) {
      console.log('调用updateTimerDuration方法，参数:', { work: WORK_DURATION.value, break: BREAK_DURATION.value })
      pomodoroRef.value.updateTimerDuration(WORK_DURATION.value, BREAK_DURATION.value)
    } else {
      console.warn('pomodoroRef.value.updateTimerDuration方法不存在')
    }

    // 如果计时器正在运行，则暂停计时器
    if (pomodoroRunning.value && pomodoroRef.value && pomodoroRef.value.pauseTimer) {
      console.log('暂停计时器')
      pomodoroRef.value.pauseTimer()
    }

    // 保存所有设置
    console.log('保存设置')
    saveAllSettings(tempSettings.value)

    // 关闭确认对话框和设置面板
    showResetConfirm.value = false
    closeSettings()

    // 清除临时设置
    tempSettings.value = null
    console.log('confirmApply完成')
  } catch (error) {
    console.error('应用设置失败:', error)
    showResetConfirm.value = false
  }
}

function closeSettings() {
  showSettings.value = false
  // 如果弹窗取消，回填原始设置值
  if (tempSettings.value) {
    WORK_DURATION.value = originalSettings.value.work * 60
    BREAK_DURATION.value = originalSettings.value.breakTime * 60
    LONG_BREAK_DURATION.value = originalSettings.value.longBreak * 60
    LONG_BREAK_ROUND.value = originalSettings.value.longBreakRound
    tempSettings.value = null
  }
}

// 如果弹窗没有点击确定，就不更新设置
function onApplySettings(payload) {
  try {
    console.log('应用设置开始，payload:', payload)

    // 验证输入数据
    if (!payload || typeof payload !== 'object') {
      console.error('无效的设置数据')
      return
    }

    // 检查是否修改了计时相关字段
    let isTimerSettingModified = false
    let isOtherSettingModified = false

    // 检查计时相关字段
    if (WORK_DURATION.value !== payload.work * 60) isTimerSettingModified = true
    if (BREAK_DURATION.value !== payload.breakTime * 60) isTimerSettingModified = true
    if (LONG_BREAK_DURATION.value !== payload.longBreak * 60) isTimerSettingModified = true
    if (LONG_BREAK_ROUND.value !== payload.longBreakRound) isTimerSettingModified = true

    // 检查非计时相关字段
    if (SYS_NOTIFY.value !== payload.sysNotify || THEME.value !== payload.theme) isOtherSettingModified = true

    console.log('设置修改状态:', { isTimerSettingModified, isOtherSettingModified, pomodoroRunning: pomodoroRunning.value })

    // 应用非计时相关设置
    SYS_NOTIFY.value = !!payload.sysNotify
    THEME.value = payload.theme || 'dark'
    applyTheme(THEME.value)

    // 处理不同情况
    if (timerMode.value === 'stopwatch' || !pomodoroRunning.value) {
      console.log('情况1: 正计时模式或无计时状态下修改')
      // 情况1: 正计时模式或无计时状态下修改
      originalSettings.value = {
        work: Math.max(1, Math.min(120, payload.work || 25)),
        breakTime: Math.max(1, Math.min(60, payload.breakTime || 5)),
        longBreak: Math.max(1, Math.min(120, payload.longBreak || 15)),
        longBreakRound: Math.max(1, Math.min(20, payload.longBreakRound || 4))
      }

      WORK_DURATION.value = originalSettings.value.work * 60
      BREAK_DURATION.value = originalSettings.value.breakTime * 60
      LONG_BREAK_DURATION.value = originalSettings.value.longBreak * 60
      LONG_BREAK_ROUND.value = originalSettings.value.longBreakRound

      console.log('更新后的时长设置:', {
        work: WORK_DURATION.value / 60,
        break: BREAK_DURATION.value / 60,
        longBreak: LONG_BREAK_DURATION.value / 60,
        longBreakRound: LONG_BREAK_ROUND.value
      })

      if (timerMode.value === 'pomodoro' && pomodoroRef.value) {
        if (pomodoroRef.value.updateTimerDuration) {
          console.log('调用updateTimerDuration方法，参数:', { work: WORK_DURATION.value, break: BREAK_DURATION.value })
          pomodoroRef.value.updateTimerDuration(WORK_DURATION.value, BREAK_DURATION.value)
        } else {
          console.warn('pomodoroRef.value.updateTimerDuration方法不存在')
        }
      }
      saveAllSettings(payload)
      closeSettings()
    } else if (pomodoroRunning.value && !isTimerSettingModified && isOtherSettingModified) {
      console.log('情况2: 计时进行/暂停状态下修改非计时相关字段')
      // 情况2: 计时进行/暂停状态下修改非计时相关字段
      setSetting('sysNotify', payload.sysNotify)
      setSetting('theme', payload.theme)
      closeSettings()
    } else if (pomodoroRunning.value && isTimerSettingModified) {
      console.log('情况3: 计时进行/暂停状态下修改计时相关字段，弹窗确认')
      // 情况3: 计时进行/暂停状态下修改计时相关字段，弹窗确认
      tempSettings.value = payload // 临时保存设置以便确认后使用
      showResetConfirm.value = true
    } else {
      console.log('其他情况，直接关闭')
      closeSettings()
    }
  } catch (error) {
    console.error('应用设置失败:', error)
    closeSettings()
  }
}

// 保存所有设置
async function saveAllSettings(payload) {
  try {
    if (!payload) {
      console.error('保存设置失败: 无效的数据')
      return false
    }

    const results = await Promise.allSettled([
      setSetting('work', Math.max(1, Math.min(120, payload.work || 25))),
      setSetting('break', Math.max(1, Math.min(60, payload.breakTime || 5))),
      setSetting('longBreak', Math.max(1, Math.min(120, payload.longBreak || 15))),
      setSetting('longBreakRound', Math.max(1, Math.min(20, payload.longBreakRound || 4))),
      setSetting('sysNotify', !!payload.sysNotify),
      setSetting('theme', payload.theme || 'dark')
    ])

    // 检查是否有失败的设置保存
    const failedSettings = results
      .map((result, index) => ({ result, index }))
      .filter(({ result }) => result.status === 'rejected')

    if (failedSettings.length > 0) {
      console.error('部分设置保存失败:', failedSettings)
      return false
    }

    return true
  } catch (error) {
    console.error('保存设置失败:', error)
    return false
  }
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
  try {
    const w = await getSetting('work', DEFAULT_WORK) || DEFAULT_WORK
    const b = await getSetting('break', DEFAULT_BREAK) || DEFAULT_BREAK
    const lb = await getSetting('longBreak', DEFAULT_LONG_BREAK) || DEFAULT_LONG_BREAK
    const lbr = await getSetting('longBreakRound', DEFAULT_LONG_BREAK_ROUND) || DEFAULT_LONG_BREAK_ROUND
    const sn = await getSetting('sysNotify', DEFAULT_SYS_NOTIFY)
    const th = await getSetting('theme', DEFAULT_THEME) || DEFAULT_THEME

    // 验证并应用设置值
    WORK_DURATION.value = Math.max(1, Math.min(120, w)) * 60
    BREAK_DURATION.value = Math.max(1, Math.min(60, b)) * 60
    LONG_BREAK_DURATION.value = Math.max(1, Math.min(120, lb)) * 60
    LONG_BREAK_ROUND.value = Math.max(1, Math.min(20, lbr))
    SYS_NOTIFY.value = !!sn
    THEME.value = th

    // 更新原始设置值
    originalSettings.value = {
      work: w,
      breakTime: b,
      longBreak: lb,
      longBreakRound: lbr
    }

    applyTheme(THEME.value)

    if (!pomodoroRunning.value && pomodoroRef.value && pomodoroRef.value.updateTimerDuration) {
      pomodoroRef.value.updateTimerDuration(WORK_DURATION.value, BREAK_DURATION.value)
    }

    cleanupSystemThemeListener = setupSystemThemeListener()
  } catch (error) {
    console.error('初始化设置失败:', error)
    // 使用默认值
    WORK_DURATION.value = DEFAULT_WORK * 60
    BREAK_DURATION.value = DEFAULT_BREAK * 60
    LONG_BREAK_DURATION.value = DEFAULT_LONG_BREAK * 60
    LONG_BREAK_ROUND.value = DEFAULT_LONG_BREAK_ROUND
    SYS_NOTIFY.value = DEFAULT_SYS_NOTIFY
    THEME.value = DEFAULT_THEME

    // 更新原始设置值为默认值
    originalSettings.value = {
      work: DEFAULT_WORK,
      breakTime: DEFAULT_BREAK,
      longBreak: DEFAULT_LONG_BREAK,
      longBreakRound: DEFAULT_LONG_BREAK_ROUND
    }

    applyTheme(THEME.value)
  }
})

/* 白噪音和笔记相关逻辑 */
function closeWhiteNoise() {
  showWhiteNoise.value = false
}

function closeNote() {
  showNote.value = false
}
</script>

<style scoped>
@import '../../src/assets/css/animation.css';
@import 'TimerPanel.css';
</style>