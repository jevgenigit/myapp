<template>
  <div class="summary-container">
    <div class="top-section-container">
      <h2>
        {{ isProduction ? $t('Producers:') : $t('Consumers:') }}
      </h2>
      <div class="total-value">
        {{ totalValue }} {{ $t('mw') }}
      </div>
      <div class="total">
        {{ $t('Total') }} {{ isProduction ? $t('Production:') : $t('Consumption:') }}
      </div>
    </div>
    <div
      class="bottom-section-container"
      :class="{ 'transparent': isFrequencyNormal }">
      <div class="message" v-if="!isFrequencyNormal">
        {{ currentMessage }}
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useElementStore } from "@/stores/elements";
import "@/assets/styles/summaryComponent.css";

const { t } = useI18n();

const props = defineProps({
isProduction: { type: Boolean, required: true },
title: { type: String, required: true },
});

const elementStore = useElementStore();

const totalValue = computed(() => {
return elementStore.elements
  .filter((element) => element.isProducer === props.isProduction)
  .reduce((total, element) => {
    const value = props.isProduction ? element.currentOutput : element.currentConsumption;
    return total + parseFloat(value || 0);
  }, 0);
});

const isFrequencyNormal = computed(() => {
const frequency = elementStore.calculateCurrentFrequency;
return frequency >= 49.3 && frequency <= 50.7;
});

const currentMessage = computed(() => {
const producersTotal = elementStore.elements
  .filter((el) => el.isProducer)
  .reduce((total, el) => total + parseFloat(el.currentOutput || 0), 0);

const consumersTotal = elementStore.elements
  .filter((el) => !el.isProducer)
  .reduce((total, el) => total + parseFloat(el.currentConsumption || 0), 0);


if (!isFrequencyNormal.value) {
  if (props.isProduction) {
    if (producersTotal < consumersTotal) {
      return t("MakeProductionBigger");
    }
    if (producersTotal > consumersTotal) {
      return t("MakeProductionSmaller");
    }
  } else {
    if (consumersTotal < producersTotal) {
      return t("MakeConsumptionBigger");
    }
    if (consumersTotal > producersTotal) {
      return t("MakeConsumptionSmaller");
    }
  }
}
return "";
});
</script>
