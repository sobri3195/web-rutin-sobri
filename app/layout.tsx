import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { AppProviders } from '@/components/app-providers';

export const metadata: Metadata = {
  title: 'Rutinitas Sobri',
  description: 'Daily tracker motivasi dengan mode Pegasus.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AppProviders>
            <Navbar />
            <main className="mx-auto min-h-[calc(100vh-80px)] w-full max-w-5xl px-4 pb-12 pt-6 sm:px-6">
              {children}
            </main>
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
