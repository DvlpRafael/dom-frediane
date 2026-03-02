"use client";

import { useState } from 'react';
import CalendarStrip from '@/components/CalendarStrip';
import AppointmentCard from '@/components/AppointmentCard';
import Toast from '@/components/Toast';
import { Appointment } from '@/types';

const INITIAL_DATA: Appointment[] = [
  { id: '1', clientName: 'Ricardo Silva', time: '09:00', service: 'Corte + Barba', price: 80, duration: '1h', status: 'pendente' },
  { id: '2', clientName: 'Vago', time: '10:00', service: '-', price: 0, duration: '-', status: 'pendente' },
  { id: '3', clientName: 'Felipe Souza', time: '11:00', service: 'Degradê', price: 50, duration: '45m', status: 'aprovado' },
  { id: '4', clientName: 'Almoço', time: '12:00', service: 'Intervalo', price: 0, duration: '1h', status: 'bloqueado' },
];

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_DATA);
  const [selectedDate, setSelectedDate] = useState(11);
  const [filterOnlyBusy, setFilterOnlyBusy] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });

  const showNotification = (msg: string) => {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast({ visible: false, message: "" }), 3000);
  };

  const handleApprove = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'aprovado' as const } : a));
    showNotification("Horário confirmado! ✅");
  };

  const handleNegate = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'negado' as const } : a));
    showNotification("Agendamento recusado. ❌");
  };

  const displayedAppointments = filterOnlyBusy 
    ? appointments.filter(a => a.status !== 'pendente' || a.clientName !== 'Vago')
    : appointments;

  const totalGanhos = appointments
    .filter(a => a.status === 'aprovado')
    .reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl p-6 flex justify-between items-center border-b border-zinc-900">
        <h1 className="text-xl font-black uppercase tracking-tighter">Agenda</h1>
        <button 
          onClick={() => setFilterOnlyBusy(!filterOnlyBusy)}
          className={`px-4 py-2 rounded-xl text-[10px] font-black border transition-all ${
            filterOnlyBusy ? "bg-white text-black border-white" : "bg-zinc-900 text-zinc-500 border-zinc-800"
          }`}
        >
          {filterOnlyBusy ? "MOSTRAR TUDO" : "FILTRAR OCUPADOS"}
        </button>
      </header>

      <div className="p-6">
        <CalendarStrip selectedDate={selectedDate} onDateChange={setSelectedDate} />
        
        <div className="mt-8 space-y-2">
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Cronograma Diário</p>
            {displayedAppointments.map(appt => (
            <AppointmentCard 
                key={appt.id} 
                appt={appt} 
                onApprove={() => handleApprove(appt.id)}
                onNegate={() => handleNegate(appt.id)}
                onWhatsApp={() => alert("Abrindo WhatsApp...")}
            />
            ))}
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} />

      <footer className="fixed bottom-0 left-0 w-full p-6 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-900 flex justify-between items-center">
        <div>
          <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">Faturamento</p>
          <p className="text-2xl font-black text-green-500">R$ {totalGanhos},00</p>
        </div>
        <button className="bg-white text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase shadow-lg active:scale-95 transition-all">
          Bloquear +
        </button>
      </footer>
    </div>
  );
}