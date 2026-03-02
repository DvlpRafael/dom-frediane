"use client";

export default function Toast({ message, visible }: { message: string, visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-green-600 text-white px-6 py-3 rounded-full shadow-[0_0_20px_rgba(22,163,74,0.5)] font-bold flex items-center gap-2 border border-green-400">
        <span>✅</span> {message}
      </div>
    </div>
  );
}