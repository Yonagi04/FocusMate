<template>
  <div class="timer-tabs">
    <button class="tab-btn" :class="{ 'active': timerMode === 'pomodoro' }" @click="onSwitch('pomodoro')">
      番茄计时
    </button>
    <button class="tab-btn" :class="{ 'active': timerMode === 'stopwatch' }" @click="onSwitch('stopwatch')">
      正计时
    </button>
  </div>
</template>

<script setup>
  const props = defineProps({
    timerMode: String
  })
  const emit = defineEmits(['switch'])

  function onSwitch(mode) {
    if (mode !== props.timerMode) {
      emit('switch', mode)
    }
  }
</script>

<style scoped>
/* Tab导航样式 */
.timer-tabs {
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
  justify-content: center;
}

.tab-btn {
  padding: 8px 16px;
  border-radius: 36px; /* 与action-btn一致的圆角 */
  background-color: white;
  color: #007acc;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  border: 2px solid #007acc; /* 添加边框 */
  overflow: hidden;
}

.tab-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: #f0f8ff;
  border-color: #005a9e;
  color: #005a9e;
}

.tab-btn.active {
  background-color: #007acc;
  color: white;
  border-color: #007acc;
}
</style>