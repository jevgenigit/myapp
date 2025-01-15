import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCountdownStore = defineStore('countdown', () => {
  const countdown = ref(0)
  const isCountingDown = ref(false)
  const showPopup = ref(false)
  const isBlackout = ref(false)
  const lowerThreshold = ref(49.0)
  const upperThreshold = ref(51.0)
  let countdownInterval: ReturnType<typeof setInterval> | null = null

  function startCountdown(initialValue = 10) {
    if (isCountingDown.value) return
    isCountingDown.value = true
    showPopup.value = false
    countdown.value = initialValue

    countdownInterval = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value--
      } else {
        stopCountdown()
        showPopup.value = true
      }
    }, 1000)
  }

  function stopCountdown() {
    isCountingDown.value = false
    if (countdownInterval) {
      clearInterval(countdownInterval)
      countdownInterval = null
    }
    countdown.value = 0
  }

  function updateFrequency(frequency: number) {
    if (frequency <= lowerThreshold.value || frequency >= upperThreshold.value) {
      if (!isCountingDown.value) {
        startCountdown(10)
        isBlackout.value = true
      }
    } else {
      if (isCountingDown.value) {
        stopCountdown()
        isBlackout.value = false
      }
    }
  }

  return {
    countdown,
    isCountingDown,
    showPopup,
    isBlackout,
    lowerThreshold,
    upperThreshold,
    startCountdown,
    stopCountdown,
    updateFrequency,
  }
})
