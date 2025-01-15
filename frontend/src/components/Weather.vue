<template>
  <div class="weatherBox">
    <div class="component">
      <h3 class="picture">
        <span v-if="windStore.windStrength > 75"><Tornado :size="40" /></span>
        <span v-else-if="windStore.windStrength > 40"><Wind :size="35" /></span>
        <span v-else-if="windStore.windStrength > 10"><EqualApproximately :size="30" /></span>
        <span v-else><EqualNot :size="25" /></span>
      </h3>
      <p class="text">{{ $t('windStrength') }}</p>
      <div class="slider-container">
        <input
          type="range"
          v-model="windStore.windStrength"
          :min="minWind"
          :max="maxWind"
          step="1"
          class="w-64 max-w-xs wind-range"
          :disabled="isSliderDisabled"
        />
        <p class="bold text">{{ windStore.windStrength }}%</p>
      </div>
    </div>

    <div class="component">
      <h3 class="picture">
        <span v-if="solarStore.sunExposure > 75"><Sun :size="37" /></span>
        <span v-else-if="solarStore.sunExposure > 40"><SunMedium :size="35" /></span>
        <span v-else-if="solarStore.sunExposure > 10"><SunDim :size="30" /></span>
        <span v-else><MoonStar :size="25" /></span>
      </h3>
      <p class="text">{{ $t('solarStrength') }}</p>
      <div class="slider-container">
        <input
          type="range"
          v-model="solarStore.sunExposure"
          :min="minSunExposure"
          :max="maxSunExposure"
          step="1"
          class="w-64 max-w-xs sun-range"
          :disabled="isSliderDisabled"
        />
        <p class="bold text">{{ solarStore.sunExposure }}%</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useWindStore } from '@/stores/wind';
import { useSolarStore } from '@/stores/solar';
import { EqualNot, EqualApproximately, Wind, Tornado, Sun, SunMedium, SunDim, MoonStar } from 'lucide-vue-next';

const windStore = useWindStore();
const solarStore = useSolarStore();

const minWind = 0;
const maxWind = 100;
const minSunExposure = 0;
const maxSunExposure = 100;

const isSliderDisabled = ref(true);

onMounted(() => {
  windStore.start();
  solarStore.start();
});

onUnmounted(() => {
  windStore.stop();
  solarStore.stop();
});
</script>

<style scoped>
.picture {
  min-height: 40px;
  width: 100%;
  justify-content: center;
  align-items: center;
  place-items: center;
  margin-bottom: 1%;
  display: flex;
}

.text {
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 2%;
  margin-bottom: 1%;
}

.text.bold{
  font-weight: bold;
}

.component {
  justify-content: center;
  align-items: center;
  place-items: center;
  display: column;
  width: 38%;
  margin-left: 2%;
  margin-right: 2%;
}

.weatherBox {
  width: 100%;
  height: 11vh;
  background-color: rgb(255, 255, 255);
  place-items: center;
  justify-content: center;
  align-items: center;
  padding-bottom: 3%;
  display: flex;
}

.slider-container {
  position: relative;
  width: 100%; 
  display: flex;
  flex-direction: column;
  align-items: center;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%; 
  cursor: default;
  border-radius: 15px;
  height: 13px;
  border: 1px solid #ffe7e7;
  justify-content: center;
  align-items: center;
  place-items: center;
}

input[type="range"].wind-range {
  background: linear-gradient(to right, rgb(196, 240, 255), rgb(45, 159, 253));
  border: 1px solid #82c0ff;
}

input[type="range"].wind-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 13px;
  width: 3px;
  background-color: rgb(17, 0, 255);
  border-radius: 0%;
  transition: .2s ease-in-out;
}

input[type="range"].wind-range::-webkit-slider-thumb:hover {
  box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
}

input[type="range"].sun-range {
  background: linear-gradient(to right, rgb(255, 255, 0), rgb(255, 141, 34));
  border: 1px solid #ffdf00;
}

input[type="range"].sun-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 13px;
  width: 3px;
  background-color: rgb(255, 98, 0);
  border-radius: 0%; 
  transition: .2s ease-in-out;
}

input[type="range"].sun-range::-webkit-slider-thumb:hover {
  box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
}
</style>
