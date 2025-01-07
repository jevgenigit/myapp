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
