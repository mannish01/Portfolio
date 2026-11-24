import React, { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowUpRight,
  Award,
  CircleDot,
  Code2,
  Flame,
  LayoutGrid,
  RefreshCw,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading.js';
import { useLeetCodeStats } from '../../hooks/useLeetCodeStats.js';
import {
  LEETCODE_PROFILE_URL,
  LEETCODE_USERNAME,
  bucket,
  compactNumber,
  languageColor,
  relativeTime,
} from '../../services/leetcode.js';
import type { LeetCodeSkillTag, LeetCodeStats } from '../../types/leetcode.js';

const DIFFICULTIES = [
  { key: 'Easy', color: '#00B8A3' },
  { key: 'Medium', color: '#FFB800' },
  { key: 'Hard', color: '#FF375F' },
] as const;

const SKILL_LEVELS = [
  { key: 'fundamental', label: 'Fundamentals', color: '#D7FF64' },
  { key: 'intermediate', label: 'Intermediate', color: '#9B80FF' },
  { key: 'advanced', label: 'Advanced', color: '#FF7058' },
] as const;

interface Heatcell {
  date: string;
  count: number;
  label: string;
  week: number;
}

interface Heatmap {
  cells: Heatcell[];
  months: { label: string; column: number }[];
  max: number;
}

function buildHeatmap(calendar: string | undefined, weeks = 26): Heatmap {
  let counts: Record<string, number> = {};
  try {
    const parsed: unknown = JSON.parse(calendar ?? '{}');
    if (parsed && typeof parsed === 'object') {
      // alfa-leetcode-api keys the calendar by UTC midnight timestamp.
      for (const [key, value] of Object.entries(parsed as Record<string, number>)) {
        const seconds = Number(key);
        if (!Number.isFinite(seconds) || typeof value !== 'number') continue;
        const iso = new Date(seconds * 1000).toISOString().slice(0, 10);
        counts[iso] = (counts[iso] ?? 0) + value;
      }
    }
  } catch {
    counts = {};
  }

  const now = new Date();
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (weeks * 7 - 1));
  // Monday-first weeks, like LeetCode's own submission calendar.
  start.setUTCDate(start.getUTCDate() - ((start.getUTCDay() + 6) % 7));

  const cells: Heatcell[] = [];
  const months: { label: string; column: number }[] = [];
  let max = 0;
  let lastMonth = -1;

  for (let column = 0; column < weeks; column += 1) {
    for (let day = 0; day < 7; day += 1) {
      const current = new Date(start);
      current.setUTCDate(start.getUTCDate() + column * 7 + day);
      if (current > end) continue;
      const iso = current.toISOString().slice(0, 10);
      const count = counts[iso] ?? 0;
      max = Math.max(max, count);
      const label = current.toLocaleDateString('en-US', {
        timeZone: 'UTC',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      cells.push({ date: iso, count, label, week: column });
      if (day === 0 && current.getUTCMonth() !== lastMonth) {
        lastMonth = current.getUTCMonth();
        months.push({
          label: current.toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short' }),
          column,
        });
      }
    }
  }

  return { cells, months, max };
}

function heatColor(count: number): string {
  if (count === 0) return 'rgba(255,255,255,0.07)';
  if (count === 1) return 'rgba(121,87,255,0.30)';
  if (count === 2) return 'rgba(121,87,255,0.60)';
  if (count === 3) return '#7957FF';
  if (count === 4) return '#B98CFF';
  return '#D7FF64';
}

type ChartStyle = 'grid' | 'dots' | 'neon';

const CHART_STYLES: { id: ChartStyle; label: string; icon: React.ReactNode }[] = [
  { id: 'grid', label: 'Squares', icon: <LayoutGrid className="h-3.5 w-3.5" /> },
  { id: 'dots', label: 'Dots', icon: <CircleDot className="h-3.5 w-3.5" /> },
  { id: 'neon', label: 'Neon', icon: <Sparkles className="h-3.5 w-3.5" /> },
];

interface HoveredCell {
  cell: Heatcell;
  x: number;
  y: number;
  align: 'left' | 'center' | 'right';
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  caption: string;
  color: string;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, caption, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay: index * 0.07 }}
    whileHover={{ y: -4 }}
    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-navy-surface/60 p-5 backdrop-blur-md transition-colors hover:border-white/20 sm:p-6"
  >
    <div
      className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full blur-2xl opacity-20 transition-opacity group-hover:opacity-40"
      style={{ backgroundColor: color }}
    />
    <div className="relative flex items-start justify-between gap-3">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-offwhite/50">{label}</p>
        <p className="mt-3 font-display text-3xl font-bold leading-none text-offwhite sm:text-4xl">
          {value}
        </p>
        <p className="mt-2 text-xs text-offwhite/50">{caption}</p>
      </div>
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
        style={{ color, backgroundColor: `${color}14`, borderColor: `${color}40` }}
      >
        {icon}
      </div>
    </div>
  </motion.div>
);

interface PanelProps {
  title: string;
  eyebrow: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const Panel: React.FC<PanelProps> = ({ title, eyebrow, icon, children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.55, delay }}
    className={`rounded-2xl border border-white/10 bg-navy-surface/50 p-5 backdrop-blur-md sm:p-6 ${className}`}
  >
    <div className="mb-6 flex items-center justify-between gap-3">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-lime/70">{eyebrow}</p>
        <h3 className="mt-1.5 font-display text-lg font-bold text-offwhite sm:text-xl">{title}</h3>
      </div>
      <span className="text-violet-light/80">{icon}</span>
    </div>
    {children}
  </motion.div>
);

interface DifficultyRowProps {
  label: string;
  solved: number;
  total: number;
  color: string;
}

const DifficultyRow: React.FC<DifficultyRowProps> = ({ label, solved, total, color }) => (
  <div>
    <div className="mb-2 flex items-center justify-between gap-3 font-mono text-xs">
      <span className="font-semibold" style={{ color }}>
        {label}
      </span>
      <span className="text-offwhite/60">
        {solved} <span className="text-offwhite/30">/ {total.toLocaleString('en-IN')}</span>
      </span>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${total > 0 ? Math.max((solved / total) * 100, 1.5) : 0}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="h-full rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}80` }}
      />
    </div>
  </div>
);

function SkillChips({ tags, color }: { tags: LeetCodeSkillTag[]; color: string }) {
  const sorted = [...tags].sort((a, b) => b.problemsSolved - a.problemsSolved).slice(0, 8);
  return (
    <div className="flex flex-wrap gap-2">
      {sorted.map((tag) => (
        <span
          key={tag.tagSlug || tag.tagName}
          className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[11px] transition-colors"
          style={{ borderColor: `${color}35`, backgroundColor: `${color}0F`, color: '#FAF8F3' }}
        >
          <span className="font-bold" style={{ color }}>
            ×{tag.problemsSolved}
          </span>
          {tag.tagName}
        </span>
      ))}
    </div>
  );
}

interface LeetCodeProps {
  username?: string;
}

export const LeetCode: React.FC<LeetCodeProps> = ({ username = LEETCODE_USERNAME }) => {
  const { stats, isFetching, error, refresh } = useLeetCodeStats(username);

  const derived = useMemo(() => {
    const s: LeetCodeStats = stats;
    const allAttempts = bucket(s.solved?.totalSubmissionNum, 'All');
    const allAccepted = bucket(s.solved?.acSubmissionNum, 'All');
    const acceptance = allAttempts.submissions > 0
      ? Math.round((allAccepted.submissions / allAttempts.submissions) * 100)
      : 0;
    const beats = (s.progress?.numAcceptedQuestions.userSessionBeatsPercentage ?? []).filter(
      (item) => typeof item.percentage === 'number',
    );
    const averageBeats = beats.length
      ? Math.round(beats.reduce((sum, item) => sum + (item.percentage ?? 0), 0) / beats.length)
      : 0;
    const heatmap = buildHeatmap(s.calendar?.submissionCalendar);
    const weeklyTotals = Array.from({ length: 26 }, () => 0);
    let windowSubmissions = 0;
    let activeInWindow = 0;
    let longestRun = 0;
    let currentRun = 0;
    for (const cell of heatmap.cells) {
      weeklyTotals[cell.week] = (weeklyTotals[cell.week] ?? 0) + cell.count;
      windowSubmissions += cell.count;
      if (cell.count > 0) {
        activeInWindow += 1;
        currentRun += 1;
        longestRun = Math.max(longestRun, currentRun);
      } else {
        currentRun = 0;
      }
    }
    const maxWeek = Math.max(...weeklyTotals, 1);
    const seen = new Set<string>();
    const submissions = (s.submissions?.submission ?? []).filter((submission) => {
      if (!submission.titleSlug || seen.has(submission.titleSlug)) return false;
      seen.add(submission.titleSlug);
      return true;
    });
    const accepted = submissions.filter((item) => item.statusDisplay === 'Accepted');
    const recent = (accepted.length >= 4 ? accepted : submissions).slice(0, 5);
    return {
      allAttempts,
      allAccepted,
      acceptance,
      beats,
      averageBeats,
      heatmap,
      recent,
      weeklyTotals,
      maxWeek,
      windowSubmissions,
      activeInWindow,
      longestRun,
    };
  }, [stats]);

  const heatRef = useRef<HTMLDivElement>(null);
  const [hoveredCell, setHoveredCell] = useState<HoveredCell | null>(null);
  const [chartStyle, setChartStyle] = useState<ChartStyle>('dots');
  const isDotted = chartStyle !== 'grid';

  const rank = stats.profile?.ranking ?? stats.user?.ranking ?? 0;
  const totalSolved = stats.solved?.solvedProblem ?? stats.profile?.totalSolved ?? 0;
  const totalQuestions = stats.profile?.totalQuestions ?? 4123;
  const solvedPercent = totalQuestions > 0 ? ((totalSolved / totalQuestions) * 100).toFixed(2) : '0';
  const streak = stats.calendar?.streak ?? 0;
  const activeDays = stats.calendar?.totalActiveDays ?? 0;
  const displayName = stats.user?.name || username;

  return (
    <section
      id="leetcode"
      className="relative overflow-hidden bg-navy-deep py-16 text-offwhite sm:py-32"
    >
      <div className="pointer-events-none absolute left-1/3 top-0 h-72 w-72 rounded-full bg-violet/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 h-80 w-80 rounded-full bg-coral/[0.07] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="04"
          tag="PROBLEM SOLVING"
          title="Algorithms, Practiced in Public."
          subtitle="Live LeetCode statistics powered by alfa-leetcode-api — solved problems, difficulty spread, language mix, topic strengths and submission rhythm."
        />

        {/* Profile strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="mb-8 flex flex-col gap-5 rounded-2xl border border-white/10 bg-gradient-to-r from-violet/[0.14] via-navy-surface/60 to-transparent p-5 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="h-14 w-14 overflow-hidden rounded-2xl border border-lime/40 bg-navy-card shadow-[0_0_22px_rgba(121,87,255,0.35)] sm:h-16 sm:w-16">
                <img
                  src={stats.user?.avatar || `https://assets.leetcode.com/users/${username}/avatar.png`}
                  alt={`${displayName}'s LeetCode avatar`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-navy-deep bg-lime text-navy-dark">
                <Zap className="h-3 w-3" fill="currentColor" />
              </span>
            </div>
            <div>
              <p className="font-display text-xl font-bold text-offwhite sm:text-2xl">{displayName}</p>
              <p className="mt-0.5 font-mono text-xs text-lime/80">@{stats.user?.username ?? username}</p>
              <p className="mt-1.5 text-xs text-offwhite/50">
                {stats.user?.about || 'Consistent practice, one problem at a time.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider ${
                stats.isLive
                  ? 'border-lime/30 bg-lime/10 text-lime'
                  : 'border-coral/30 bg-coral/10 text-coral-light'
              }`}
              title={
                error ??
                `Last synced ${new Date(stats.fetchedAt).toLocaleString('en-IN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}`
              }
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${isFetching ? 'animate-pulse bg-lime' : stats.isLive ? 'bg-lime' : 'bg-coral'}`}
              />
              {isFetching ? 'Syncing' : stats.isLive ? 'Live data' : 'Saved snapshot'}
            </span>
            <button
              onClick={refresh}
              disabled={isFetching}
              aria-label="Refresh LeetCode statistics"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-offwhite/70 transition-colors hover:border-lime/40 hover:text-lime disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            </button>
            <a
              href={LEETCODE_PROFILE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-lime/40 bg-lime px-4 py-2 font-mono text-xs font-bold text-navy-dark transition-all hover:bg-lime-light hover:shadow-[0_0_20px_rgba(215,255,100,0.4)]"
            >
              View profile <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Headline metrics */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatCard
            index={0}
            icon={<Target className="h-5 w-5" />}
            label="Problems solved"
            value={String(totalSolved)}
            caption={`${solvedPercent}% of ${totalQuestions.toLocaleString('en-IN')} problems`}
            color="#D7FF64"
          />
          <StatCard
            index={1}
            icon={<Trophy className="h-5 w-5" />}
            label="Global ranking"
            value={rank ? compactNumber(rank) : '—'}
            caption={rank ? `${rank.toLocaleString('en-IN')} on LeetCode` : 'Rank not available'}
            color="#9B80FF"
          />
          <StatCard
            index={2}
            icon={<Flame className="h-5 w-5" />}
            label="Current streak"
            value={`${streak}d`}
            caption={`${activeDays} active solving days`}
            color="#FF7058"
          />
          <StatCard
            index={3}
            icon={<Activity className="h-5 w-5" />}
            label="Acceptance rate"
            value={`${derived.acceptance}%`}
            caption={`${derived.allAccepted.submissions} accepted / ${derived.allAttempts.submissions} submissions`}
            color="#00B8A3"
          />
        </div>

        {/* Difficulty + languages + beats */}
        <div className="mt-4 grid gap-4 lg:grid-cols-12 sm:gap-5">
          <Panel
            title="Difficulty breakdown"
            eyebrow="SOLVED BY DIFFICULTY"
            icon={<Code2 className="h-5 w-5" />}
            className="lg:col-span-5"
            delay={0.05}
          >
            <div className="space-y-5">
              {DIFFICULTIES.map((difficulty) => {
                const key = difficulty.key.toLowerCase() as 'easy' | 'medium' | 'hard';
                const solved = stats.profile?.[`${key}Solved`] ?? 0;
                const total = stats.profile?.[`total${difficulty.key}`] ?? 0;
                return (
                  <DifficultyRow
                    key={difficulty.key}
                    label={difficulty.key}
                    solved={solved}
                    total={total}
                    color={difficulty.color}
                  />
                );
              })}
              <p className="pt-1 font-mono text-[10px] text-offwhite/35">
                {derived.allAccepted.count} unique accepted problems · {derived.allAccepted.submissions} accepted submissions
              </p>
            </div>
          </Panel>

          <Panel
            title="Languages I solve in"
            eyebrow="TOOLING MIX"
            icon={<Code2 className="h-5 w-5" />}
            className="lg:col-span-4"
            delay={0.1}
          >
            <div className="space-y-5">
              {(stats.languages?.languageProblemCount ?? []).map((language) => {
                const max = Math.max(
                  ...(stats.languages?.languageProblemCount ?? []).map((item) => item.problemsSolved),
                  1,
                );
                const color = languageColor(language.languageName);
                return (
                  <div key={language.languageName}>
                    <div className="mb-2 flex items-center justify-between font-mono text-xs">
                      <span className="text-offwhite/80">{language.languageName}</span>
                      <span style={{ color }} className="font-bold">
                        {language.problemsSolved}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(language.problemsSolved / max) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}70` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel
            title="How I stack up"
            eyebrow="PERCENTILE"
            icon={<Trophy className="h-5 w-5" />}
            className="lg:col-span-3"
            delay={0.15}
          >
            <div className="mb-5 flex items-end gap-2">
              <span className="font-display text-5xl font-bold leading-none text-lime">
                {derived.averageBeats}%
              </span>
              <span className="pb-1 font-mono text-[11px] text-offwhite/45">beats average</span>
            </div>
            <div className="space-y-3">
              {derived.beats.map((item) => (
                <div key={item.difficulty} className="flex items-center gap-3">
                  <span className="w-14 font-mono text-[10px] uppercase text-offwhite/50">
                    {item.difficulty.slice(0, 3)}
                  </span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet to-lime"
                      style={{ width: `${item.percentage ?? 0}%` }}
                    />
                  </div>
                  <span className="w-9 text-right font-mono text-[10px] text-offwhite/70">
                    {item.percentage ?? 0}%
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Submission activity — redesigned heatmap + weekly volume */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-navy-surface/75 via-navy-surface/40 to-navy-deep/70 p-5 backdrop-blur-md sm:p-6"
        >
          <div className="pointer-events-none absolute -right-16 -top-24 h-60 w-60 rounded-full bg-violet/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-lime/[0.06] blur-3xl" />

          <div className="relative flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-lime/70">CONSISTENCY MAP</p>
              <h3 className="mt-1.5 font-display text-lg font-bold text-offwhite sm:text-xl">
                Submission activity
              </h3>
              <p className="mt-1.5 max-w-md text-xs text-offwhite/45">
                Every {isDotted ? 'dot' : 'square'} is a day. Brighter means more problems solved — hover one for the exact count.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[
                { label: 'In window', value: String(derived.windowSubmissions), color: '#D7FF64' },
                { label: 'Active days', value: String(derived.activeInWindow), color: '#9B80FF' },
                { label: 'Longest run', value: `${derived.longestRun}d`, color: '#FF7058' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="min-w-[84px] rounded-xl border border-white/10 bg-navy-deep/60 px-3 py-2.5"
                >
                  <p className="font-mono text-[9px] uppercase tracking-wider text-offwhite/40">
                    {item.label}
                  </p>
                  <p className="mt-1 font-display text-lg font-bold leading-none" style={{ color: item.color }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-navy-deep/70 p-1">
              {CHART_STYLES.map((style) => {
                const active = chartStyle === style.id;
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setChartStyle(style.id)}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] transition-all ${
                      active
                        ? 'bg-lime text-navy-dark shadow-[0_0_16px_rgba(215,255,100,0.4)]'
                        : 'text-offwhite/50 hover:bg-white/5 hover:text-offwhite'
                    }`}
                  >
                    {style.icon}
                    {style.label}
                  </button>
                );
              })}
            </div>
            <p className="font-mono text-[10px] text-offwhite/35">
              {chartStyle === 'neon' ? 'Pulse mode — active days glow' : 'Tap a style to remix the map'}
            </p>
          </div>

          <p className="mt-3 font-mono text-[10px] text-lime/60 sm:hidden">
            ← Swipe the activity map to see all months →
          </p>
          <div ref={heatRef} className="relative mt-2 overflow-x-auto pb-2">
            <div className="relative w-full min-w-[640px] pl-8 pr-8">
              <div className="relative ml-8 mb-2 h-4">
                {derived.heatmap.months.map((month) => (
                  <span
                    key={`${month.label}-${month.column}`}
                    className="absolute font-mono text-[10px] text-offwhite/45"
                    style={{ left: `${(month.column / 26) * 100}%` }}
                  >
                    {month.label}
                  </span>
                ))}
              </div>

              <div
                className="relative ml-8"
                onMouseLeave={() => setHoveredCell(null)}
              >
                <div className="absolute -left-8 top-0 flex h-[129px] w-7 flex-col justify-between font-mono text-[9px] text-offwhite/30">
                  <span />
                  <span>Mon</span>
                  <span />
                  <span>Wed</span>
                  <span />
                  <span>Fri</span>
                  <span />
                </div>

                <div
                  className="gap-1"
                  style={{
                    display: 'grid',
                    gridAutoFlow: 'column',
                    gridTemplateRows: 'repeat(7, 15px)',
                    gridTemplateColumns: 'repeat(26, minmax(0, 1fr))',
                  }}
                >
                  {derived.heatmap.cells.map((cell) => (
                    <motion.div
                      key={cell.date}
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: (cell.week / 26) * 0.5 }}
                      whileHover={{ scale: 1.45, zIndex: 3 }}
                      onMouseEnter={(event) => {
                        const grid = event.currentTarget.parentElement;
                        const gridRect = grid?.getBoundingClientRect();
                        const cellRect = event.currentTarget.getBoundingClientRect();
                        if (!gridRect) return;
                        const rawX = cellRect.left - gridRect.left + cellRect.width / 2;
                        const edge = 76;
                        setHoveredCell({
                          cell,
                          x: rawX,
                          y: cellRect.top - gridRect.top,
                          align:
                            rawX < edge
                              ? 'left'
                              : rawX > gridRect.width - edge
                                ? 'right'
                                : 'center',
                        });
                      }}
                      role="img"
                      aria-label={`${cell.count} submission${cell.count === 1 ? '' : 's'} on ${cell.label}`}
                      className="relative border border-white/[0.04] transition-colors"
                      style={{
                        width: isDotted ? '11px' : '100%',
                        height: isDotted ? '11px' : '100%',
                        borderRadius: isDotted ? '50%' : '4px',
                        placeSelf: isDotted ? 'center' : undefined,
                        backgroundColor: heatColor(cell.count),
                        boxShadow:
                          cell.count >= 4
                            ? '0 0 14px rgba(215,255,100,0.45), inset 0 0 0 1px rgba(215,255,100,0.35)'
                            : cell.count === 3
                              ? '0 0 9px rgba(121,87,255,0.45)'
                              : undefined,
                        animation:
                          chartStyle === 'neon' && cell.count > 0
                            ? 'lc-glow 2.2s ease-in-out infinite'
                            : undefined,
                        animationDelay:
                          chartStyle === 'neon' && cell.count > 0
                            ? `${(cell.week % 8) * 0.18}s`
                            : undefined,
                      }}
                    />
                  ))}
                </div>

                {hoveredCell && (
                  <div
                    className={`pointer-events-none absolute z-20 -translate-y-full pb-2 ${
                      hoveredCell.align === 'left'
                        ? 'translate-x-0'
                        : hoveredCell.align === 'right'
                          ? '-translate-x-full'
                          : '-translate-x-1/2'
                    }`}
                    style={{ left: hoveredCell.x, top: hoveredCell.y }}
                  >
                    <div className="rounded-lg border border-lime/30 bg-navy-deep/95 px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md">
                      <p className="whitespace-nowrap font-mono text-[11px] font-bold text-lime">
                        {hoveredCell.cell.count} submission
                        {hoveredCell.cell.count === 1 ? '' : 's'}
                      </p>
                      <p className="whitespace-nowrap font-mono text-[10px] text-offwhite/50">
                        {hoveredCell.cell.label}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="ml-8 mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-violet-light/80">
                    Weekly volume
                  </p>
                  <p className="font-mono text-[10px] text-offwhite/40">26w</p>
                </div>
                <div className="flex h-12 items-end gap-1 border-b border-white/[0.06] pb-px">
                  {derived.weeklyTotals.map((total, index) => (
                    <div
                      key={index}
                      className="flex h-full min-w-0 flex-1 items-end justify-center"
                    >
                      <div
                        style={{
                          height: `${total > 0 ? Math.max((total / derived.maxWeek) * 100, 12) : 0}%`,
                          width: isDotted ? '11px' : '100%',
                        }}
                        title={`${total} submissions in week ${index + 1}`}
                        className={`bg-gradient-to-t from-violet to-lime transition-all duration-500 hover:opacity-100 ${
                          isDotted ? 'rounded-t-full' : 'rounded-t-[3px]'
                        } ${chartStyle === 'neon' && total > 0 ? 'shadow-[0_0_10px_rgba(215,255,100,0.5)]' : ''} ${
                          total === 0 ? 'opacity-0' : 'opacity-90'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[10px] text-offwhite/40">
              Peak day: {derived.heatmap.max} · {activeDays} active days recorded all-time
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] text-offwhite/40">
              <span>Less</span>
              {[0, 1, 2, 3, 5].map((level) => (
                <span
                  key={level}
                  className={`h-3 w-3 border border-white/10 transition-transform hover:scale-125 ${
                    isDotted ? 'rounded-full' : 'rounded-[3px]'
                  }`}
                  style={{
                    backgroundColor: heatColor(level),
                    boxShadow: level >= 4 ? '0 0 8px rgba(215,255,100,0.35)' : undefined,
                  }}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </motion.div>

        {/* Topics + recent submissions */}
        <div className="mt-4 grid gap-4 lg:grid-cols-2 sm:gap-5">
          <Panel
            title="Topic strengths"
            eyebrow="SKILL MATRIX"
            icon={<Award className="h-5 w-5" />}
            delay={0.05}
          >
            <div className="space-y-5">
              {SKILL_LEVELS.map((level) => {
                const tags = stats.skills?.[level.key] ?? [];
                return (
                  <div key={level.key}>
                    <p
                      className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.15em]"
                      style={{ color: level.color }}
                    >
                      {level.label}
                    </p>
                    <SkillChips tags={tags} color={level.color} />
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel
            title="Recent accepted problems"
            eyebrow="SUBMISSION FEED"
            icon={<Activity className="h-5 w-5" />}
            delay={0.1}
          >
            <div className="space-y-2">
              {derived.recent.map((submission, index) => (
                <motion.a
                  key={`${submission.titleSlug}-${submission.timestamp}`}
                  href={`https://leetcode.com/problems/${submission.titleSlug}/`}
                  target="_blank"
                  rel="noreferrer noopener"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3.5 py-3 transition-all hover:border-lime/30 hover:bg-white/[0.05]"
                >
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      submission.statusDisplay === 'Accepted' ? 'bg-lime' : 'bg-coral'
                    }`}
                  />
                  <span className="min-w-0 flex-1 truncate text-xs text-offwhite/85 group-hover:text-lime sm:text-sm">
                    {submission.title}
                  </span>
                  <span
                    className="hidden rounded-md border px-2 py-0.5 font-mono text-[9px] uppercase sm:inline"
                    style={{
                      color: languageColor(submission.lang),
                      borderColor: `${languageColor(submission.lang)}40`,
                    }}
                  >
                    {submission.lang}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] text-offwhite/40">
                    {relativeTime(submission.timestamp)}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-offwhite/25 transition-colors group-hover:text-lime" />
                </motion.a>
              ))}
              {derived.recent.length === 0 && (
                <p className="font-mono text-xs text-offwhite/40">No recent submissions to show yet.</p>
              )}
            </div>
          </Panel>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center font-mono text-[10px] text-offwhite/30"
        >
          Data fetched from alfa-leetcode-api ·{' '}
          <a
            href="https://github.com/alfaarghya/alfa-leetcode-api"
            target="_blank"
            rel="noreferrer noopener"
            className="underline decoration-white/20 underline-offset-4 hover:text-lime"
          >
            open source API
          </a>{' '}
          · refreshed {new Date(stats.fetchedAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
        </motion.p>
      </div>
    </section>
  );
};

export default LeetCode;
