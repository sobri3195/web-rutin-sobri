import { DayProgress } from '@/types';

export const percent = (done: number, total: number) => {
  if (!total) return 0;
  return Math.round((done / total) * 100);
};

export const computeStreak = (history: DayProgress[]): number => {
  const sorted = [...history].sort((a, b) => b.date.localeCompare(a.date));
  let streak = 0;

  for (let i = 0; i < sorted.length; i += 1) {
    if (sorted[i].percent < 70) break;
    if (i > 0) {
      const prev = new Date(sorted[i - 1].date);
      const current = new Date(sorted[i].date);
      const diff = (prev.getTime() - current.getTime()) / (1000 * 60 * 60 * 24);
      if (Math.round(diff) !== 1) break;
    }
    streak += 1;
  }

  return streak;
};
