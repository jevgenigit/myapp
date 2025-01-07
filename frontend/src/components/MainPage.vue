<template>
  <div class="all">
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
import { useScrollLock } from '@vueuse/core';
import ConsumerProducerElement from './ConsumerProducerElement.vue';
import FrequencyElement from '@/components/FrequencyDisplay.vue';
import SummaryDisplay from './SummaryDisplay.vue';
import '@/assets/styles/mainPageLayout.css';

useScrollLock(document, true); 
</script>

