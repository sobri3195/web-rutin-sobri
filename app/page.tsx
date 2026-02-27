'use client';

import Link from 'next/link';
import { PegasusLogo } from '@/components/pegasus-logo';
import { ProgressBar } from '@/components/progress-bar';
import { useRoutines } from '@/components/routines-provider';
import { getGamificationStats } from '@/lib/gamification';

export default function HomePage() {
  const { routines, status, progressByMode, totalProgress, streak } = useRoutines();
  const done = routines.filter((item) => status[item.id]).length;
  const game = getGamificationStats(totalProgress, streak);

  return (
    <div className="space-y-6 sm:space-y-7">
      <section className="card overflow-hidden bg-gradient-to-br from-accent-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="inline-flex rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-700 dark:bg-accent-700/20 dark:text-accent-200">Level {game.level} • {game.title}</p>
            <h1 className="mt-3 text-2xl font-bold sm:text-3xl">Rutinitas Sobri</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Pegasus Mode: Pagi • Minggu • Malam</p>
            <p className="mt-3 max-w-md text-sm text-slate-600 dark:text-slate-300">Bangun momentum setiap hari dengan ritme disiplin, konsisten, dan naik level.</p>
          </div>
          <div className="flex items-center gap-3">
            <PegasusLogo className="h-14 w-14 text-accent-600 sm:h-16 sm:w-16" />
            <div className="rounded-xl border border-accent-200 bg-white/80 px-3 py-2 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
              <p className="font-semibold">XP: {game.xp}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Next level: {game.nextLevelXp} XP</p>
            </div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {['pagi', 'minggu', 'malam'].map((mode) => (
            <Link key={mode} href="/rutinitas" className="focus-ring rounded-xl bg-accent-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-accent-700">
              Mulai {mode[0].toUpperCase() + mode.slice(1)}
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <ProgressBar value={game.xpProgress} label="Progress Level" />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="card space-y-3">
          <h2 className="text-lg font-semibold">Ringkasan hari ini</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">{done}/{routines.length} checklist selesai</p>
          <ProgressBar value={totalProgress} label="Total Progress Harian" />
          <p className="rounded-xl bg-slate-100 px-3 py-2 text-sm dark:bg-slate-800">Streak aktif: <strong>{streak} hari</strong></p>
        </div>

        <div className="card space-y-3">
          <h2 className="text-lg font-semibold">Progress per mode</h2>
          <ProgressBar value={progressByMode.pagi} label="Pegasus Pagi" />
          <ProgressBar value={progressByMode.minggu} label="Pegasus Minggu" />
          <ProgressBar value={progressByMode.malam} label="Pegasus Malam" />
          <p className="text-sm text-slate-500 dark:text-slate-400">Catatan: cek konsisten di atas 70% untuk menjaga streak.</p>
        </div>
      </section>

      <section className="card space-y-3">
        <h2 className="text-lg font-semibold">Badge Harian</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {game.badges.map((badge) => (
            <div
              key={badge.key}
              className={`rounded-xl border p-3 text-sm ${badge.unlocked ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-700/50 dark:bg-emerald-900/20' : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/60'}`}
            >
              <p className="font-semibold">{badge.unlocked ? '🏆' : '🔒'} {badge.title}</p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{badge.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
