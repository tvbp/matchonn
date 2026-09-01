import Link from "next/link";

export default function FlowHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"
        >
          <span aria-hidden>←</span>
          <span className="font-heading text-lg font-extrabold text-slate-900">Matchonn</span>
        </Link>
      </div>
    </header>
  );
}
