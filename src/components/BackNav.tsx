"use client";

import Link from 'next/link';

export default function BackNav() {
  function goBack() {
    try { history.back(); } catch {}
  }
  return (
    <div className="mb-4 flex items-center gap-3 text-sm">
      <Link href="/" className="inline-flex items-center gap-1 text-gold hover:underline">
        ← Inicio
      </Link>
      <button type="button" onClick={goBack} className="inline-flex items-center gap-1 text-gray-300 hover:text-white">
        Atrás
      </button>
    </div>
  );
}


