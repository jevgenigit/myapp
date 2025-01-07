<template>
  <div class="lang-buttons">
    <button
      class="btn"
      :class="{ active: locale === 'en' }"
      @click="setLanguage('en')"
    >
      EN
    </button>
    <button
      class="btn"
      :class="{ active: locale === 'et' }"
      @click="setLanguage('et')"
    >
      ET
    </button>
    <button
      class="btn"
      :class="{ active: locale === 'ru' }"
      @click="setLanguage('ru')"
    >
      RU
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { onMounted } from 'vue';
import '@/assets/styles/headerComponent.css';  


const { locale } = useI18n();

const setLanguage = (lang: string) => {
  locale.value = lang;
  localStorage.setItem('language', lang);
  console.log('Language set to:', lang);
};

onMounted(() => {
  const savedLang = localStorage.getItem('language');
  if (savedLang) {
    locale.value = savedLang;
  }
});
</script>
