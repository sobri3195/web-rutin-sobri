'use client';

import { useMemo, useState } from 'react';
import { ProgressBar } from '@/components/progress-bar';
import { RoutineModal } from '@/components/routine-modal';
import { useRoutines } from '@/components/routines-provider';
import { getGamificationStats } from '@/lib/gamification';
import { RoutineItem, RoutineMode } from '@/types';

const tabs: { label: string; value: RoutineMode }[] = [
  { label: 'Pegasus Pagi', value: 'pagi' },
  { label: 'Pegasus Minggu', value: 'minggu' },
  { label: 'Pegasus Malam', value: 'malam' }
];

export default function RoutinePage() {
  const { routines, status, toggleCheck, addRoutine, editRoutine, deleteRoutine, resetToday, completeAll, progressByMode, totalProgress, streak } = useRoutines();
  const [activeTab, setActiveTab] = useState<RoutineMode>('pagi');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<RoutineItem | null>(null);
  const game = getGamificationStats(totalProgress, streak);

  const activeItems = useMemo(() => routines.filter((item) => item.mode === activeTab), [routines, activeTab]);

  return (
    <div className="space-y-5">
      <div className="card space-y-4">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`focus-ring rounded-xl px-3 py-2 text-xs sm:text-sm ${
                activeTab === tab.value ? 'bg-accent-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <ProgressBar value={progressByMode[activeTab]} label={`Progress ${tabs.find((tab) => tab.value === activeTab)?.label}`} />
        <ProgressBar value={totalProgress} label="Total Harian" />
        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-sm dark:border-indigo-800/70 dark:bg-indigo-900/20">
          <p className="font-semibold">🎮 Quest Hari Ini</p>
          <p className="text-xs text-slate-600 dark:text-slate-300">Capai 70% untuk menjaga streak dan dapat bonus +50 XP.</p>
          <p className="mt-1 text-xs font-medium">XP saat ini: {game.xp}</p>
        </div>
      </div>

      <div className="card">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold">Daftar rutinitas</h2>
          <button className="focus-ring rounded-xl bg-accent-600 px-3 py-2 text-sm font-medium text-white" onClick={() => { setEditing(null); setModalOpen(true); }}>
            + Tambah
          </button>
        </div>

        <div className="space-y-2">
          {activeItems.map((item) => (
            <div key={item.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-accent-300 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex flex-1 cursor-pointer items-start gap-3">
                <input type="checkbox" checked={Boolean(status[item.id])} onChange={() => toggleCheck(item.id)} className="mt-1 h-4 w-4 accent-accent-600" />
                <span>
                  <span className={`block text-sm font-medium transition ${status[item.id] ? 'text-slate-400 line-through' : ''}`}>{item.title}</span>
                  <span className="text-xs text-slate-500">{item.duration} menit • {item.category}</span>
                </span>
              </label>
              <div className="flex gap-1 self-end sm:self-auto">
                <button className="focus-ring rounded-lg border border-slate-300 px-2 py-1 text-xs dark:border-slate-700" onClick={() => { setEditing(item); setModalOpen(true); }}>Edit</button>
                <button className="focus-ring rounded-lg border border-rose-300 px-2 py-1 text-xs text-rose-600" onClick={() => deleteRoutine(item.id)}>Hapus</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button className="focus-ring rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700" onClick={resetToday}>Reset Hari Ini</button>
          <button className="focus-ring rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white" onClick={completeAll}>Selesai Semua</button>
        </div>
      </div>

      <RoutineModal
        open={modalOpen}
        mode={activeTab}
        initial={editing}
        onClose={() => setModalOpen(false)}
        onSubmit={(payload) => {
          if ('id' in payload) {
            editRoutine(payload);
          } else {
            addRoutine(payload);
          }
        }}
      />
    </div>
  );
}
