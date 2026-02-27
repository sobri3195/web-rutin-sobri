export function PegasusLogo({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 36c11-3 14-16 30-16 9 0 14 4 18 9-5-2-10-1-14 1 3 2 6 6 7 10-6-3-12-3-17 0-6 3-8 11-19 11-7 0-11-4-13-9 4 1 8 0 11-2-2-1-3-3-3-4z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 20c4 0 8 3 9 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}
