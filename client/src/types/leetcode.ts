/** Types for the alfa-leetcode-api responses used by the portfolio. */

export interface LeetCodeDifficultyBucket {
  difficulty: 'All' | 'Easy' | 'Medium' | 'Hard' | string;
  count: number;
  submissions: number;
}

export interface LeetCodeSubmission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
  __typename?: string;
}

/** GET /:username */
export interface LeetCodeUserDetail {
  username: string;
  name: string | null;
  birthday?: string | null;
  avatar: string;
  ranking: number | null;
  reputation: number;
  gitHub: string | null;
  linkedIN: string | null;
  twitter: string | null;
  website: string[];
  country: string | null;
  company?: string | null;
  school?: string | null;
  skillTags: string[];
  about: string | null;
}

/** GET /:username/profile */
export interface LeetCodeProfileStats {
  totalSolved: number;
  totalSubmissions: LeetCodeDifficultyBucket[];
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number | null;
  contributionPoint: number;
  reputation: number;
  submissionCalendar: Record<string, number>;
  recentSubmissions: LeetCodeSubmission[];
  matchedUserStats?: {
    acSubmissionNum: LeetCodeDifficultyBucket[];
    totalSubmissionNum: LeetCodeDifficultyBucket[];
  } | null;
}

/** GET /:username/solved */
export interface LeetCodeSolved {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSubmissionNum: LeetCodeDifficultyBucket[];
  acSubmissionNum: LeetCodeDifficultyBucket[];
}

export interface LeetCodeSkillTag {
  tagName: string;
  tagSlug: string;
  problemsSolved: number;
}

/** GET /:username/skill */
export interface LeetCodeSkillGroups {
  fundamental: LeetCodeSkillTag[];
  intermediate: LeetCodeSkillTag[];
  advanced: LeetCodeSkillTag[];
}

/** GET /:username/language */
export interface LeetCodeLanguages {
  languageProblemCount: { languageName: string; problemsSolved: number }[];
}

export interface LeetCodeBeats {
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | string;
  percentage: number | null;
}

/** GET /:username/progress */
export interface LeetCodeProgress {
  numAcceptedQuestions: {
    numAcceptedQuestions: { count: number; difficulty: string }[];
    numFailedQuestions: { count: number; difficulty: string }[];
    numUntouchedQuestions: { count: number; difficulty: string }[];
    userSessionBeatsPercentage: LeetCodeBeats[];
  };
}

/** GET /:username/calendar */
export interface LeetCodeCalendar {
  activeYears: number[];
  streak: number;
  totalActiveDays: number;
  submissionCalendar: string;
}

/** GET /:username/badges */
export interface LeetCodeBadges {
  badgesCount: number;
  badges: {
    id: string;
    displayName: string;
    icon: string;
    creationDate: string;
  }[];
  upcomingBadges?: { name: string; icon: string }[];
  activeBadge: {
    id: string;
    displayName: string;
    icon: string;
    creationDate: string;
  } | null;
}

/** GET /:username/submission */
export interface LeetCodeSubmissions {
  count: number;
  submission: LeetCodeSubmission[];
}

/** GET /:username/contest */
export interface LeetCodeContest {
  contestParticipation: {
    contestName?: string;
    ranking?: number;
    rating?: number | string;
    [key: string]: unknown;
  }[];
}

/** GET /:username/contest/history */
export interface LeetCodeContestHistory {
  count: number;
  contestHistory: Record<string, unknown>[];
}

/** Everything the UI needs, in one object. */
export interface LeetCodeStats {
  user: LeetCodeUserDetail | null;
  profile: LeetCodeProfileStats | null;
  solved: LeetCodeSolved | null;
  skills: LeetCodeSkillGroups | null;
  languages: LeetCodeLanguages | null;
  progress: LeetCodeProgress | null;
  calendar: LeetCodeCalendar | null;
  badges: LeetCodeBadges | null;
  submissions: LeetCodeSubmissions | null;
  contest: LeetCodeContest | null;
  contestHistory: LeetCodeContestHistory | null;
  /** Timestamp of the last successful fetch. */
  fetchedAt: number;
  /** True when at least one live endpoint answered; false for the offline snapshot. */
  isLive: boolean;
}
