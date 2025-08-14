<template>
  <div class="markdown-editor">
    <div class="editor-header">
      <h2>Markdown编辑器</h2>
      <div class="header-actions">
        <button class="action-btn save-btn" @click="saveContent" :disabled="isSaving">
          {{ isSaving ? '保存中...' : '保存' }}
        </button>
        <button class="action-btn export-btn" @click="exportContent">
          导出
        </button>
        <button class="action-btn close-btn" @click="closeEditor">
          关闭
        </button>
      </div>
    </div>
    
    <div class="editor-body">
      <div class="editor-panel">
        <div class="panel-header">
          <h3>编辑</h3>
        </div>
        <textarea
          v-model="markdownContent"
          class="markdown-textarea"
          placeholder="在这里输入Markdown内容..."
          @input="onContentChange"
          ref="markdownTextarea"
        ></textarea>
      </div>
      
      <div class="preview-panel">
        <div class="panel-header">
          <h3>预览</h3>
        </div>
        <div class="markdown-preview" v-html="renderedContent"></div>
      </div>
    </div>
    
    <!-- 状态提示 -->
    <div class="status-bar">
      <span v-if="isSaving" class="status-saving">保存中...</span>
      <span v-else-if="lastSaved" class="status-saved">已保存</span>
      <span v-else-if="hasUnsavedChanges" class="status-unsaved">未保存的更改</span>
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
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import CustomAlert from '../../common/CustomAlert.vue'

const emit = defineEmits(['close'])

const markdownContent = ref('')
const isSaving = ref(false)
const lastSaved = ref(null)
const hasUnsavedChanges = ref(false)
const markdownTextarea = ref(null)

// 弹窗相关的响应式变量
const showAlert = ref(false)
const alertMessage = ref('')

let originalContent = ''

// 简单的Markdown渲染函数
const renderedContent = computed(() => {
  if (!markdownContent.value) return '<p class="empty-preview">暂无内容</p>'
  
  let content = markdownContent.value
  
  // 转义HTML特殊字符
  content = content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
  
  // 处理标题
  content = content.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  content = content.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  content = content.replace(/^# (.*$)/gim, '<h1>$1</h1>')
  
  // 处理粗体和斜体
  content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  content = content.replace(/\*(.*?)\*/g, '<em>$1</em>')
  
  // 处理代码块
  content = content.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
  content = content.replace(/`([^`]+)`/g, '<code>$1</code>')
  
  // 处理列表
  content = content.replace(/^\* (.*$)/gim, '<li>$1</li>')
  content = content.replace(/^- (.*$)/gim, '<li>$1</li>')
  content = content.replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>')
  
  // 处理链接
  content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
  
  // 处理换行
  content = content.replace(/\n/g, '<br>')
  
  // 包装列表项
  content = content.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
  
  return content
})

// 初始化
onMounted(async () => {
  try {
    await loadContent()
    await nextTick()
    if (markdownTextarea.value) markdownTextarea.value.focus()
    
    // 监听来自主进程的内容加载事件
    if (typeof window !== 'undefined' && window.electronAPI) {
      window.electronAPI.ipcRenderer.on('markdown-content-loaded', (content) => {
        console.log('收到Markdown内容:', content)
        markdownContent.value = content
        originalContent = content
        hasUnsavedChanges.value = false
      })
    }
    
    // 如果没有内容，设置一些示例内容
    if (!markdownContent.value) {
      markdownContent.value = `# 欢迎使用Markdown编辑器

这是一个简单的Markdown编辑器，支持以下功能：

## 基本语法

- **粗体文本** 使用 \`**文本**\`
- *斜体文本* 使用 \`*文本*\`
- \`行内代码\` 使用反引号
- [链接](https://example.com) 使用 \`[文本](链接)\`

## 代码块

\`\`\`javascript
function hello() {
  console.log("Hello, Markdown!");
}
\`\`\`

## 列表

1. 有序列表项1
2. 有序列表项2
3. 有序列表项3

- 无序列表项
- 另一个列表项

开始编辑您的笔记吧！`
      originalContent = markdownContent.value
    }
    
    console.log('MarkdownEditor组件已挂载，当前内容长度:', markdownContent.value.length)
  } catch (error) {
    console.error('MarkdownEditor组件初始化失败:', error)
  }
})

onUnmounted(() => {
  // 清理事件监听器
  try {
    if (typeof window !== 'undefined' && window.electronAPI) {
      window.electronAPI.ipcRenderer.removeAllListeners('markdown-content-loaded')
    }
  } catch (error) {
    console.error('清理事件监听器失败:', error)
  }
})

// 加载内容
async function loadContent() {
  try {
    if (typeof window !== 'undefined' && window.noteAPI) {
      const content = await window.noteAPI.load()
      if (content) {
        markdownContent.value = content
        originalContent = content
      }
    } else if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('pomodoro-note')
      if (saved) {
        markdownContent.value = saved
        originalContent = saved
      }
    }
  } catch (error) {
    console.error('加载内容失败:', error)
  }
}

// 内容变化处理
function onContentChange() {
  hasUnsavedChanges.value = markdownContent.value !== originalContent
  if (lastSaved.value) lastSaved.value = null
}

// 保存内容
async function saveContent() {
  if (!markdownContent.value.trim()) {
    showCustomAlert('当前内容为空，无法保存')
    return
  }
  
  try {
    isSaving.value = true
    
    if (typeof window !== 'undefined' && window.markdownAPI) {
      const result = await window.markdownAPI.save(markdownContent.value)
      if (result.success) {
        originalContent = markdownContent.value
        hasUnsavedChanges.value = false
        lastSaved.value = new Date()
        showCustomAlert('保存成功！')
      } else {
        throw new Error(result.error || '保存失败')
      }
    } else if (typeof localStorage !== 'undefined') {
      // 备用方案
      localStorage.setItem('pomodoro-note', markdownContent.value)
      originalContent = markdownContent.value
      hasUnsavedChanges.value = false
      lastSaved.value = new Date()
      showCustomAlert('保存成功！')
    }
  } catch (error) {
    console.error('保存失败:', error)
    showCustomAlert(`保存失败：${error.message}`)
  } finally {
    isSaving.value = false
  }
}

// 导出内容
async function exportContent() {
  if (!markdownContent.value.trim()) {
    showCustomAlert('当前内容为空，无法导出')
    return
  }
  
  try {
    if (typeof window !== 'undefined' && window.markdownAPI) {
      const result = await window.markdownAPI.export(markdownContent.value)
      if (result.success) {
        showCustomAlert('导出成功！文件已保存到下载文件夹')
      } else {
        throw new Error(result.error || '导出失败')
      }
    } else {
      // 备用导出方案
      exportAsMarkdownFile(markdownContent.value)
    }
  } catch (error) {
    console.error('导出失败:', error)
    showCustomAlert(`导出失败：${error.message}`)
  }
}

// 备用导出方案
function exportAsMarkdownFile(content) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `笔记_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.md`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  showCustomAlert('导出成功！')
}

// 关闭编辑器
function closeEditor() {
  if (hasUnsavedChanges.value) {
    if (confirm('有未保存的更改，确定要关闭吗？')) {
      closeWindow()
    }
  } else {
    closeWindow()
  }
}

// 关闭窗口
function closeWindow() {
  try {
    if (typeof window !== 'undefined' && window.electronAPI && window.electronAPI.closeWindow) {
      window.electronAPI.closeWindow()
    } else {
      emit('close')
    }
  } catch (error) {
    console.error('关闭窗口失败:', error)
    emit('close')
  }
}

// 显示自定义弹窗
function showCustomAlert(message) {
  alertMessage.value = message
  showAlert.value = true
}

// 处理弹窗确认事件
function handleAlertConfirm() {
  showAlert.value = false
  nextTick(() => {
    if (markdownTextarea.value) {
      markdownTextarea.value.focus()
    }
  })
}

// 处理弹窗关闭事件
function handleAlertClose() {
  showAlert.value = false
  nextTick(() => {
    if (markdownTextarea.value) {
      markdownTextarea.value.focus()
    }
  })
}
</script>

<style scoped>
@import '../../../assets/css/animation.css';
@import './MarkdownEditor.css';
</style>
