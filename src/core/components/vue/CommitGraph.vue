<script setup lang="ts">
import { ref, computed } from 'vue';

interface ContributionDay {
  date: string;
  contributionCount: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionWeek {
  days: ContributionDay[];
}

interface GitHubContributions {
  login: string;
  avatarUrl: string;
  totalContributions: number;
  weeks: ContributionWeek[];
}

const props = defineProps<{
  data: GitHubContributions | null;
}>();

const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

function generateMockWeeks(weekCount: number): ContributionWeek[] {
  return Array.from({ length: weekCount }, () => ({
    days: Array.from({ length: 7 }, () => {
      const r = Math.random();
      const count = r < 0.3 ? 0 : r < 0.6 ? 1 : r < 0.8 ? 3 : r < 0.95 ? 6 : 12;
      const level = (count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4) as 0 | 1 | 2 | 3 | 4;
      return { date: '', contributionCount: count, level };
    }),
  }));
}

const weeks = computed(() => 
  props.data ? props.data.weeks.slice(-26) : generateMockWeeks(26)
);

const totalContributions = computed(() => 
  props.data 
    ? props.data.totalContributions 
    : weeks.value.flatMap((w) => w.days).reduce((s, d) => s + d.contributionCount, 0)
);

const login = computed(() => props.data?.login ?? null);
const avatarUrl = computed(() => props.data?.avatarUrl ?? null);
const isMock = computed(() => !props.data);

const graphScrollRef = ref<HTMLElement | null>(null);

function handleWheel(e: WheelEvent) {
  if (!graphScrollRef.value) return;
  // 如果有明显横向分量就让浏览器自然处理
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
  // 否则把纵向滚轮映射为横向滚动，阻止页面上下滚动
  e.preventDefault();
  graphScrollRef.value.scrollLeft += e.deltaY;
}

function getTooltip(day: ContributionDay): string {
  return day.date 
    ? `${day.date}: ${day.contributionCount} contributions` 
    : `${day.contributionCount} contributions`;
}
</script>

<template>
  <article class="bento-card flex flex-col gap-4">
    <!-- Header: title + GitHub user info -->
    <div class="flex items-center justify-between">
      <h2 class="font-serif text-lg font-semibold text-[var(--apoc-ink)]">活跃度</h2>
      <a
        v-if="login"
        :href="`https://github.com/${login}`"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 rounded-full border border-[var(--glass-border-soft)] bg-white/40 px-2.5 py-1 text-xs text-[var(--apoc-muted)] transition-all hover:bg-white/60 hover:text-[var(--apoc-ink)]"
      >
        <img v-if="avatarUrl" :src="avatarUrl" :alt="login" class="h-4 w-4 rounded-full" />
        <span class="font-mono">@{{ login }}</span>
        <span class="text-[var(--apoc-faint)]">↗</span>
      </a>
      <span v-else class="text-xs text-[var(--apoc-faint)] italic">mock data</span>
    </div>

    <!-- Total count -->
    <p class="text-sm text-[var(--apoc-muted)]">
      <span class="font-medium text-[var(--apoc-ink)]">{{ totalContributions.toLocaleString() }}</span>
      contributions in the last year
      <span v-if="isMock" class="text-[var(--apoc-faint)]">（示例数据）</span>
    </p>

    <!-- Graph -->
    <div ref="graphScrollRef" class="graph-scroll" @wheel="handleWheel">
      <div class="flex gap-0.5 min-w-max">
        <div class="flex flex-col gap-[3px] pr-1.5 text-[9px] text-[var(--apoc-faint)]">
          <span
            v-for="(label, i) in dayLabels"
            :key="i"
            class="h-[11px] leading-[11px] flex items-center"
          >{{ label }}</span>
        </div>

        <div class="flex gap-[3px]">
          <div v-for="(week, wi) in weeks" :key="wi" class="flex flex-col gap-[3px]">
            <div
              v-for="(day, di) in week.days"
              :key="di"
              class="commit-cell"
              :data-level="day.level"
              :title="getTooltip(day)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="flex items-center justify-end gap-1.5 text-[10px] text-[var(--apoc-faint)]">
      <span>Less</span>
      <div class="flex gap-[2px]">
        <div v-for="lvl in [0, 1, 2, 3, 4]" :key="lvl" class="commit-cell" :data-level="lvl" />
      </div>
      <span>More</span>
    </div>
  </article>
</template>

<style scoped>
.graph-scroll {
  overflow-x: auto;
  overflow-y: hidden;
  touch-action: pan-x;
  scrollbar-width: none;
}

.graph-scroll::-webkit-scrollbar {
  display: none;
}

.commit-cell {
  width: 11px;
  height: 11px;
  border-radius: 2px;
  transition: transform 0.1s ease;
  flex-shrink: 0;
}

.commit-cell:hover {
  transform: scale(1.25);
}

.commit-cell[data-level="0"] {
  background: var(--glass-fill);
  border: 1px solid var(--glass-border-soft);
}

.commit-cell[data-level="1"] {
  background: color-mix(in srgb, var(--apoc-accent) 20%, transparent);
  border: 1px solid color-mix(in srgb, var(--apoc-accent) 30%, transparent);
}

.commit-cell[data-level="2"] {
  background: color-mix(in srgb, var(--apoc-accent) 42%, transparent);
  border: 1px solid color-mix(in srgb, var(--apoc-accent) 52%, transparent);
}

.commit-cell[data-level="3"] {
  background: color-mix(in srgb, var(--apoc-accent) 65%, transparent);
  border: 1px solid color-mix(in srgb, var(--apoc-accent) 75%, transparent);
}

.commit-cell[data-level="4"] {
  background: var(--apoc-accent);
  border: 1px solid var(--apoc-accent);
}
</style>
