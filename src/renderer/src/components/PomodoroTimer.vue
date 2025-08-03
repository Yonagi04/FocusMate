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
    <div class="bottom-btns">
      <div class="settings-btn" @click="showSettings = true" title="设置">
        <svg v-if="!isLight" t="1754227355950" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21685" width="32" height="32"><path d="M878.08 466.944l-129.3824-253.0816a98.8672 98.8672 0 0 0-88.064-53.8624H366.08c-36.864 0-70.656 20.48-87.6544 53.1456l-132.096 253.0816a98.8672 98.8672 0 0 0 0 91.5456l132.096 253.0816a98.8672 98.8672 0 0 0 87.6544 53.1456h294.5536c37.1712 0 71.168-20.7872 88.064-53.8624l129.3824-253.1328a98.8672 98.8672 0 0 0 0-90.0096z m-72.3968 372.3264a162.8672 162.8672 0 0 1-145.0496 88.7296H366.08a162.8672 162.8672 0 0 1-144.384-87.552l-132.096-253.0816a162.8672 162.8672 0 0 1 0-150.7328l132.096-253.1328a162.8672 162.8672 0 0 1 144.384-87.5008h294.5536c61.184 0 117.1968 34.304 145.0496 88.7296l129.3824 253.1328c23.808 46.592 23.808 101.7344 0 148.2752l-129.3824 253.1328z" fill="#bfbfbf" p-id="21686"></path><path d="M512 697.6a185.6 185.6 0 1 1 0-371.2 185.6 185.6 0 0 1 0 371.2z m0-64a121.6 121.6 0 1 0 0-243.2 121.6 121.6 0 0 0 0 243.2z" fill="#bfbfbf" p-id="21687"></path></svg>
        <svg v-else t="1754227355950" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21685" width="32" height="32"><path d="M878.08 466.944l-129.3824-253.0816a98.8672 98.8672 0 0 0-88.064-53.8624H366.08c-36.864 0-70.656 20.48-87.6544 53.1456l-132.096 253.0816a98.8672 98.8672 0 0 0 0 91.5456l132.096 253.0816a98.8672 98.8672 0 0 0 87.6544 53.1456h294.5536c37.1712 0 71.168-20.7872 88.064-53.8624l129.3824-253.1328a98.8672 98.8672 0 0 0 0-90.0096z m-72.3968 372.3264a162.8672 162.8672 0 0 1-145.0496 88.7296H366.08a162.8672 162.8672 0 0 1-144.384-87.552l-132.096-253.0816a162.8672 162.8672 0 0 1 0-150.7328l132.096-253.1328a162.8672 162.8672 0 0 1 144.384-87.5008h294.5536c61.184 0 117.1968 34.304 145.0496 88.7296l129.3824 253.1328c23.808 46.592 23.808 101.7344 0 148.2752l-129.3824 253.1328z" fill="#515151" p-id="21686"></path><path d="M512 697.6a185.6 185.6 0 1 1 0-371.2 185.6 185.6 0 0 1 0 371.2z m0-64a121.6 121.6 0 1 0 0-243.2 121.6 121.6 0 0 0 0 243.2z" fill="#515151" p-id="21687"></path></svg>
      </div>
      <div class="theme-btn" @click="toggleTheme" :title="isLight ? '切换为夜间模式' : '切换为白昼模式'">
        <svg v-if="!isLight" t="1754227260145" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20390" width="32" height="32"><path d="M512.000213 733.353497c-122.06857 0-221.353283-99.284713-221.353283-221.353284S389.931643 290.64693 512.000213 290.64693 733.353497 389.931643 733.353497 512.000213 634.026117 733.353497 512.000213 733.353497z m0-357.373767A136.148482 136.148482 0 0 0 375.97973 512.000213 136.148482 136.148482 0 0 0 512.000213 648.020697 136.148482 136.148482 0 0 0 648.020697 512.000213 136.148482 136.148482 0 0 0 512.000213 375.97973zM554.666613 171.735673A42.154403 42.154403 0 0 1 512.000213 213.335413c-23.551853 0-42.6664-18.645217-42.6664-41.59974V41.603153A42.154403 42.154403 0 0 1 512.000213 0.003413c23.551853 0 42.6664 18.645217 42.6664 41.59974v130.13252zM554.666613 982.397273A42.154403 42.154403 0 0 1 512.000213 1023.997013c-23.594519 0-42.6664-18.687883-42.6664-41.59974v-130.175186A42.111737 42.111737 0 0 1 512.000213 810.665013c23.551853 0 42.6664 18.60255 42.6664 41.59974v130.13252zM171.735673 469.333813c22.954523 0 41.59974 19.114547 41.59974 42.6664 0 23.594519-18.645217 42.6664-41.59974 42.6664H41.603153A42.154403 42.154403 0 0 1 0.003413 512.000213c0-23.551853 18.645217-42.6664 41.59974-42.6664h130.13252zM982.397273 469.333813c22.954523 0 41.59974 19.114547 41.59974 42.6664 0 23.594519-18.687883 42.6664-41.59974 42.6664h-130.175186A42.111737 42.111737 0 0 1 810.665013 512.000213c0-23.551853 18.60255-42.6664 41.59974-42.6664h130.13252zM241.239239 722.430898a42.06907 42.06907 0 0 1 59.562294 0.767995 42.111737 42.111737 0 0 1 0.767996 59.562295l-92.031425 92.074091a42.154403 42.154403 0 0 1-59.562295-0.853328 42.154403 42.154403 0 0 1-0.767995-59.562294l92.031425-91.988759zM814.462323 149.207814a42.154403 42.154403 0 0 1 59.562294 0.767995 42.154403 42.154403 0 0 1 0.767996 59.562295l-92.031425 92.031425a42.06907 42.06907 0 0 1-59.562295-0.767996 42.111737 42.111737 0 0 1-0.810661-59.562294l92.074091-92.031425zM241.239239 301.526862a42.19707 42.19707 0 0 0 59.604961-0.725329 42.111737 42.111737 0 0 0 0.767995-59.562294L209.538104 149.122481a42.154403 42.154403 0 0 0-59.562295 0.853328 42.111737 42.111737 0 0 0-0.767995 59.562295l92.031425 91.988758zM814.462323 874.792613a42.111737 42.111737 0 0 0 59.562294-0.810662 42.154403 42.154403 0 0 0 0.767996-59.562294l-92.031425-92.031425a42.06907 42.06907 0 0 0-59.562295 0.767995 42.111737 42.111737 0 0 0-0.810661 59.562294l92.074091 92.074092z" fill="#bfbfbf" p-id="20391"></path></svg>
        <svg v-else t="1754227621834" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22954" width="34" height="34"><path d="M439.04383639 224.33271976a289.43717504 289.43717504 0 0 0-89.06329676 39.44690807c-27.5075319 18.12412161-51.158867 39.64960558-70.96389486 64.57645191-19.79019562 24.92684633-35.31880082 53.25011237-46.62042137 84.97474006C221.10449032 445.05050411 215.45368042 478.01109252 215.45368042 512c0 40.16870887 7.81621301 78.48347702 23.45358166 115.04318192 15.64725682 36.67341315 36.77228986 68.19039996 63.2910532 94.76354538 26.53359488 26.56820206 58.11485196 47.57952611 94.69927585 63.23667111 36.59431134 15.65714501 75.00301286 23.48324474 115.16183354 23.48324475 33.97407594 0 66.85061917-5.56182137 98.62468557-16.89310498 31.76417894-11.32633953 60.10227581-26.77584294 85.01429133-46.65502781 24.87740834-19.77536407 46.43255539-43.46625042 64.57150781-70.96389488a290.15403174 290.15403174 0 0 0 39.43701989-88.98913905c-8.3056532 0.72180079-17.71378249 1.13213991-28.0958481 1.1321392-45.21637032 0-88.35138342-8.85936294-129.45942212-26.46932463-41.1327577-17.71872658-76.62459295-41.50848964-106.44089858-71.27535655C505.84007277 458.54719011 482.10963587 423.01086095 464.42057238 381.91765379 446.7562286 340.81455917 437.94135957 297.65977044 437.94135957 252.4483442c0-10.40184195 0.39550758-19.77536407 1.15685891-28.01674772l-0.049438-0.09887672zM512.02976157 141.21192041c8.32542811 0 16.51242896 0.31146168 24.6054972 0.92944167-16.4036648 35.32374419-24.60549719 72.09603405-24.60549719 110.30698212 0 35.12104668 6.84227598 68.69961578 20.58121076 100.83458258 13.70927096 32.03114601 32.15474243 59.63261126 55.35124448 82.80933769 23.16683898 23.17178306 50.76830423 41.60736635 82.82416923 55.30674985 32.02125855 13.69938351 65.654209 20.60098567 100.78514387 20.60098568 38.23072298 0 75.03267594-8.24138293 110.35147675-24.62032874 0.59326099 8.14250622 0.86517214 16.28006837 0.86517213 24.62032874 0 33.57856837-4.43956893 66.43533597-13.29893256 98.46648269-8.90880166 32.03114601-21.28817928 61.69419283-37.24195443 88.78149743-15.92411206 27.19112615-35.31880082 52.11797247-58.09013296 74.87941716-22.77627549 22.76144395-47.74267309 42.12152555-74.87447306 58.09013223-27.15157487 15.96366261-56.75529553 28.32326532-88.78644152 37.28644905A368.16784419 368.16784419 0 0 1 512.00009921 882.78807959a368.20739474 368.20739474 0 0 1-98.48625832-13.28904439c-32.03609009-8.95824037-61.6249792-21.31784236-88.79138561-37.28150569-27.12685589-15.96860669-52.08336529-35.32868827-74.89919206-58.09013223-22.7515565-22.76144395-42.13635709-47.68829101-58.05058169-74.87941715-15.96366261-27.0922487-28.34304097-56.75529553-37.2518426-88.78149744A367.9354836 367.9354836 0 0 1 141.21201889 512c0-33.57856837 4.4494571-66.43533597 13.30882004-98.46648269 8.90880166-32.03114601 21.28817928-61.69419283 37.25184259-88.78149744 15.91916798-27.19112615 35.29902519-52.11797247 58.0505817-74.87941715 22.81582676-22.86526476 47.77233617-42.22534634 74.89919206-58.09013223C351.89380578 175.81880789 381.4826949 163.36032846 413.51878498 154.50096479A368.20739474 368.20739474 0 0 1 512.00009921 141.21192041h0.02966236z" p-id="22955" fill="#515151"></path></svg>
      </div>
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

const WORK_DURATION = ref(DEFAULT_WORK * 60)
const BREAK_DURATION = ref(DEFAULT_BREAK * 60)
const LONG_BREAK_DURATION = ref(DEFAULT_LONG_BREAK * 60)
const LONG_BREAK_ROUND = ref(DEFAULT_LONG_BREAK_ROUND)

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

const isLight = ref(false)

function toggleTheme() {
  isLight.value = !isLight.value
  if (isLight.value) {
    document.body.classList.add('light')
  } else {
    document.body.classList.remove('light')
  }
}

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
  position: relative;
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
.bottom-btns {
  position: fixed;
  left: 16px;
  bottom: 16px;
  display: flex;
  gap: 12px;
  z-index: 100;
}
.settings-btn,
.theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  padding: 0;
  box-sizing: border-box;
}

.settings-btn:hover,
.theme-btn:hover {
  opacity: 1;
}

.settings-btn .icon,
.theme-btn .icon,
.settings-btn svg,
.theme-btn svg {
  display: block;
  margin: 0;
  padding: 0;
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