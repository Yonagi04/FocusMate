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
        <button v-if="!started || (!running && started)" @click="startTimer" key="start" class="action-btn start-btn">
          开始
        </button>
        <button v-else-if="running" @click="pauseTimer" key="pause" class="action-btn pause-btn">
          暂停
        </button>
      </transition>
      <transition name="button-slide" mode="out-in">
        <button v-if="started" @click="endTimer" key="end" class="action-btn end-btn">
          结束
        </button>
      </transition>
      <transition name="menu-fade">
        <CustomConfirm :visible="showEndConfirm" message="确定要结束番茄计时吗？" @confirm="confirmEndTimer"
          @cancel="cancelEndTimer" @close="cancelEndTimer" />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { showNotification } from '../../../utils/index.js'
import CustomConfirm from '../../common/CustomConfirm.vue'

const emit = defineEmits(['start', 'pause'])

const props = defineProps({
  workDuration: { type: Number, default: 25 * 60 },
  breakDuration: { type: Number, default: 5 * 60 },
  longBreakDuration: { type: Number, default: 15 * 60 },
  longBreakRound: { type: Number, default: 4 }
})

const isWork = ref(true)
const timeLeft = ref(props.workDuration)
const running = ref(false)
const started = ref(false)
const round = ref(1)

const minutes = computed(() => String(Math.floor(timeLeft.value / 60)).padStart(2, '0'))
const seconds = computed(() => String(timeLeft.value % 60).padStart(2, '0'))

const showEndConfirm = ref(false)

let timer = null

// 监听 props 变化，实时更新计时器时长
watch(() => [props.workDuration, props.breakDuration], ([newWorkDuration, newBreakDuration]) => {
  if (isWork.value) {
    timeLeft.value = newWorkDuration
  } else {
    timeLeft.value = newBreakDuration
  }
}, { immediate: true })

function startTimer() {
  if (running.value) return
  running.value = true
  started.value = true
  emit('start')
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
  emit('pause')
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

defineExpose({
  pauseTimer,
  timeLeft,
  isWork,
  round,
  started,
  running,
  updateTimerDuration
})

function endTimer() {
  if (running.value) {
    showEndConfirm.value = true
    return
  }
  resetPomodoro()
}

function confirmEndTimer() {
  showEndConfirm.value = false
  resetPomodoro()
}

function cancelEndTimer() {
  showEndConfirm.value = false
}

function resetPomodoro() {
  pauseTimer()
  started.value = false
  running.value = false
  round.value = 1
  isWork.value = true
  // 使用从父组件传入的工作时长
  timeLeft.value = props.workDuration
}

// 添加一个方法来更新计时器时长
function updateTimerDuration(workDuration, breakDuration) {
  console.log('PomodoroTimer: updateTimerDuration called with:', { workDuration, breakDuration, isWork: isWork.value })
  if (isWork.value) {
    timeLeft.value = workDuration
  } else {
    timeLeft.value = breakDuration
  }
  console.log('PomodoroTimer: timeLeft updated to:', timeLeft.value)
}

function switchMode() {
  isWork.value = !isWork.value

  if (!isWork.value && round.value % props.longBreakRound === 0) {
    timeLeft.value = props.longBreakDuration
  } else {
    timeLeft.value = isWork.value ? props.workDuration : props.breakDuration
  }
  if (isWork.value) {
    round.value++
  }
}
</script>

<style scoped>
@import '../../../assets/css/animation.css';

.pomodoro-timer {
  text-align: center;
  margin: 0 auto;
  padding: 24px 0;
  /* position: relative; */
}

.timer {
  font-size: 3em;
  margin: 20px 0;
  font-family: 'Consolas', 'Menlo', 'Monaco', monospace;
  letter-spacing: 2px;
}

.actions {
  margin-top: 20px;
}

.action-btn {
  margin: 0 16px;
  padding: 12px 20px;
  font-size: 1em;
  border-radius: 36px;
  /* 圆角矩形 */
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}


/* 开始按钮：蓝色底白色字体 */
.start-btn {
  background: #007acc;
  color: white;
  border-color: #007acc;
}

.start-btn:hover {
  background: #005a9e;
  border-color: #005a9e;
}

/* 暂停按钮：白色底蓝色字体，蓝色边框 */
.pause-btn {
  background: white;
  color: #007acc;
  border-color: #007acc;
}

.pause-btn:hover {
  background: #f0f8ff;
  border-color: #005a9e;
  color: #005a9e;
}

/* 结束按钮：和暂停一样 */
.end-btn {
  background: white;
  color: #007acc;
  border-color: #007acc;
}

.end-btn:hover {
  background: #f0f8ff;
  border-color: #005a9e;
  color: #005a9e;
}

/* 浅色模式下的按钮样式 */
body.light .start-btn {
  background: #007acc;
  color: white;
  border-color: #007acc;
}

body.light .start-btn:hover {
  background: #005a9e;
  border-color: #005a9e;
}

body.light .pause-btn,
body.light .end-btn {
  background: white;
  color: #007acc;
  border-color: #007acc;
}

body.light .pause-btn:hover,
body.light .end-btn:hover {
  background: #f0f8ff;
  border-color: #005a9e;
  color: #005a9e;
}

/* 按钮淡入淡出动画 */
.button-fade-enter-active,
.button-fade-leave-active {
  transition: all 0.3s ease;
}

.button-fade-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(10px);
}

.button-fade-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.button-fade-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.button-fade-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(-10px);
}

/* 结束按钮使用与暂停按钮相同的动画 */
.button-slide-enter-active,
.button-slide-leave-active {
  transition: all 0.3s ease;
}

.button-slide-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(10px);
}

.button-slide-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.button-slide-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.button-slide-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(-10px);
}


.button-slide-leave-to.end-leaving {
  opacity: 0;
  transform: scale(0.8) translateY(-10px);
}

body.light .actions button:not(:disabled):hover {
  background: #e0e0e0;
  border-color: #bbb;
  color: #2f3241;
}
</style>