'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Route } from 'next';
import { usePathname } from 'next/navigation';
import { useTheme } from './theme-provider';

const links: { href: Route; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/rutinitas', label: 'Rutinitas' },
  { href: '/journal', label: 'Journal' },
  { href: '/links', label: 'Links' },
  { href: '/about', label: 'About' }
];

export function Navbar() {
  const path = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
      <nav className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded-xl px-2 py-1">
          <Image src="/logo.svg" alt="Rutinitas Sobri Logo" width={30} height={30} className="h-7 w-7" priority />
          <span className="font-semibold">Rutinitas Sobri</span>
        </Link>

        <div className="flex items-center gap-2 sm:hidden">
          <button onClick={toggleTheme} className="focus-ring rounded-lg border border-slate-300 px-2 py-1.5 text-xs dark:border-slate-700" aria-label="Toggle mode">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button onClick={() => setOpen((prev) => !prev)} className="focus-ring rounded-lg border border-slate-300 px-2 py-1.5 text-xs dark:border-slate-700" aria-label="Toggle menu">
            {open ? 'Tutup' : 'Menu'}
          </button>
        </div>

        <div className={`${open ? 'flex' : 'hidden'} w-full flex-col gap-1 sm:flex sm:w-auto sm:flex-row sm:items-center sm:gap-2`}>
          {links.map((link) => {
            const active = path === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`focus-ring rounded-lg px-2 py-1.5 text-xs sm:text-sm ${
                  active ? 'bg-accent-100 text-accent-700 dark:bg-accent-700/20 dark:text-accent-100' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <button onClick={toggleTheme} className="focus-ring hidden rounded-lg border border-slate-300 px-2 py-1.5 text-xs dark:border-slate-700 sm:block" aria-label="Toggle mode">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>
    </header>
  );
}
