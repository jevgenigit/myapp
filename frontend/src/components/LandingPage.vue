<template>
  <div class="background"></div>
  <div class="landing-page">
    <div class="content-box">
      <div class="content-box-small">
        <h1>{{ $t('vppTitle') }}</h1>
        <h2>{{ $t('welcomeText') }}</h2>
        <h3 v-html="$t('landingpageText')"></h3>
        <router-link to="/main-page" class="startBtn">{{ $t('startButtonText') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
};
import '@/assets/styles/landingPage.css'; 
</script>
