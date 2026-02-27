'use client';

import { RoutinesProvider } from './routines-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <RoutinesProvider>{children}</RoutinesProvider>;
}
