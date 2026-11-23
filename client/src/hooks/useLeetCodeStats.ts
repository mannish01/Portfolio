import { useCallback, useEffect, useState } from 'react';
import { leetcodeSnapshot } from '../data/leetcodeSnapshot.js';
import { loadLeetCodeStats } from '../services/leetcode.js';
import type { LeetCodeStats } from '../types/leetcode.js';

interface UseLeetCodeStatsResult {
  stats: LeetCodeStats;
  isFetching: boolean;
  error: string | null;
  refresh: () => void;
}

/** Loads live alfa-leetcode-api data with a bundled snapshot as the first paint. */
export function useLeetCodeStats(username: string): UseLeetCodeStatsResult {
  const [stats, setStats] = useState<LeetCodeStats>(() => ({
    ...leetcodeSnapshot,
    fetchedAt: Date.now(),
    isLive: false,
  }));
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState(0);

  const refresh = useCallback(() => setRequestId((id) => id + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    setIsFetching(true);
    setError(null);

    loadLeetCodeStats(username, controller.signal, requestId > 0)
      .then((next) => {
        if (controller.signal.aborted) return;
        setStats(next);
        if (!next.isLive) {
          setError('Live stats unavailable — showing the last saved snapshot.');
        }
      })
      .catch((reason: unknown) => {
        if (controller.signal.aborted) return;
        setError(reason instanceof Error ? reason.message : 'Unable to load LeetCode stats.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsFetching(false);
      });

    return () => controller.abort();
  }, [username, requestId]);

  return { stats, isFetching, error, refresh };
}
