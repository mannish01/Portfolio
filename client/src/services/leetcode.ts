import type {
  LeetCodeBadges,
  LeetCodeCalendar,
  LeetCodeContest,
  LeetCodeContestHistory,
  LeetCodeLanguages,
  LeetCodeProfileStats,
  LeetCodeProgress,
  LeetCodeSkillGroups,
  LeetCodeSolved,
  LeetCodeStats,
  LeetCodeSubmissions,
  LeetCodeUserDetail,
} from '../types/leetcode.js';
import { leetcodeSnapshot } from '../data/leetcodeSnapshot.js';

/** Public API from https://github.com/alfaarghya/alfa-leetcode-api */
const API_BASE = 'https://alfa-leetcode-api.onrender.com';
const REQUEST_TIMEOUT_MS = 15_000;
const CACHE_TTL_MS = 10 * 60 * 1000;

export const LEETCODE_USERNAME = 'MANISHX01';
export const LEETCODE_PROFILE_URL = `https://leetcode.com/u/${LEETCODE_USERNAME}/`;

interface CacheEntry {
  username: string;
  loadedAt: number;
  stats: LeetCodeStats;
}

let cache: CacheEntry | null = null;

function snapshotStats(): LeetCodeStats {
  return { ...leetcodeSnapshot, fetchedAt: Date.now(), isLive: false };
}

async function getJson<T>(path: string, signal: AbortSignal): Promise<T> {
  if (signal.aborted) throw new DOMException('Aborted', 'AbortError');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const forwardAbort = () => controller.abort();
  signal.addEventListener('abort', forwardAbort, { once: true });

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`alfa-leetcode-api responded ${response.status}`);
    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
    signal.removeEventListener('abort', forwardAbort);
  }
}

/**
 * Fetches every dashboard endpoint in parallel. Individual failures fall back
 * to the bundled snapshot so the section never collapses to empty state.
 */
export async function loadLeetCodeStats(
  username: string,
  signal: AbortSignal,
  force = false,
): Promise<LeetCodeStats> {
  if (
    !force &&
    cache &&
    cache.username === username &&
    Date.now() - cache.loadedAt < CACHE_TTL_MS
  ) {
    return cache.stats;
  }

  const paths = [
    `/${username}`,
    `/${username}/profile`,
    `/${username}/solved`,
    `/${username}/skill`,
    `/${username}/language`,
    `/${username}/progress`,
    `/${username}/calendar`,
    `/${username}/badges`,
    `/${username}/submission?limit=8`,
    `/${username}/contest`,
    `/${username}/contest/history`,
  ];

  try {
    const settled = await Promise.allSettled(
      paths.map((path) => getJson<unknown>(path, signal)),
    );
    const liveCount = settled.filter((result) => result.status === 'fulfilled').length;
    if (liveCount === 0) throw new Error('All LeetCode endpoints failed');

    const value = <T>(index: number): T | null => {
      const result = settled[index];
      return result?.status === 'fulfilled' ? (result.value as T) : null;
    };

    const fallback = snapshotStats();
    const stats: LeetCodeStats = {
      user: value<LeetCodeUserDetail>(0) ?? fallback.user,
      profile: value<LeetCodeProfileStats>(1) ?? fallback.profile,
      solved: value<LeetCodeSolved>(2) ?? fallback.solved,
      skills: value<LeetCodeSkillGroups>(3) ?? fallback.skills,
      languages: value<LeetCodeLanguages>(4) ?? fallback.languages,
      progress: value<LeetCodeProgress>(5) ?? fallback.progress,
      calendar: value<LeetCodeCalendar>(6) ?? fallback.calendar,
      badges: value<LeetCodeBadges>(7) ?? fallback.badges,
      submissions: value<LeetCodeSubmissions>(8) ?? fallback.submissions,
      contest: value<LeetCodeContest>(9) ?? fallback.contest,
      contestHistory: value<LeetCodeContestHistory>(10) ?? fallback.contestHistory,
      fetchedAt: Date.now(),
      isLive: true,
    };

    cache = { username, loadedAt: Date.now(), stats };
    return stats;
  } catch (error) {
    if (signal.aborted) throw error;
    return snapshotStats();
  }
}

/** Small helpers used by the dashboard. */
export function bucket(
  buckets: { difficulty: string; count: number; submissions: number }[] | undefined,
  difficulty: string,
): { count: number; submissions: number } {
  return buckets?.find((item) => item.difficulty === difficulty) ?? {
    count: 0,
    submissions: 0,
  };
}

export function compactNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return value.toLocaleString('en-IN');
}

export function relativeTime(timestamp: string): string {
  const seconds = Number(timestamp);
  if (!Number.isFinite(seconds)) return 'recently';
  const days = Math.floor((Date.now() - seconds * 1000) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export function languageColor(language: string): string {
  const name = language.toLowerCase();
  if (name.includes('c++')) return '#F34B7D';
  if (name.includes('java') && !name.includes('javascript')) return '#E76F00';
  if (name.includes('javascript')) return '#F7DF1E';
  if (name.includes('python')) return '#4B8BBE';
  if (name.includes('typescript')) return '#3178C6';
  if (name.includes('mysql') || name.includes('sql')) return '#4479A1';
  if (name.includes('go')) return '#00ADD8';
  if (name.includes('rust')) return '#DEA584';
  return '#9B80FF';
}
