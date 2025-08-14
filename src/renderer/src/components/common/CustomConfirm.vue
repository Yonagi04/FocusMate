<template>
  <div v-if="visible" class="custom-confirm-overlay" @click="handleOverlayClick">
    <div class="custom-confirm" @click.stop>
      <div class="confirm-content">
        <p class="confirm-message">{{ message }}</p>
        <div class="confirm-buttons">
          <button class="confirm-btn confirm-btn" @click="handleConfirm">确定</button>
          <button class="confirm-btn cancel-btn" @click="handleCancel">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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

const emit = defineEmits(['confirm', 'cancel', 'close'])

const handleOverlayClick = () => {
  emit('close')
}

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.custom-confirm-overlay {
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

.custom-confirm {
  background: rgb(35, 39, 46);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  max-width: 300px;
  text-align: center;
  border: 1px solid #3a3f5a;
}

.confirm-content p {
  margin: 0 0 20px 0;
  color: #e0e6f0;
  font-size: 14px;
  line-height: 1.5;
}

.confirm-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.confirm-btn {
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  border: 1px solid;
  min-width: 60px;
}

.cancel-btn {
  background: #2f3241;
  color: #e0e6f0;
  border-color: #3a3f5a;
}

.cancel-btn:hover {
  background: #49507a;
  border-color: #6c7ae0;
  color: #fff;
}

.cancel-btn:active {
  background: #3a3f5a;
}

.confirm-btn.confirm-btn {
  background: #2f3241;
  color: #e0e6f0;
  border-color: #3a3f5a;
}

.confirm-btn.confirm-btn:hover {
  background: #49507a;
  border-color: #6c7ae0;
  color: #fff;
}

.confirm-btn.confirm-btn:active {
  background: #3a3f5a;
}

/* 浅色模式样式 */
body.light .custom-confirm-overlay {
  background: rgba(0, 0, 0, 0.12);
}

body.light .custom-confirm {
  background: #ffffff;
  border: 1px solid #bbb;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

body.light .confirm-content p {
  color: #2f3241;
}

body.light .cancel-btn {
  background: #f0f0f0;
  color: #2f3241;
  border-color: #bbb;
}

body.light .cancel-btn:hover {
  background: #e0e0e0;
  border-color: #bbb;
  color: #2f3241;
}

body.light .cancel-btn:active {
  background: #d0d0d0;
}

body.light .confirm-btn.confirm-btn {
  background: #f0f0f0;
  color: #2f3241;
  border-color: #bbb;
}

body.light .confirm-btn.confirm-btn:hover {
  background: #e0e0e0;
  border-color: #bbb;
  color: #2f3241;
}

body.light .confirm-btn.confirm-btn:active {
  background: #d0d0d0;
}
</style>
