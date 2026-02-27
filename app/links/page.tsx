import { usefulLinks } from '@/lib/usefulLinks';

export default function LinksPage() {
  return (
    <section className="card space-y-4">
      <h1 className="text-2xl font-bold">Daftar Link Sobri</h1>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Kumpulan tautan yang kamu kirim (nama + link) agar lebih mudah diakses dari satu halaman.
      </p>

      <div className="space-y-2">
        {usefulLinks.map((item, index) => (
          <a
            key={`${item.url}-${index}`}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl border border-slate-200 p-3 text-sm hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
          >
            <p className="font-medium text-slate-900 dark:text-slate-100">{item.name}</p>
            <p className="mt-1 break-all text-xs text-slate-500 dark:text-slate-400">{item.url}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
