<template>
  <div>
    <div v-if="section === 'producers'" class="elements-container">
      <Element
        v-for="element in filteredProducers"
        :key="element.id"
        :element-name="element.name"
        :is-production="'Production:'"
        :max-nr="element.maxOutput"
        :min-nr="element.minOutput"
        :step="element.stepIncrement"
        v-model="element.currentOutput"
        :image="element.image"
        @update:minNr="(value) => elementStore.updateElementMinValue(element.name, value, true)"
        @update:maxNr="(value) => elementStore.updateElementMaxValue(element.name, value, true)"
        @update:step="(value) => elementStore.updateElementStepIncrement(element.name, value, true)"
      />
    </div>
    <div v-if="section === 'consumers'" class="elements-container">
      <Element
        v-for="element in filteredConsumers"
        :key="element.id"
        :element-name="element.name"
        :is-production="'Consumption:'"
        :max-nr="element.maxConsumption"
        :min-nr="element.minConsumption"
        :step="element.stepIncrement"
        v-model="element.currentConsumption"
        :image="element.image"
        @update:minNr="(value) => elementStore.updateElementMinValue(element.name, value, false)"
        @update:maxNr="(value) => elementStore.updateElementMaxValue(element.name, value, false)"
        @update:step="(value) => elementStore.updateElementStepIncrement(element.name, value, false)"
      />
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import { useElementStore } from "@/stores/elements";
import Element from "@/components/Element.vue";

const props = defineProps({
  section: {
    type: String,
      name: String,
      image: String,
    required: true,
  },
});

const elementStore = useElementStore();

const filteredProducers = computed (() =>
  elementStore.elements.filter((el) => el.isProducer)
);

const filteredConsumers = computed (() =>
  elementStore.elements.filter((el) => !el.isProducer)
);
</script>
