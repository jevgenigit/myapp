import { ref, watch, computed } from 'vue';
import { defineStore } from 'pinia';
import { useElementStore } from './elements';

export const useWindStore = defineStore('wind', () => {
  const elementStore = useElementStore();

  const windStrength = ref(0);

  const windElement = computed(() =>
    elementStore.elements.find((el) => el.name === 'Wind park')
  );

  const minOutput = computed(() => windElement.value?.minOutput ?? 30);
  const maxOutput = computed(() => windElement.value?.maxOutput ?? 150);

  let previousWindStrength: number | null = null;
  let intervalId: ReturnType<typeof setInterval> | null = null;

  const currentMaxOutput = computed(() => {
    const range = maxOutput.value - minOutput.value;
    return Math.round((windStrength.value / 100) * range + minOutput.value);
  });

  function generateWind() {
    const variation = Math.random() * 4 - 2;
    let windStrengthPercentage: number;

    if (previousWindStrength === null) {
      windStrengthPercentage = Math.floor(Math.random() * 41) + 30;
    } else {
      windStrengthPercentage = previousWindStrength + variation;
      windStrengthPercentage = Math.min(100, Math.max(0, windStrengthPercentage));
    }

    windStrength.value = Math.round(windStrengthPercentage);
    previousWindStrength = windStrengthPercentage;
  }

  function start() {
    generateWind();
    intervalId = setInterval(generateWind, 3000);
  }

  function stop() {
    if (intervalId) clearInterval(intervalId);
  }

  watch(currentMaxOutput, (newMaxOutput) => {
    elementStore.updateElementMaxOutput('Wind park', newMaxOutput);
  });

  return {
    windStrength,
    currentMaxOutput,
    start,
    stop,
  };
});
