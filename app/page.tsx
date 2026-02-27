'use client';

import Link from 'next/link';
import { PegasusLogo } from '@/components/pegasus-logo';
import { ProgressBar } from '@/components/progress-bar';
import { useRoutines } from '@/components/routines-provider';

export default function HomePage() {
  const { routines, status, progressByMode, totalProgress, streak } = useRoutines();
  const done = routines.filter((item) => status[item.id]).length;

  return (
    <div className="space-y-6">
      <section className="card overflow-hidden bg-gradient-to-br from-accent-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Rutinitas Sobri</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Pegasus Mode: Pagi • Minggu • Malam</p>
            <p className="mt-3 max-w-md text-sm text-slate-600 dark:text-slate-300">Bangun momentum setiap hari dengan ritme disiplin, konsisten, dan naik level.</p>
          </div>
          <PegasusLogo className="h-16 w-16 text-accent-600" />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {['pagi', 'minggu', 'malam'].map((mode) => (
            <Link key={mode} href="/rutinitas" className="focus-ring rounded-xl bg-accent-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-accent-700">
              Mulai {mode[0].toUpperCase() + mode.slice(1)}
            </Link>
          ))}
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
    </div>
  );
}
