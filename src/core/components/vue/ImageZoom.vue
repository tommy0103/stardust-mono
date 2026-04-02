<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isZoomed = ref(false);
const zoomedSrc = ref('');
const zoomedAlt = ref('');
const originalImg = ref<HTMLImageElement | null>(null);

function openZoom(img: HTMLImageElement) {
  zoomedSrc.value = img.src;
  zoomedAlt.value = img.alt;
  originalImg.value = img;
  img.style.visibility = 'hidden';
  document.body.style.overflow = 'hidden';
  isZoomed.value = true;
}

function closeZoom() {
  isZoomed.value = false;
  if (originalImg.value) {
    originalImg.value.style.visibility = '';
  }
  document.body.style.overflow = '';
  zoomedSrc.value = '';
  zoomedAlt.value = '';
  originalImg.value = null;
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isZoomed.value) {
    closeZoom();
  }
}

function initImageListeners() {
  const images = document.querySelectorAll<HTMLImageElement>('article img');
  images.forEach((img) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      openZoom(img);
    });
  });
}

onMounted(() => {
  initImageListeners();
  document.addEventListener('keydown', handleKeydown);
  
  // 监听 Astro 页面导航，重新绑定事件
  document.addEventListener('astro:page-load', initImageListeners);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.removeEventListener('astro:page-load', initImageListeners);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="zoom">
      <div v-if="isZoomed" class="image-zoom-overlay" @click="closeZoom">
        <div class="image-zoom-backdrop" />
        <img
          :src="zoomedSrc"
          :alt="zoomedAlt"
          class="image-zoom-img"
          @click.stop="closeZoom"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.image-zoom-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
}

.image-zoom-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
}

.image-zoom-img {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 0.5rem;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
  cursor: zoom-out;
}

/* 过渡动画 */
.zoom-enter-active,
.zoom-leave-active {
  transition: opacity 0.25s ease;
}

.zoom-enter-active .image-zoom-img,
.zoom-leave-active .image-zoom-img {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
}

.zoom-enter-from .image-zoom-img,
.zoom-leave-to .image-zoom-img {
  transform: scale(0.9);
  opacity: 0;
}
</style>
