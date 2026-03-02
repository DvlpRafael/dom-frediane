"use client";

export default function CalendarStrip({ selectedDate, onDateChange }: { selectedDate: number, onDateChange: (d: number) => void }) {
  const days = [
    { label: 'SEG', num: 9 }, { label: 'TER', num: 10 }, { label: 'QUA', num: 11 },
    { label: 'QUI', num: 12 }, { label: 'SEX', num: 13 }, { label: 'SAB', num: 14 },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
      {days.map((day) => (
        <button
          key={day.num}
          onClick={() => onDateChange(day.num)}
          className={`flex-shrink-0 w-14 h-20 flex flex-col items-center justify-center rounded-2xl transition-all ${
            selectedDate === day.num 
            ? "bg-white text-black font-black scale-105" 
            : "bg-zinc-900 border border-zinc-800 text-zinc-500 font-bold"
          }`}
        >
          <span className="text-[9px] uppercase tracking-tighter">{day.label}</span>
          <span className="text-xl">{day.num}</span>
          {day.num === 11 && <div className="w-1 h-1 bg-orange-500 rounded-full mt-1" />}
        </button>
      ))}
    </div>
  );
}