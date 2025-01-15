<template>
  <div class="card" :class="{ 'edit-mode-glow': isEditing }">
    <div class="button-container">
      <button class="top-right-button" @click="isEditing ? saveChanges() : toggleEditMode()">
        <SquarePen v-if="!isEditing" class="edit-icon" />
        <CheckIcon v-else class="icon save-icon" />
      </button>
      <button v-if="isEditing" class="top-right-cancel" @click="cancelChanges">
        <XIcon class="icon cancel-icon" /> 
      </button>
    </div>
    <div class="image-container">
      <img :src="element.image" :alt="$t('Image description')" class="image" />
    </div>
    <div v-if="!isEditing" class="text-values">
      <p><span class="bold-text element-name">{{ $t(element.name) }}</span></p>
      <p>{{ $t('current') }} {{ $t(isProduction) }} 
        <span class="bold-text">{{ modelValue }} {{ $t('mw') }}</span>
      </p>
    </div>
    <div v-if="!isEditing" class="slider-container">
      <span class="slider-value left">{{ minNr }} {{ $t('mw') }}</span>
        <input
          id="slider"
          type="range"
          v-model="localValue"
          :min="minNr"
          :max="maxNr"
          :step="step"
          class="slider"
          @input="handleSliderInput"
          :style="sliderStyle"
        />
      <span class="slider-value right">{{ maxNr }} {{ $t('mw') }}</span>
    </div>
    <div v-if="isEditing" class="edit-mode">
      <div class ="text-values-edit">
      <p><span class="bold-text element-name">{{ $t(element.name) }}</span></p>
    </div>
      <div class="settings-container">
        <label>
          {{ $t('min') }}
        </label>
          <input 
            type="number" 
            v-model="tempValues.minNr"
            :class="{ 'error': isMinInvalid }"
            class="input-field"
          />
        <label>
          {{ $t('max') }}
        </label>
          <input 
            type="number" 
            v-model="tempValues.maxNr"
            :class="{ 'error': isMaxInvalid }"
            class="input-field"
          />
        <label>
          {{ $t('step') }}
        </label>
          <input 
            type="number" 
            v-model="tempValues.step"
            :class="{ 'error': isStepInvalid }"
            class="input-field"
          />
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { computed, ref, watch } from 'vue';
import { useElementStore } from '@/stores/elements';
import { useI18n } from 'vue-i18n';
import { SquarePen, CheckIcon, XIcon } from 'lucide-vue-next';
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

const emit = defineEmits(['update:minNr', 'update:maxNr', 'update:step', 'update:modelValue']);

const isEditing = ref(false);
const originalValues = ref({ minNr: props.minNr, maxNr: props.maxNr, step: props.step });

const tempValues = ref({
  minNr: props.minNr,
  maxNr: props.maxNr,
  step: props.step,
});

const isMinInvalid = computed(() => tempValues.value.minNr === "" || tempValues.value.minNr < 0 || tempValues.value.minNr >= tempValues.value.maxNr);
const isMaxInvalid = computed(() => tempValues.value.maxNr < 0 || tempValues.value.maxNr <= tempValues.value.minNr);
const isStepInvalid = computed(() => tempValues.value.step <= 0 || tempValues.value.step > Math.abs(tempValues.value.maxNr - tempValues.value.minNr));

const toggleEditMode = () => {
  isEditing.value = true;
};

const saveChanges = () => {
  if (isMinInvalid.value || isMaxInvalid.value || isStepInvalid.value) {
    return;
  }
  emit('update:minNr', tempValues.value.minNr);
  emit('update:maxNr', tempValues.value.maxNr);
  emit('update:step', tempValues.value.step); 
  isEditing.value = false;
};

const cancelChanges = () => {
  tempValues.value = { ...originalValues.value };
  isEditing.value = false;
};

const elementStore = useElementStore();
const { t } = useI18n();

const element = computed(() => 
  elementStore.elements.find(el => el.name === props.elementName)
);
 
const hasCurrentMaxOutput = computed(() => {
  return (
    element.value?.currentMaxOutput !== null &&
    element.value?.currentMaxOutput !== undefined
  );
});
 
const computedMaxLimit = computed(() => {
  if (element.value?.isProducer) {
    return hasCurrentMaxOutput.value
      ? element.value.currentMaxOutput
      : element.value?.maxOutput;
  } else {
    return element.value?.maxConsumption;
  }
});
 
const localValue = computed({
  get() {
    return props.isProduction === 'Production:'
      ? element.value.currentOutput
      : element.value.currentConsumption;

    return Math.max(props.minNr, Math.min(props.maxNr, value));
  },
  set(newValue) {
    const validValue = Math.min(newValue, computedMaxLimit.value);
    emit('update:modelValue', validValue);
 
    elementStore.updateElementValue(
      props.elementName,
      validValue,
      props.isProduction === 'Production:'
    );
  },
});
 
const sliderStyle = computed(() => {
  if (!hasCurrentMaxOutput.value) {
    return {
      background: '#97e66a',
    };
  }
 
  const minVal = props.minNr;
  const maxVal = props.maxNr;
  const maxAllowed = computedMaxLimit.value;
 
  const clampedMaxAllowed = Math.max(minVal, Math.min(maxAllowed, maxVal));
  const greenPercent =
    ((clampedMaxAllowed - minVal) / (maxVal - minVal)) * 100 || 0;
 
  return {
    background: `linear-gradient(to right,
      #97e66a 0%,
      #97e66a ${greenPercent}%,
      lightgray ${greenPercent}%,
      lightgray 100%)`,
  };
});
 
const handleSliderInput = (event) => {
  const newValue = parseFloat(event.target.value);
 
  if (!hasCurrentMaxOutput.value) {
    const clampedValue = Math.min(newValue, computedMaxLimit.value);
    event.target.value = clampedValue;
    emit('update:modelValue', clampedValue);
    elementStore.updateElementValue(
      props.elementName,
      clampedValue,
      props.isProduction === 'Production:'
    );
    return;
  }
 
  if (newValue > computedMaxLimit.value) {
    event.target.value = computedMaxLimit.value;
    emit('update:modelValue', computedMaxLimit.value);
    elementStore.updateElementValue(
      props.elementName,
      computedMaxLimit.value,
      props.isProduction === 'Production:'
    );
  } else {
    emit('update:modelValue', newValue);
    elementStore.updateElementValue(
      props.elementName,
      newValue,
      props.isProduction === 'Production:'
    );
  }
};
 
watch(computedMaxLimit, (newMaxOutput) => {
  if (localValue.value > newMaxOutput) {
    emit('update:modelValue', newMaxOutput);
    elementStore.updateElementValue(
      props.elementName,
      newMaxOutput,
      props.isProduction === 'Production:'
    );
  }
});
</script>