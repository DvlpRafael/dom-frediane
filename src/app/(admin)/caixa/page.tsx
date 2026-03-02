"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

interface Agendamento {
  id: string;
  clienteNome: string;
  clienteWhats: string;
  servico: string;
  profissional: string;
  data: string;
  hora: string;
}

export default function AgendaAdmin() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Cria uma consulta ordenada pela data de criação
    const q = query(collection(db, "agendamentos"), orderBy("criadoEm", "desc"));

    // O onSnapshot ouve mudanças no banco em tempo real! ⚡
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs: Agendamento[] = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() } as Agendamento);
      });
      setAgendamentos(docs);
      setCarregando(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-yellow-500 mb-8 uppercase tracking-tighter">
          Agenda Dom Frediane 📅
        </h1>

        {carregando ? (
          <p className="text-zinc-500">Carregando agendamentos...</p>
        ) : (
          <div className="grid gap-4">
            {agendamentos.length === 0 ? (
              <p className="text-zinc-600">Nenhum agendamento encontrado.</p>
            ) : (
              agendamentos.map((item) => (
                <div key={item.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex justify-between items-center shadow-lg">
                  <div>
                    <p className="text-yellow-500 font-bold text-lg">{item.clienteNome}</p>
                    <p className="text-sm text-zinc-400">{item.servico} com <span className="text-zinc-200">{item.profissional}</span></p>
                    <p className="text-xs text-zinc-500 mt-1 uppercase font-mono">{item.data} às {item.hora}</p>
                  </div>
                  <a 
                    href={`https://wa.me/${item.clienteWhats.replace(/\D/g, "")}`}
                    target="_blank"
                    className="bg-green-600 hover:bg-green-700 p-3 rounded-full transition-colors"
                  >
                    📱
                  </a>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}