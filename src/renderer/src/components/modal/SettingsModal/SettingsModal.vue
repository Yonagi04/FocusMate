<template>
  <div class="settings-modal" @click.self="emit('cancel')">
    <div class="settings-content">
      <h3>FocusMate 设置</h3>
      <div class="setting-item">
        <label>工作时长(分钟)</label>
        <input type="number" min="1" max="120" v-model.number="workInput" />
      </div>
      <div class="setting-item">
        <label>休息时长(分钟)</label>
        <input type="number" min="1" max="60" v-model.number="breakInput" />
      </div>
      <div class="setting-item">
        <label>长休息时长(分钟)</label>
        <input type="number" min="1" max="120" v-model.number="longBreakInput" />
      </div>
      <div class="setting-item">
        <label>长休息轮数</label>
        <input type="number" min="1" max="20" v-model.number="longBreakRoundInput" />
      </div>
      <div class="setting-item">
        <label>计时结束时系统提示音</label>
        <el-switch v-model="sysNotifyInput" />
      </div>
      <div class="setting-item">
        <label>主题模式</label>
        <el-select v-model="themeInput" placeholder="Select" style="width: 120px">
          <el-option label="浅色模式" value="light" />
          <el-option label="深色模式" value="dark" />
          <el-option label="跟随系统" value="system" />
        </el-select>
      </div>
      <div class="settings-actions">
        <button @click="onApply">确定</button>
        <button @click="emit('cancel')">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isLight: { type: Boolean, default: false },
  work: { type: Number, required: true },
  breakTime: { type: Number, required: true },
  longBreak: { type: Number, required: true },
  longBreakRound: { type: Number, required: true },
  sysNotify: { type: Boolean, required: true },
  theme: { type: String, required: true }
})
const emit = defineEmits(['apply', 'cancel'])

const workInput = ref(props.work)
const breakInput = ref(props.breakTime)
const longBreakInput = ref(props.longBreak)
const longBreakRoundInput = ref(props.longBreakRound)
const sysNotifyInput = ref(props.sysNotify)
const themeInput = ref(props.theme)

// 父级更新时同步子级本地表单
watch(() => [
  props.work, props.breakTime, props.longBreak,
  props.longBreakRound, props.sysNotify, props.theme
], () => {
  workInput.value = props.work
  breakInput.value = props.breakTime
  longBreakInput.value = props.longBreak
  longBreakRoundInput.value = props.longBreakRound
  sysNotifyInput.value = props.sysNotify
  themeInput.value = props.theme
})

function onApply() {
  try {
    // 验证输入值
    const work = Math.max(1, Math.min(120, Number(workInput.value) || 25))
    const breakTime = Math.max(1, Math.min(60, Number(breakInput.value) || 5))
    const longBreak = Math.max(1, Math.min(120, Number(longBreakInput.value) || 15))
    const longBreakRound = Math.max(1, Math.min(20, Number(longBreakRoundInput.value) || 4))
    const sysNotify = !!sysNotifyInput.value
    const theme = themeInput.value || 'dark'

    // 验证主题值
    if (!['light', 'dark', 'system'].includes(theme)) {
      console.error('无效的主题值:', theme)
      return
    }

    emit('apply', {
      work,
      breakTime,
      longBreak,
      longBreakRound,
      sysNotify,
      theme
    })
  } catch (error) {
    console.error('验证设置失败:', error)
  }
}
</script>

<style scoped>
  @import './SettingsModal.css';
</style>