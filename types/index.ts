export type RoutineMode = 'pagi' | 'minggu' | 'malam';

export interface RoutineItem {
  id: string;
  title: string;
  duration: number;
  category: string;
  mode: RoutineMode;
}

export interface DailyStatus {
  [routineId: string]: boolean;
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface DayProgress {
  date: string;
  percent: number;
}
