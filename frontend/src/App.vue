<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Header from './components/Header.vue';
</script>

<template>
  <div>
    <Header />
        <main>
      <RouterView />
    </main>
  </div>
</template>
