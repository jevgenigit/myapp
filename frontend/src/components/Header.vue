<template>
  <header class="app-header">
    <div class="left-section">
      <button @click="goToLandingPage" class="logo-button">
        <img src="@/assets/images/logo.png" alt="Logo" />
      </button>

      <div class="center-buttons" v-if="isMainPage">
        <MainPageButtons />
      </div>
    </div>
    <LanguageButtons />
  </header>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LanguageButtons from './LanguageButtons.vue';
import '../assets/styles/headerComponent.css';
import MainPageButtons from './MainPageButtons.vue';

const route = useRoute();
const router = useRouter();
const isMainPage = ref(false);

watchEffect(() => {
  console.log('Current route name:', route.name);
  isMainPage.value = route.name === 'MainPage';
  console.log('isMainPage:', isMainPage.value);
});

const goToLandingPage = () => {
  router.push('/');
};

</script>
