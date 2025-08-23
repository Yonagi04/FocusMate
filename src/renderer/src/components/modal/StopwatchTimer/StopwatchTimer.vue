<template>
  <div class="stopwatch-timer">
    <h2>
      <template v-if="!started">欢迎使用正计时</template>
      <template v-else>
        <template v-if="!running">已暂停</template>
        <template v-else>正在计时中...</template>
      </template>
    </h2>
    <div class="timer">{{ hours }}:{{ minutes }}:{{ seconds }}</div>
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
        <button v-if="started" @click="resetTimer" key="reset" class="action-btn end-btn">
          重置
        </button>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const emit = defineEmits(['start', 'pause'])

// 状态变量
const timeElapsed = ref(0) // 已经过的时间（秒）
const running = ref(false) // 是否正在运行
const started = ref(false) // 是否已经开始

// 计算属性：时、分、秒
const hours = computed(() => String(Math.floor(timeElapsed.value / 3600)).padStart(2, '0'))
const minutes = computed(() => String(Math.floor((timeElapsed.value % 3600) / 60)).padStart(2, '0'))
const seconds = computed(() => String(timeElapsed.value % 60).padStart(2, '0'))

// 计时器
let timer = null

// 开始计时
function startTimer() {
  if (running.value) return
  running.value = true
  started.value = true
  emit('start')
  timer = setInterval(() => {
    timeElapsed.value++
  }, 1000)
}

// 暂停计时
function pauseTimer() {
  running.value = false
  emit('pause')
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

// 重置计时
function resetTimer() {
  pauseTimer()
  started.value = false
  timeElapsed.value = 0
}
</script>

<style scoped>
@import '../../../assets/css/animation.css';

.stopwatch-timer {
  text-align: center;
  margin: 0 auto;
  padding: 24px 0;
}

.timer {
  font-size: 3em;
  margin: 20px 0;
  font-family: 'Consolas', 'Menlo', 'Monaco', monospace;
  letter-spacing: 2px;
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