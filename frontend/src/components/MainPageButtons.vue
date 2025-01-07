<template>
  <div class="buttons">
    <button class="btn" @mouseover="displayInfo(true)" @mouseleave="displayInfo(false)">
      <Info :size="23" style="color: white;" />
      <span class="button-text">{{ $t('information') }}</span>
    </button>
    
    <div v-show="showInfoText" class="infoText" :class="{ visible: showInfoText }">
      <p>{{ $t('infoText') }}</p>
    </div>

    <button class="btn" @click="editGame">
      <Pencil :size="23" style="color: white;" />
      <span class="button-text">{{ $t('editGame') }}</span>
    </button>

    <button class="btn" @click="restart">
      <RefreshCw :size="23" style="color: white;" />
      <span class="button-text">{{ $t('restartGame') }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RefreshCw, Info, Pencil } from 'lucide-vue-next';
import '@/assets/styles/mainPageButtons.css';

const showInfoText = ref(false);

const editGame = () => {
};

const displayInfo = (isHovered) => {
  showInfoText.value = isHovered;
};

const restart = () => {
  window.location.reload();
};
</script>
