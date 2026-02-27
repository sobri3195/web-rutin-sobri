const canUseWindow = () => typeof window !== 'undefined';

export const storage = {
  get<T>(key: string, fallback: T): T {
    if (!canUseWindow()) return fallback;
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },
  set<T>(key: string, value: T): void {
    if (!canUseWindow()) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key: string): void {
    if (!canUseWindow()) return;
    window.localStorage.removeItem(key);
  }
};

export const keyToday = () => new Date().toISOString().slice(0, 10);
