import { Appointment } from '@/types';

interface CardProps {
  appt: Appointment;
  onApprove: () => void;
  onNegate: () => void;
  onWhatsApp: () => void;
}

export default function AppointmentCard({ appt, onApprove, onNegate, onWhatsApp }: CardProps) {
  const statusStyles = {
    pendente: "border-orange-500 bg-zinc-900/40",
    aprovado: "border-green-500 bg-zinc-900/60",
    negado: "border-red-600 bg-zinc-950 opacity-50",
    bloqueado: "border-zinc-500 bg-black opacity-90"
  };

  return (
    <div className={`flex items-center justify-between p-5 mb-3 border-l-4 rounded-xl border border-zinc-800 shadow-xl transition-all ${statusStyles[appt.status]}`}>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
            <span className="text-xl font-black text-white">{appt.time}</span>
            {appt.status === 'bloqueado' && <span className="text-[10px] bg-zinc-700 px-2 py-0.5 rounded text-zinc-300 uppercase">Bloqueado</span>}
        </div>
        <h3 className="text-lg font-bold text-zinc-100">{appt.clientName}</h3>
        <p className="text-xs text-zinc-500 font-medium uppercase tracking-tighter">
            {appt.service} {appt.price > 0 && `• R$ ${appt.price}`}
        </p>
      </div>

      <div className="flex gap-2">
        {appt.status === 'pendente' && (
          <>
            <button onClick={onApprove} className="w-12 h-12 flex items-center justify-center bg-green-600/20 text-green-500 rounded-xl border border-green-600/30 active:scale-90 transition-all">✅</button>
            <button onClick={onNegate} className="w-12 h-12 flex items-center justify-center bg-red-600/20 text-red-500 rounded-xl border border-red-600/30 active:scale-90 transition-all">❌</button>
          </>
        )}
        {appt.status === 'aprovado' && (
          <button onClick={onWhatsApp} className="w-12 h-12 flex items-center justify-center bg-zinc-800 text-zinc-300 rounded-xl border border-zinc-700 active:scale-90 transition-all">📲</button>
        )}
        {appt.status === 'bloqueado' && (
          <button className="w-12 h-12 flex items-center justify-center bg-zinc-800 text-zinc-400 rounded-xl border border-zinc-700 active:scale-90 transition-all">🔓</button>
        )}
      </div>
    </div>
  );
}