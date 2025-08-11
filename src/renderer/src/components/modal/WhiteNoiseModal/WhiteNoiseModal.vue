<template>
  <div class="white-noise-modal">
    <div class="white-noise-content">
      <h3>白噪声播放</h3>
      <div class="white-noise-list">
        <div
          v-for="sound in sounds"
          :key="sound.key"
          class="white-noise-card"
          :class="{ playing: playingList[sound.key] }"
          @click="toggleSound(sound.key)"
        >
          <div class="icon" v-html="isLight ? soundIcons[sound.key].light : soundIcons[sound.key].dark"></div>
          <div class="label">{{ sound.label }}</div>
          <input
            type="range"
            min="0"
            max="100"
            :value="volumes[sound.key]"
            @input.stop="setVolume(sound.key, $event.target.value)"
            @click.stop
            :disabled="!playingList[sound.key]"
            aria-label="音量"
          />
        </div>
      </div>
      <div class="white-noise-actions">
        <button @click="emit('close')">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { sounds, soundIcons } from '../../../config/index.js'

defineProps({
  isLight: { type: Boolean, default: false }
})
const emit = defineEmits(['close'])

const playingList = ref({})
const volumes = ref({})

const audioMap = {}

sounds.forEach(s => {
  volumes.value[s.key] = 50
  playingList.value[s.key] = false
})

function toggleSound(key) {
  if (!audioMap[key]) {
    audioMap[key] = new Audio(sounds.find(s => s.key === key).src)
    audioMap[key].loop = true
    audioMap[key].volume = volumes.value[key] / 100
  }
  if (playingList.value[key]) {
    audioMap[key].pause()
    playingList.value[key] = false
  } else {
    audioMap[key].volume = volumes.value[key] / 100
    audioMap[key].play()
    playingList.value[key] = true
  }
}

function setVolume(key, val) {
  volumes.value[key] = Number(val)
  if (audioMap[key]) {
    audioMap[key].volume = volumes.value[key] / 100
  }
}
</script>

<style scoped>
  @import './WhiteNoiseModal.css';
</style>