'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultRoutines } from '@/lib/defaultRoutines';
import { keyToday, storage } from '@/lib/storage';
import { DailyStatus, DayProgress, RoutineItem, RoutineMode } from '@/types';
import { percent } from '@/lib/progress';

interface RoutinesContextShape {
  routines: RoutineItem[];
  status: DailyStatus;
  toggleCheck: (id: string) => void;
  addRoutine: (item: Omit<RoutineItem, 'id'>) => void;
  editRoutine: (item: RoutineItem) => void;
  deleteRoutine: (id: string) => void;
  resetToday: () => void;
  completeAll: () => void;
  progressByMode: Record<RoutineMode, number>;
  totalProgress: number;
  streak: number;
}

const RoutinesContext = createContext<RoutinesContextShape | null>(null);

export function RoutinesProvider({ children }: { children: React.ReactNode }) {
  const [routines, setRoutines] = useState<RoutineItem[]>(defaultRoutines);
  const [status, setStatus] = useState<DailyStatus>({});
  const [history, setHistory] = useState<DayProgress[]>([]);

  useEffect(() => {
    setRoutines(storage.get<RoutineItem[]>('sobri-routines', defaultRoutines));
    setStatus(storage.get<DailyStatus>(`sobri-status-${keyToday()}`, {}));
    setHistory(storage.get<DayProgress[]>('sobri-progress-history', []));
  }, []);

  useEffect(() => {
    storage.set('sobri-routines', routines);
  }, [routines]);

  useEffect(() => {
    storage.set(`sobri-status-${keyToday()}`, status);
  }, [status]);

  const totalProgress = useMemo(() => {
    const done = routines.filter((item) => status[item.id]).length;
    return percent(done, routines.length);
  }, [routines, status]);

  useEffect(() => {
    const today = keyToday();
    const next = history.filter((day) => day.date !== today).concat({ date: today, percent: totalProgress });
    setHistory(next);
    storage.set('sobri-progress-history', next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalProgress]);

  const progressByMode = useMemo(() => {
    const modes: RoutineMode[] = ['pagi', 'minggu', 'malam'];
    return modes.reduce(
      (acc, mode) => {
        const items = routines.filter((routine) => routine.mode === mode);
        const done = items.filter((item) => status[item.id]).length;
        acc[mode] = percent(done, items.length);
        return acc;
      },
      { pagi: 0, minggu: 0, malam: 0 } as Record<RoutineMode, number>
    );
  }, [routines, status]);

  const toggleCheck = (id: string) => setStatus((prev) => ({ ...prev, [id]: !prev[id] }));

  const addRoutine = (item: Omit<RoutineItem, 'id'>) => {
    const id = `${item.mode}-${Date.now()}`;
    setRoutines((prev) => [...prev, { ...item, id }]);
  };

  const editRoutine = (item: RoutineItem) => {
    setRoutines((prev) => prev.map((routine) => (routine.id === item.id ? item : routine)));
  };

  const deleteRoutine = (id: string) => {
    setRoutines((prev) => prev.filter((item) => item.id !== id));
    setStatus((prev) => {
      const clone = { ...prev };
      delete clone[id];
      return clone;
    });
  };

  const resetToday = () => setStatus({});

  const completeAll = () => {
    const done = routines.reduce((acc, routine) => ({ ...acc, [routine.id]: true }), {});
    setStatus(done);
  };

  const streak = useMemo(() => {
    const sorted = [...history].sort((a, b) => b.date.localeCompare(a.date));
    let count = 0;
    for (let i = 0; i < sorted.length; i += 1) {
      const item = sorted[i];
      if (item.percent < 70) break;
      if (i > 0) {
        const prev = new Date(sorted[i - 1].date);
        const current = new Date(item.date);
        const diff = Math.round((prev.getTime() - current.getTime()) / (1000 * 60 * 60 * 24));
        if (diff !== 1) break;
      }
      count += 1;
    }
    return count;
  }, [history]);

  return (
    <RoutinesContext.Provider
      value={{ routines, status, toggleCheck, addRoutine, editRoutine, deleteRoutine, resetToday, completeAll, progressByMode, totalProgress, streak }}
    >
      {children}
    </RoutinesContext.Provider>
  );
}

export function useRoutines() {
  const context = useContext(RoutinesContext);
  if (!context) throw new Error('useRoutines must be used inside RoutinesProvider');
  return context;
}
