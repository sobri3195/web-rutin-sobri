'use client';

import { useEffect, useState } from 'react';
import { RoutineItem, RoutineMode } from '@/types';

interface RoutineModalProps {
  open: boolean;
  mode: RoutineMode;
  initial?: RoutineItem | null;
  onClose: () => void;
  onSubmit: (payload: Omit<RoutineItem, 'id'> | RoutineItem) => void;
}

export function RoutineModal({ open, mode, initial, onClose, onSubmit }: RoutineModalProps) {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(10);
  const [category, setCategory] = useState('Umum');

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setDuration(initial.duration);
      setCategory(initial.category);
    } else {
      setTitle('');
      setDuration(10);
      setCategory('Umum');
    }
  }, [initial, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-4 shadow-soft dark:bg-slate-900">
        <h3 className="mb-3 text-lg font-semibold">{initial ? 'Edit rutinitas' : 'Tambah rutinitas'}</h3>
        <form
          className="space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            const payload = { title, duration, category, mode };
            if (initial) {
              onSubmit({ ...initial, ...payload });
            } else {
              onSubmit(payload);
            }
            onClose();
          }}
        >
          <label className="block text-sm">
            Judul
            <input value={title} onChange={(e) => setTitle(e.target.value)} required className="focus-ring mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" />
          </label>
          <label className="block text-sm">
            Durasi (menit)
            <input type="number" min={1} value={duration} onChange={(e) => setDuration(Number(e.target.value))} required className="focus-ring mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" />
          </label>
          <label className="block text-sm">
            Kategori
            <input value={category} onChange={(e) => setCategory(e.target.value)} required className="focus-ring mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" />
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="focus-ring rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700" onClick={onClose}>Batal</button>
            <button type="submit" className="focus-ring rounded-xl bg-accent-600 px-3 py-2 text-sm font-medium text-white">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}
