<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import PomodoroTimer from './components/PomodoroTimer.vue'
import MarkdownEditor from './components/modal/MarkdownEditor/MarkdownEditor.vue'

// 响应式路由状态
const currentRoute = ref('main')
const currentHash = ref('')
const isDev = ref(process.env.NODE_ENV === 'development')

// 监听hash变化
function updateRoute() {
  try {
    if (typeof window !== 'undefined' && window.location) {
      currentHash.value = window.location.hash
      currentRoute.value = window.location.hash.slice(1) || 'main'
      console.log('路由更新:', currentRoute.value, 'Hash:', currentHash.value)
    }
  } catch (error) {
    console.error('更新路由失败:', error)
    currentRoute.value = 'main'
    currentHash.value = ''
  }
}

onMounted(() => {
  try {
    updateRoute()
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', updateRoute)
    }
  } catch (error) {
    console.error('初始化路由失败:', error)
  }
})

// 计算属性
const isMarkdownRoute = computed(() => currentRoute.value === 'markdown')

// 路由导航函数
function goToMain() {
  try {
    if (typeof window !== 'undefined') {
      window.location.hash = 'main'
    }
    currentRoute.value = 'main'
    currentHash.value = '#main'
  } catch (error) {
    console.error('导航到主页失败:', error)
    currentRoute.value = 'main'
    currentHash.value = '#main'
  }
}
</script>

<template>
  <div id="app">
    <PomodoroTimer v-if="!isMarkdownRoute" />
    <MarkdownEditor v-else @close="goToMain" />
  </div>
</template>

<style lang="less">
@import './assets/css/styles.less';
</style>
