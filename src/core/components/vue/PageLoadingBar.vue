<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isLoading = ref(false);
const progress = ref(0);
let progressInterval: ReturnType<typeof setInterval> | null = null;

function startLoading() {
  isLoading.value = true;
  progress.value = 0;
  
  progressInterval = setInterval(() => {
    progress.value += Math.random() * 30;
    if (progress.value > 90) progress.value = 90;
  }, 100);
}

function stopLoading() {
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
  progress.value = 100;
  
  setTimeout(() => {
    isLoading.value = false;
    progress.value = 0;
  }, 300);
}

function runCascade() {
  // 重置导航栏动画
  const header = document.querySelector<HTMLElement>('.glass-nav');
  if (header) {
    header.style.animation = 'none';
    header.style.opacity = '0';
    void header.offsetHeight;
    header.style.animation = '';
  }
  
  // 重置内容级联动画
  document.querySelectorAll<HTMLElement>('[data-cascade]').forEach((el) => {
    const idx = parseInt(el.dataset.cascade ?? '0');
    el.style.animation = 'none';
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    void el.offsetHeight;
    el.style.animation = '';
    el.style.animationDelay = `${idx * 85 + 150}ms`;
  });
}

function handleBeforePreparation() {
  startLoading();
}

function handlePageLoad() {
  stopLoading();
  runCascade();
}

onMounted(() => {
  document.addEventListener('astro:before-preparation', handleBeforePreparation);
  document.addEventListener('astro:page-load', handlePageLoad);
  
  // 首次加载也运行 cascade
  runCascade();
});

onUnmounted(() => {
  document.removeEventListener('astro:before-preparation', handleBeforePreparation);
  document.removeEventListener('astro:page-load', handlePageLoad);
  
  if (progressInterval) {
    clearInterval(progressInterval);
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="loading">
      <div
        v-if="isLoading"
        class="page-loading-bar"
        :style="{ width: progress + '%' }"
      />
    </Transition>
  </Teleport>
</template>

<style scoped>
.page-loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--apoc-accent), rgba(var(--apoc-accent-rgb), 0.6));
  z-index: 9999;
  transition: width 0.3s ease;
  box-shadow: 0 0 10px rgba(var(--apoc-accent-rgb), 0.5);
}

.loading-leave-active {
  transition: opacity 0.3s ease;
}

.loading-leave-to {
  opacity: 0;
}
</style>
