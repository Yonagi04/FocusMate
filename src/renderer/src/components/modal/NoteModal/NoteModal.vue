<template>
  <div class="note-modal">
    <div class="note-content">
      <div class="note-header">
        <h3>随心笔记</h3>
      </div>
      
      <div class="note-body">
        <textarea
          v-model="noteContent"
          class="note-textarea"
          placeholder="在这里输入您的笔记内容..."
          @input="onNoteInput"
          ref="noteTextarea"
        ></textarea>
      </div>
      
      <div class="note-footer">
        <div class="note-actions">
          <!-- <button 
            class="action-btn markdown-btn" 
            @click="toggleMarkdownMode"
          >
            {{ isMarkdownMode ? '进入富文本模式' : '进入Markdown模式' }}
          </button> -->
          <button 
            class="action-btn export-btn" 
            @click="exportNote"
          >
            导出
          </button>
          <button 
            class="action-btn return-btn" 
            @click="returnToMain"
          >
            返回
          </button>
        </div>
        <!-- <div class="save-status">
          <span v-if="isSaving" class="saving">保存中...</span>
          <span v-else-if="lastSaved" class="saved">已保存</span>
        </div> -->
      </div>
    </div>
    
    <!-- 使用自定义弹窗组件 -->
    <transition name="menu-fade">
      <CustomAlert
        :visible="showAlert"
        :message="alertMessage"
        @confirm="handleAlertConfirm"
        @close="handleAlertClose"
      />
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import CustomAlert from '../../common/CustomAlert.vue'

const props = defineProps({
  isLight: { type: Boolean, default: false }
})

const emit = defineEmits(['close'])

const noteContent = ref('')
const isSaving = ref(false)
const lastSaved = ref(null)
const noteTextarea = ref(null)

// 弹窗相关的响应式变量
const showAlert = ref(false)
const alertMessage = ref('')

let debounceTimer = null        // 1s 防抖保存
let idleSaveInterval = null     // 5s 空闲轮询保存
let lastContent = ''
let lastInputAt = 0

const SAVE_AFTER_IDLE_MS = 1000       // 停止输入 1s 后保存
const IDLE_SAVE_INTERVAL_MS = 5000    // 空闲时每 5s 检查一次

// 初始化笔记内容
onMounted(async () => {
  await loadNoteContent()
  startAutoSave()
  await nextTick()
  if (noteTextarea.value) noteTextarea.value.focus()
})

onUnmounted(() => {
  stopAutoSave()
  // 保存最终内容
  saveNoteContent()
})

// 加载笔记内容
async function loadNoteContent() {
  try {
    if (typeof window !== 'undefined' && window.noteAPI) {
      const content = await window.noteAPI.load()
      if (content) {
        noteContent.value = content
        lastContent = content
      }
    } else if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('pomodoro-note')
      if (saved) {
        noteContent.value = saved
        lastContent = saved
      }
    }
  } catch (error) {
    console.error('加载笔记失败:', error)
  }
}

// 保存笔记内容
async function saveNoteContent() {
  console.log('=====保存笔记=====')
  // 移除空内容检查，允许保存空内容
  try {
    isSaving.value = true
    if (typeof window !== 'undefined' && window.noteAPI) {
      await window.noteAPI.save(noteContent.value)
    } else if (typeof localStorage !== 'undefined') {
      localStorage.setItem('pomodoro-note', noteContent.value)
    }
    lastSaved.value = new Date()
    lastContent = noteContent.value
  } catch (error) {
    console.error('保存笔记失败:', error)
  } finally {
    isSaving.value = false
  }
}

// 1) 停止输入 1s 后保存（防抖）
function onNoteInput() {
  lastInputAt = Date.now()
  if (lastSaved.value) lastSaved.value = null
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    // 移除 trim() 检查，允许保存空内容
    if (noteContent.value !== lastContent) {
      saveNoteContent()
    }
  }, SAVE_AFTER_IDLE_MS)
}

// 2) 空闲轮询：每 5s 检查一次，如未在输入期且内容有变化则保存
function startAutoSave() {
  idleSaveInterval = setInterval(() => {
    const now = Date.now()
    const idleEnough = now - lastInputAt >= SAVE_AFTER_IDLE_MS
    // 移除 trim() 检查，允许保存空内容
    if (idleEnough && noteContent.value !== lastContent) {
      saveNoteContent()
    }
  }, IDLE_SAVE_INTERVAL_MS)
}

function stopAutoSave() {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
    debounceTimer = null
  }
  if (idleSaveInterval) {
    clearInterval(idleSaveInterval)
    idleSaveInterval = null
  }
}

// 导出笔记
async function exportNote() {
  if (!noteContent.value.trim()) {
    // 使用自定义弹窗替代 alert
    showCustomAlert('当前笔记为空，无法导出')
    return
  }
  try {
    if (typeof window !== 'undefined' && window.noteAPI) {
      await window.noteAPI.export(noteContent.value)
    } else {
      exportAsTextFile(noteContent.value)
    }
  } catch (error) {
    console.error('导出失败:', error)
    showCustomAlert('导出失败，请重试')
  }
}

// 备用导出方案
function exportAsTextFile(content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `笔记_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// 返回主页
function returnToMain() {
  // 先保存内容，然后关闭模态框
  saveNoteContent().then(() => {
    emit('close')
  }).catch(() => {
    // 即使保存失败也要关闭模态框
    console.error('退出笔记时保存失败: ', error)
    emit('close')
  })
}

// 显示自定义弹窗
function showCustomAlert(message) {
  alertMessage.value = message
  showAlert.value = true
}

// 处理弹窗确认事件
function handleAlertConfirm() {
  showAlert.value = false
  // 弹窗关闭后立即聚焦到输入框
  nextTick(() => {
    if (noteTextarea.value) {
      noteTextarea.value.focus()
    }
  })
}

// 处理弹窗关闭事件
function handleAlertClose() {
  showAlert.value = false
  // 弹窗关闭后立即聚焦到输入框
  nextTick(() => {
    if (noteTextarea.value) {
      noteTextarea.value.focus()
    }
  })
}
</script>

<style scoped>
@import '../../../assets/css/animation.css';
@import './NoteModal.css';
</style>