'use client';

import { useMemo, useState } from 'react';
import { storage } from '@/lib/storage';
import { JournalEntry } from '@/types';

const filters = ['hari ini', '7 hari terakhir', 'semua'] as const;

export default function JournalPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [filter, setFilter] = useState<(typeof filters)[number]>('hari ini');
  const [entries, setEntries] = useState<JournalEntry[]>(() => storage.get<JournalEntry[]>('sobri-journal', []));

  const saveEntry = () => {
    if (!title.trim() || !content.trim()) return;
    const next: JournalEntry[] = [{ id: `${Date.now()}`, title, content, createdAt: new Date().toISOString() }, ...entries];
    setEntries(next);
    storage.set('sobri-journal', next);
    setTitle('');
    setContent('');
  };

  const filtered = useMemo(() => {
    const now = new Date();
    return entries.filter((entry) => {
      const date = new Date(entry.createdAt);
      if (filter === 'semua') return true;
      if (filter === 'hari ini') return date.toDateString() === now.toDateString();
      return now.getTime() - date.getTime() <= 7 * 24 * 60 * 60 * 1000;
    });
  }, [entries, filter]);

  return (
    <div className="space-y-5">
      <section className="card space-y-3">
        <h1 className="text-xl font-semibold">Journal / Catatan Harian</h1>
        <label className="block text-sm">Judul
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="focus-ring mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" />
        </label>
        <label className="block text-sm">Isi catatan
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={4} className="focus-ring mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" />
        </label>
        <button onClick={saveEntry} className="focus-ring rounded-xl bg-accent-600 px-3 py-2 text-sm font-medium text-white">Simpan Catatan</button>
      </section>

      <section className="card space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Catatan tersimpan</h2>
          <div className="flex gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            {filters.map((item) => (
              <button key={item} onClick={() => setFilter(item)} className={`focus-ring rounded-lg px-2 py-1 text-xs ${filter === item ? 'bg-white dark:bg-slate-700' : ''}`}>{item}</button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {filtered.length === 0 ? <p className="text-sm text-slate-500">Belum ada catatan untuk filter ini.</p> : filtered.map((entry) => (
            <article key={entry.id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
              <h3 className="font-medium">{entry.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{entry.content}</p>
              <p className="mt-1 text-xs text-slate-500">{new Date(entry.createdAt).toLocaleString('id-ID')}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
