<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

interface Heading {
  depth: number;
  text: string;
  slug: string;
}

const props = defineProps<{
  headings: Heading[];
}>();

// 只显示 h2 和 h3
const tocHeadings = computed(() => 
  props.headings.filter((h) => h.depth === 2 || h.depth === 3)
);

const activeSlug = ref<string | null>(null);

function updateActiveLink() {
  const headingElements = Array.from(
    document.querySelectorAll<HTMLElement>('article h2, article h3')
  );
  
  if (headingElements.length === 0) return;
  
  const offset = 120;
  let current: HTMLElement | null = null;
  
  for (const heading of headingElements) {
    const rect = heading.getBoundingClientRect();
    if (rect.top <= offset + 10) {
      current = heading;
    } else {
      break;
    }
  }
  
  activeSlug.value = current?.id ?? null;
}

let scrollHandler: (() => void) | null = null;

onMounted(() => {
  scrollHandler = updateActiveLink;
  updateActiveLink();
  window.addEventListener('scroll', scrollHandler, { passive: true });
});

onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler);
  }
});
</script>

<template>
  <nav v-if="tocHeadings.length > 0" class="toc-nav">
    <h2 class="toc-title">目录</h2>
    <ul class="toc-list">
      <li
        v-for="heading in tocHeadings"
        :key="heading.slug"
        :class="['toc-item', `toc-depth-${heading.depth}`]"
      >
        <a
          :href="`#${heading.slug}`"
          :class="['toc-link', { active: activeSlug === heading.slug }]"
        >
          {{ heading.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.toc-nav {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  padding: 1.25rem;
}

.toc-title {
  font-family: "Noto Serif SC", serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--apoc-ink);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin-bottom: 0.5rem;
}

.toc-depth-2 {
  padding-left: 0;
}

.toc-depth-3 {
  padding-left: 1rem;
  font-size: 0.875rem;
}

.toc-link {
  display: block;
  color: var(--apoc-muted);
  text-decoration: none;
  padding: 0.35rem 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.15s ease;
  line-height: 1.4;
}

.toc-link:hover {
  color: var(--apoc-accent);
  background: rgba(77, 107, 232, 0.08);
}

.toc-link.active {
  color: var(--apoc-accent);
  background: var(--apoc-accent-soft);
  font-weight: 500;
}
</style>
