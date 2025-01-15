import { ref, computed, onMounted, onUnmounted } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(40)
  const doubleCount = computed(() => count.value * 2)  
  function increment() {
    count.value++
  }
  let intervalId = null

  onMounted(() => {
    intervalId = setInterval(() => {
      count.value += 5 
    }, 3000)
  })

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  return { count, doubleCount, increment }
})