import { ref, watch, computed } from 'vue';
import { defineStore } from 'pinia';
import { useElementStore } from './elements';

export const useSolarStore = defineStore('solar', () => {
  const elementStore = useElementStore();

  const sunExposure = ref(0);

  const solarElement = computed(() =>
    elementStore.elements.find((el) => el.name === 'Solar park')
  );

  const minOutput = computed(() => solarElement.value?.minOutput ?? 0);
  const maxOutput = computed(() => solarElement.value?.maxOutput ?? 150);

  const currentMaxOutput = computed(() => {
    const range = maxOutput.value - minOutput.value; 
    return Math.round((sunExposure.value / 100) * range + minOutput.value);
  });

  let previousSolarStrength: number | null = null;
  let intervalId: ReturnType<typeof setInterval> | null = null;

  function generateSolarEnergy() {
    const variation = Math.random() * 3 - 1.5;
    let sunExposurePercentage;

    if (previousSolarStrength === null) {
      sunExposurePercentage = Math.floor(Math.random() * 41) + 40;
    } else {
      sunExposurePercentage = previousSolarStrength + variation;
      sunExposurePercentage = Math.min(100, Math.max(0, sunExposurePercentage));
    }

    sunExposure.value = Math.round(sunExposurePercentage);
    previousSolarStrength = sunExposurePercentage;

  }

  function start() {
    generateSolarEnergy();
    intervalId = setInterval(generateSolarEnergy, 3000);
  }

  function stop() {
    if (intervalId) clearInterval(intervalId);
  }

  watch(currentMaxOutput, (newMaxOutput) => {
    elementStore.updateElementMaxOutput('Solar park', newMaxOutput);
  });

  return {
    sunExposure,
    currentMaxOutput,
    start,
    stop,
  };
});
