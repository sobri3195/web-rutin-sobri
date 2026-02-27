export interface GamificationBadge {
  key: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export interface GamificationStats {
  xp: number;
  level: number;
  nextLevelXp: number;
  xpProgress: number;
  title: string;
  badges: GamificationBadge[];
}

const levelTitles = ['Rookie', 'Sprinter', 'Warrior', 'Guardian', 'Pegasus Master'];

export function getGamificationStats(totalProgress: number, streak: number): GamificationStats {
  const xp = totalProgress * 3 + streak * 20;
  const level = Math.max(1, Math.floor(xp / 120) + 1);
  const nextLevelXp = level * 120;
  const currentLevelStart = (level - 1) * 120;
  const xpProgress = Math.max(0, Math.min(100, Math.round(((xp - currentLevelStart) / 120) * 100)));
  const title = levelTitles[Math.min(levelTitles.length - 1, Math.floor((level - 1) / 2))];

  const badges: GamificationBadge[] = [
    {
      key: 'starter',
      title: 'Start Engine',
      description: 'Selesaikan progress harian minimal 40%.',
      unlocked: totalProgress >= 40
    },
    {
      key: 'focus',
      title: 'Deep Focus',
      description: 'Selesaikan progress harian minimal 70%.',
      unlocked: totalProgress >= 70
    },
    {
      key: 'perfect',
      title: 'Perfect Flight',
      description: 'Selesaikan 100% checklist harian.',
      unlocked: totalProgress >= 100
    },
    {
      key: 'streak3',
      title: '3-Day Combo',
      description: 'Pertahankan streak minimal 3 hari.',
      unlocked: streak >= 3
    }
  ];

  return { xp, level, nextLevelXp, xpProgress, title, badges };
}
