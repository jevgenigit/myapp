<template>

  <div
    :class="'all'"
    :style="{
      backgroundColor: countdownStore.isBlackout ? '#232323' : 'rgb(246, 247, 250)',
      transition: countdownStore.isBlackout ? 'background-color 10s' : 'background-color 2s'
    }">
    <div class="weatherDisplay">
      <Weather />
    </div>

    <BlackoutPopUp :showPopup="countdownStore.showPopup" @update:visible="countdownStore.showPopup = $event" />
    <div class="frequencyDisplay">
      <FrequencyElement />
    </div>
    <div class="summaryDisplay">
      <SummaryDisplay :isProduction="true" title="Production" />
    </div>
    <div class="consumerProducerElement consumerProducerElementProducers">
      <ConsumerProducerElement section="producers" />
    </div>
    <div class="summaryDisplay">
      <SummaryDisplay :isProduction="false" title="Consumption" />
    </div>
    <div class="consumerProducerElement consumerProducerElementConsumers">
      <ConsumerProducerElement section="consumers" />
    </div>
  </div>
</template>

<script setup>
import Weather from './Weather.vue';  
import { watch } from 'vue';
import ConsumerProducerElement from './ConsumerProducerElement.vue'; 
import FrequencyElement from "@/components/FrequencyDisplay.vue";
import SummaryDisplay from './SummaryDisplay.vue';
import BlackoutPopUp from "./BlackoutPopUp.vue";
import { useElementStore } from "@/stores/elements.ts";
import { useCountdownStore } from "@/stores/countdownStore";
import { useScrollLock } from '@vueuse/core';
import '@/assets/styles/mainPageLayout.css';

useScrollLock(document, true);

const elementStore = useElementStore();
const countdownStore = useCountdownStore();

watch( 
  () => elementStore.calculateCurrentFrequency,
  (newFrequency) => {
    countdownStore.updateFrequency(newFrequency);
  }
);
</script>
