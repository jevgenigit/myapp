<template>
    <div v-if="showPopup" class="popup-overlay">
        <div class="content-box">
            <div class="content-box-small">
                <h1 class="h2">{{ $t('blackoutHeader') }}</h1>
                <h3>{{ $t('blackoutText') }}</h3>
            <button @click.stop="closePopup" class="startBtn">{{ $t('blackoutStartOver') }}</button>
        </div>
    </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import '@/assets/styles/popUpStyle.css'; 

const props = defineProps({
  showPopup: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['update:visible']);

function closePopup() {
    window.location.reload();
    emit('update:visible', false);
}
</script>
