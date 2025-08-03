<template>
  <div class="pomodoro-timer">
    <h2>
      <template v-if="!started">欢迎使用番茄钟，请点击“开始”专注工作吧！</template>
      <template v-else>{{ isWork ? '工作中，请专心工作哦~' : '休息中，放松一下吧~' }}</template>
    </h2>
    <h3>
      <template v-if="!started"></template>
      <template v-else>第 {{ round }} 轮 {{ isWork ? '工作' : '休息' }}</template>
    </h3>
    <div class="timer">{{ minutes }}:{{ seconds }}</div>
    <div class="actions">
      <button @click="startTimer" :disabled="running">开始</button>
      <button @click="pauseTimer" :disabled="!running">暂停</button>
      <button @click="resetTimer">重置</button>
    </div>
    <div class="settings-btn" @click="showSettings = true" title="设置">
      <svg t="1754219583016" class="icon" viewBox="0 0 1084 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4486" data-spm-anchor-id="a313x.search_index.0.i1.60803a81nVw7sd" width="32" height="32"><path d="M1072.147851 406.226367c-6.331285-33.456782-26.762037-55.073399-52.047135-55.073399-0.323417 0-0.651455 0.003081-0.830105 0.009241l-4.655674 0c-73.124722 0-132.618162-59.491899-132.618162-132.618162 0-23.731152 11.447443-50.336101 11.546009-50.565574 13.104573-29.498767 3.023185-65.672257-23.427755-84.127081l-1.601687-1.127342-134.400039-74.661726-1.700252-0.745401c-8.753836-3.805547-18.334698-5.735272-28.479231-5.735272-20.789593 0-41.235746 8.344174-54.683758 22.306575-14.741683 15.216028-65.622973 58.649474-104.721083 58.649474-39.450789 0-90.633935-44.286652-105.438762-59.784516-13.518857-14.247316-34.128258-22.753199-55.127302-22.753199-9.945862 0-19.354234 1.861961-27.958682 5.531982l-1.746455 0.74078-139.141957 76.431283-1.643269 1.139662c-26.537186 18.437884-36.675557 54.579032-23.584845 84.062398 0.115506 0.264895 11.579891 26.725075 11.579891 50.634877 0 73.126262-59.491899 132.618162-132.618162 132.618162l-4.581749 0c-0.318797-0.00616-0.636055-0.01078-0.951772-0.01078-25.260456 0-45.672728 21.618157-52.002472 55.0811-0.462025 2.453354-11.313456 60.622322-11.313456 106.117939 0 45.494078 10.85143 103.659965 11.314996 106.119479 6.334365 33.458322 26.758957 55.076479 52.036353 55.076479 0.320337 0 0.651455-0.00616 0.842426-0.012321l4.655674 0c73.126262 0 132.618162 59.491899 132.618162 132.616622 0 23.760413-11.444363 50.333021-11.546009 50.565574-13.093793 29.474125-3.041666 65.646075 23.395414 84.151722l1.569346 1.093459 131.838879 73.726895 1.675611 0.7377c8.750757 3.84251 18.305437 5.790715 28.397607 5.790715 21.082208 0 41.676209-8.706094 55.0888-23.290689 18.724339-20.347588 69.527086-62.362616 107.04815-62.362616 40.625872 0 92.72537 47.100385 107.759669 63.583903 13.441852 14.831008 34.176001 23.689571 55.470741 23.695731l0.00616 0c9.895039 0 19.27877-1.883523 27.893999-5.598205l1.711034-0.73924 136.659342-75.531873 1.617088-1.128882c26.492523-18.456365 36.601633-54.600594 23.538642-84.016195-0.115506-0.267974-11.595291-27.082374-11.595291-50.67646 0-73.124722 59.49344-132.616622 132.618162-132.616622l4.517066-0.00154c0.300316 0.00616 0.599092 0.009241 0.899409 0.009241 25.331299-0.00154 45.785153-21.619697 52.107197-55.054918 0.112426-0.589852 11.325776-59.507301 11.325776-106.14104C1083.464388 466.640776 1072.609877 408.67356 1072.147851 406.226367zM377.486862 945.656142l-115.32764-64.487932c5.082277-13.052211 15.437801-43.51815 15.437801-75.017486 0-109.382917-84.176364-199.816642-192.587488-208.134635-2.647404-15.427021-8.873963-54.967133-8.873963-85.667166 0-30.65691 6.223479-70.232445 8.869343-85.671786 108.415744-8.311832 192.592108-98.745557 192.592108-208.134635 0-31.416171-10.300081-61.797405-15.371577-74.854236l122.721583-67.40331c0.003081 0 0.00462 0.00154 0.007701 0.00154 4.423121 4.518606 22.121764 22.080182 46.558275 39.493911 39.929754 28.46229 77.952885 42.894416 113.014434 42.894416 34.716571 0 72.437845-14.151831 112.115025-42.06431 24.282503-17.07953 41.896442-34.302288 46.308782-38.74543 0.009241-0.00154 0.018481-0.00462 0.026182-0.00616l118.301542 65.726159c-5.077657 13.055291-15.416239 43.499669-15.416239 74.958962 0 109.389077 84.174824 199.822802 192.590568 208.134635 2.645865 15.462442 8.872423 55.107281 8.872423 85.671786 0 30.687711-6.223479 70.241685-8.869343 85.673326C890.042174 606.334084 805.86427 696.767809 805.86427 806.158426c0 31.450053 10.317022 61.851309 15.393138 74.903519l-119.783103 66.198965c-5.168521-5.490399-22.603811-23.363073-46.740005-41.288109-40.701336-30.224145-79.662378-45.549521-115.800446-45.549521-35.79155 0-74.458435 15.038919-114.927219 44.694774C400.22004 922.554885 382.666163 940.255068 377.486862 945.656142zM731.271848 511.646647c0-105.803762-86.081448-191.88059-191.888289-191.88059-105.803762 0-191.88059 86.076827-191.88059 191.88059 0 105.803762 86.076827 191.882129 191.88059 191.882129C645.19194 703.528777 731.271848 617.450409 731.271848 511.646647zM539.383558 395.903184c63.825696 0 115.751164 51.922387 115.751164 115.743463 0 63.825696-51.925468 115.751164-115.751164 115.751164-63.821076 0-115.743463-51.925468-115.743463-115.751164C423.640095 447.824031 475.562482 395.903184 539.383558 395.903184z" fill="#bfbfbf" p-id="4487"></path></svg>
    </div>
    <div v-if="showSettings" class="settings-modal">
      <div class="settings-content">
        <h3>番茄钟设置</h3>
        <div class="setting-item">
          <label>工作时长(分钟)：</label>
          <input type="number" min="1" v-model.number="workInput" />
        </div>
        <div class="setting-item">
          <label>休息时长(分钟)：</label>
          <input type="number" min="1" v-model.number="breakInput" />
        </div>
        <div class="setting-item">
          <label>长休息时长(分钟)：</label>
          <input type="number" min="1" v-model.number="longBreakInput" />
        </div>
        <div class="setting-item">
          <label>长休息轮数：</label>
          <input type="number" min="1" v-model.number="longBreakRoundInput" />
        </div>
        <div class="settings-actions">
          <button @click="applySettings">确定</button>
          <button @click="cancelSettings">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

async function getSetting(key, def) {
  if (window.settingsAPI) {
    const val = await window.settingsAPI.get(key)
    return typeof val === 'number' && !isNaN(val) ? val : def
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

const WORK_DURATION = ref(getSetting('work', DEFAULT_WORK) * 60)
const BREAK_DURATION = ref(getSetting('break', DEFAULT_BREAK) * 60)
const LONG_BREAK_DURATION = ref(getSetting('longBreak', DEFAULT_LONG_BREAK) * 60)
const LONG_BREAK_ROUND = ref(getSetting('longBreakRound', DEFAULT_LONG_BREAK_ROUND))

const isWork = ref(true)
const timeLeft = ref(WORK_DURATION.value)
const running = ref(false)
const started = ref(false)
const round = ref(1)
let timer = null

const showSettings = ref(false)
const workInput = ref(getSetting('work', DEFAULT_WORK))
const breakInput = ref(getSetting('break', DEFAULT_BREAK))
const longBreakInput = ref(getSetting('longBreak', DEFAULT_LONG_BREAK))
const longBreakRoundInput = ref(getSetting('longBreakRound', DEFAULT_LONG_BREAK_ROUND))

const minutes = computed(() => String(Math.floor(timeLeft.value / 60)).padStart(2, '0'))
const seconds = computed(() => String(timeLeft.value % 60).padStart(2, '0'))

function showNotification(title, body) {
  if (window.Notification && Notification.permission === 'granted') {
    new Notification(title, { body })
  } else if (window.Notification && Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(title, { body })
      }
    })
  }
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
  pauseTimer()
  if (!isWork.value && round.value % LONG_BREAK_ROUND.value === 0) {
    timeLeft.value = LONG_BREAK_DURATION.value
  } else {
    timeLeft.value = isWork.value ? WORK_DURATION.value : BREAK_DURATION.value
  }
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

function applySettings() {
  WORK_DURATION.value = Math.max(1, workInput.value) * 60
  BREAK_DURATION.value = Math.max(1, breakInput.value) * 60
  LONG_BREAK_DURATION.value = Math.max(1, longBreakInput.value) * 60
  LONG_BREAK_ROUND.value = Math.max(1, longBreakRoundInput.value)
  setSetting('work', workInput.value)
  setSetting('break', breakInput.value)
  setSetting('longBreak', longBreakInput.value)
  setSetting('longBreakRound', longBreakRoundInput.value)
  console.log('Settings saved:', {
    work: workInput.value,
    break: breakInput.value,
    longBreak: longBreakInput.value,
    longBreakRound: longBreakRoundInput.value
  })
  resetTimer()
  showSettings.value = false
}

function cancelSettings() {
  workInput.value = WORK_DURATION.value / 60
  breakInput.value = BREAK_DURATION.value / 60
  longBreakInput.value = LONG_BREAK_DURATION.value / 60
  longBreakRoundInput.value = LONG_BREAK_ROUND.value
  showSettings.value = false
}

onMounted(async () => {
  workInput.value = await getSetting('work', DEFAULT_WORK)
  breakInput.value = await getSetting('break', DEFAULT_BREAK)
  longBreakInput.value = await getSetting('longBreak', DEFAULT_LONG_BREAK)
  longBreakRoundInput.value = await getSetting('longBreakRound', DEFAULT_LONG_BREAK_ROUND)

  WORK_DURATION.value = workInput.value * 60
  BREAK_DURATION.value = breakInput.value * 60
  LONG_BREAK_DURATION.value = longBreakInput.value * 60
  LONG_BREAK_ROUND.value = longBreakRoundInput.value

  if (!started.value) {
    timeLeft.value = isWork.value ? WORK_DURATION.value : BREAK_DURATION.value
  }
})
</script>

<style scoped>
.pomodoro-timer {
  text-align: center;
  margin: 40px auto;
  padding: 24px 0;
}
.timer {
  font-size: 3em;
  margin: 20px 0;
  font-family: 'Consolas', 'Menlo', 'Monaco', monospace;
  letter-spacing: 2px;
}
.actions {
  margin-top: 16px;
}
.settings-btn {
  position: absolute;
  left: 16px;
  bottom: 16px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.settings-btn:hover {
  opacity: 1;
}
.settings-modal {
  position: fixed;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.settings-content {
  background: #fff;
  border-radius: 10px;
  padding: 32px 24px 20px 24px;
  min-width: 300px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
}
.setting-item {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
}
.setting-item label {
  flex: 1;
  text-align: right;
  margin-right: 10px;
}
.setting-item input[type="number"] {
  width: 70px;
  padding: 4px 8px;
  font-size: 1em;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.settings-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 18px;
}
.settings-actions button {
  padding: 6px 18px;
  font-size: 1em;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f5f5f5;
  cursor: pointer;
  transition: background 0.2s;
}
.settings-actions button:hover {
  background: #e6e6e6;
}
button {
  margin: 0 8px;
  padding: 8px 20px;
  font-size: 1em;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f5f5f5;
  cursor: pointer;
  transition: background 0.2s;
}
button:disabled {
  background: #eee;
  color: #aaa;
  cursor: not-allowed;
}
</style>