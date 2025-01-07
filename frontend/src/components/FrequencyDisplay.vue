<template>
  <div class="frequency-element">
    <div class="frequency-value">{{ currentFrequency.toFixed(2) }} Hz</div>
    <div class="frequency-bar-container">
      <div class="frequency-bar">
        <Zap class="indicator" stroke-width="1":style="{ left: `${indicatorPosition}%` }" />
      </div>
      <div class="labels">
        <span>49</span>
        <span>50</span>
        <span>51</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useElementStore } from "@/stores/elements";
import { Zap } from "lucide-vue-next";
import '@/assets/styles/frequencyComponent.css'; 

const elementStore = useElementStore(); 

const currentFrequency = computed(() => elementStore.calculateCurrentFrequency);

const indicatorPosition = computed(() => {
  const minFrequency = 49;
  const maxFrequency = 51;
  const range = maxFrequency - minFrequency;
  const position = ((currentFrequency.value - minFrequency) / range) * 100;
  return Math.min(100, Math.max(0, position));
});
</script>

