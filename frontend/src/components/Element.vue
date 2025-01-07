<template>
  <div class="card">
    <div class="image-container">
      <img :src="element.image" alt="Image description" class="image" />
    </div>
    <div class="text-values">
      <p><span class="bold-text element-name">{{ $t(element.name) }}</span></p>
      <p>{{ $t('current') }} {{ $t(isProduction) }} <span class="bold-text">{{ modelValue }} {{ $t('mw') }}</span></p>
    </div>

      <div class="slider-container">
        <span class="slider-value left">{{ minNr }} {{ $t('mw') }}</span>
        <input
          id="slider"
          type="range"
          v-model="localValue"
          :min="minNr"
          :max="maxNr"
          :step="step"
          class="slider"
        />
        <span class="slider-value right">{{ maxNr }} {{ $t('mw') }}</span>
      </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useElementStore } from '@/stores/elements';
import { useI18n } from 'vue-i18n'; 
import '@/assets/styles/elementComponent.css'; 

const props = defineProps({
  elementName: String,
  elementType: String,
  isProduction: String, 
  maxNr: Number, 
  minNr: Number,
  step: Number, 
  modelValue: Number,
  image: String, 
});

const emit = defineEmits(['update:modelValue']);
const elementStore = useElementStore();
const { t } = useI18n(); 

const element = computed(() =>
  elementStore.elements.find(el => el.name === props.elementName)
);

const localValue = computed({
  get() {
    return props.isProduction === "Production:"
      ? element.value.currentOutput
      : element.value.currentConsumption;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
    elementStore.updateElementValue(props.elementName, newValue, props.isProduction === "Production:");
  },
});
</script>
