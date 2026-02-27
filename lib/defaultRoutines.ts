import { RoutineItem } from '@/types';

export const defaultRoutines: RoutineItem[] = [
  { id: 'pagi-1', title: 'Doa & niat positif', duration: 10, category: 'Spiritual', mode: 'pagi' },
  { id: 'pagi-2', title: 'Olahraga ringan', duration: 15, category: 'Kesehatan', mode: 'pagi' },
  { id: 'pagi-3', title: 'Baca / latihan fokus', duration: 20, category: 'Belajar', mode: 'pagi' },
  { id: 'pagi-4', title: 'Rencana harian', duration: 10, category: 'Produktivitas', mode: 'pagi' },
  { id: 'minggu-1', title: 'Evaluasi mingguan', duration: 25, category: 'Review', mode: 'minggu' },
  { id: 'minggu-2', title: 'Planning pekan depan', duration: 30, category: 'Planning', mode: 'minggu' },
  { id: 'minggu-3', title: 'Belajar skill baru', duration: 40, category: 'Belajar', mode: 'minggu' },
  { id: 'minggu-4', title: 'Beres-beres ruang kerja', duration: 20, category: 'Lifestyle', mode: 'minggu' },
  { id: 'malam-1', title: 'Refleksi hari ini', duration: 10, category: 'Mindset', mode: 'malam' },
  { id: 'malam-2', title: 'Doa malam', duration: 8, category: 'Spiritual', mode: 'malam' },
  { id: 'malam-3', title: 'Journaling syukur', duration: 12, category: 'Jurnal', mode: 'malam' },
  { id: 'malam-4', title: 'Tidur teratur', duration: 5, category: 'Recovery', mode: 'malam' }
];
