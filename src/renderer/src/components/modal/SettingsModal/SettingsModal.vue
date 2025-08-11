<template>
  <div class="settings-modal" @click.self="emit('cancel')">
    <div class="settings-content">
      <h3>FocusMate 设置</h3>
      <div class="setting-item">
        <label>工作时长(分钟)</label>
        <input type="number" min="1" v-model.number="workInput" />
      </div>
      <div class="setting-item">
        <label>休息时长(分钟)</label>
        <input type="number" min="1" v-model.number="breakInput" />
      </div>
      <div class="setting-item">
        <label>长休息时长(分钟)</label>
        <input type="number" min="1" v-model.number="longBreakInput" />
      </div>
      <div class="setting-item">
        <label>长休息轮数</label>
        <input type="number" min="1" v-model.number="longBreakRoundInput" />
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
  emit('apply', {
    work: Math.max(1, Number(workInput.value)),
    breakTime: Math.max(1, Number(breakInput.value)),
    longBreak: Math.max(1, Number(longBreakInput.value)),
    longBreakRound: Math.max(1, Number(longBreakRoundInput.value)),
    sysNotify: !!sysNotifyInput.value,
    theme: themeInput.value
  })
}
</script>

<style scoped>
  @import './SettingsModal.css';
</style>