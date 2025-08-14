<template>
  <div v-if="visible" class="custom-alert-overlay" @click="handleOverlayClick">
    <div class="custom-alert" @click.stop>
      <div class="alert-content">
        <p class="alert-message">{{ message }}</p>
        <button class="alert-btn" @click="handleConfirm">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['confirm', 'close'])

const handleOverlayClick = () => {
  emit('close')
}

const handleConfirm = () => {
  emit('confirm')
}
</script>

<style scoped>
.custom-alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.custom-alert {
  background: rgb(35, 39, 46);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  max-width: 300px;
  text-align: center;
  border: 1px solid #3a3f5a;
}

.alert-content p {
  margin: 0 0 20px 0;
  color: #e0e6f0;
  font-size: 14px;
  line-height: 1.5;
}

.alert-btn {
  background: #2f3241;
  color: #e0e6f0;
  border: 1px solid #3a3f5a;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.alert-btn:hover {
  background: #49507a;
  border-color: #6c7ae0;
  color: #fff;
}

.alert-btn:active {
  background: #3a3f5a;
}

/* 浅色模式样式 */
body.light .custom-alert-overlay {
  background: rgba(0, 0, 0, 0.12);
}

body.light .custom-alert {
  background: #ffffff;
  border: 1px solid #bbb;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

body.light .alert-content p {
  color: #2f3241;
}

body.light .alert-btn {
  background: #f0f0f0;
  color: #2f3241;
  border: 1px solid #bbb;
}

body.light .alert-btn:hover {
  background: #e0e0e0;
  border-color: #bbb;
  color: #2f3241;
}

body.light .alert-btn:active {
  background: #d0d0d0;
}
</style>
