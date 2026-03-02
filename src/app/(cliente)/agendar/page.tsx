"use client";
import { useState, useEffect } from "react";
import { db } from "../../../lib/firebase"; 
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";

// --- DADOS ---
const servicos = [
  { id: 1, nome: "Cabelo", preco: 38.00, tempo: 30, desc: "Degradê, Social ou Tesoura" },
  { id: 2, nome: "Barba", preco: 38.00, tempo: 30, desc: "Modelagem e Toalha Quente" },
  { id: 3, nome: "Sobrancelha", preco: 15.00, tempo: 10, desc: "Alinhamento na navalha" },
];

const profissionais = [
  { id: 1, nome: "Frediane", telefone: "554498794212" }, 
  { id: 2, nome: "João", telefone: "554498794212" }, 
];

export default function Agendar() {
  const [etapa, setEtapa] = useState(1);
  const [servicosIds, setServicosIds] = useState<number[]>([]);
  const [profissionalId, setProfissionalId] = useState<number | null>(null);
  
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  
  const [carregando, setCarregando] = useState(false);
  const [buscandoHorarios, setBuscandoHorarios] = useState(false);
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);

  // --- LÓGICA ---
  
  // Função de Máscara de Telefone
  const formatarTelefone = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    const limitado = apenasNumeros.slice(0, 11);
    return limitado
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2");
  };

  const toggleServico = (id: number) => {
    setServicosIds(prev => 
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
  };

  const servicosSelec = servicos.filter(s => servicosIds.includes(s.id));
  const profSelec = profissionais.find(p => p.id === profissionalId);
  const valorTotal = servicosSelec.reduce((acc, s) => acc + s.preco, 0);

  const gerarDias = () => {
    const dias = [];
    const hoje = new Date();
    for (let i = 0; i < 14; i++) {
      const data = new Date(hoje);
      data.setDate(hoje.getDate() + i);
      const diaSemana = data.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
      const diaNumero = data.getDate();
      const valorBanco = data.toISOString().split('T')[0];
      dias.push({ diaSemana, diaNumero, valorBanco });
    }
    return dias;
  };
  
  const diasDisponiveis = gerarDias();

  useEffect(() => {
    if (!profissionalId || !dataSelecionada) return;
    const buscarOcupados = async () => {
      setBuscandoHorarios(true);
      setHorarioSelecionado(""); 
      try {
        const nomeProf = profissionais.find(p => p.id === profissionalId)?.nome;
        const q = query(collection(db, "agendamentos"), where("profissional", "==", nomeProf), where("data", "==", dataSelecionada));
        const snapshot = await getDocs(q);
        setHorariosOcupados(snapshot.docs.map(doc => doc.data().hora));
      } catch (error) { console.error("Erro:", error); } finally { setBuscandoHorarios(false); }
    };
    buscarOcupados();
  }, [profissionalId, dataSelecionada]);

  const gerarHorarios = () => {
    const lista = [];
    let h = 8, m = 30;
    while (h < 19 || (h === 19 && m === 0)) {
      lista.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
      m += 30;
      if (m === 60) { h++; m = 0; }
    }
    return lista;
  };

  const finalizarAgendamento = async () => {
    setCarregando(true);
    try {
      const listaNomes = servicosSelec.map(s => s.nome).join(", ");
      
      // Salva no Firestore
      await addDoc(collection(db, "agendamentos"), {
        clienteNome: nome, 
        clienteWhats: whatsapp, 
        servicos: listaNomes, 
        valorTotal,
        profissional: profSelec?.nome, 
        data: dataSelecionada, 
        hora: horarioSelecionado, 
        criadoEm: serverTimestamp()
      });

      // Formata a data para exibir bonito (DD/MM/AAAA)
      const dataFormatada = dataSelecionada.split('-').reverse().join('/');

      // Mensagem do WhatsApp formatada como pedido
      const msg = `Olá, gostaria de confirmar um horário.%0A%0A✂️ *Agendamento:* Dom Frediane%0AMeu nome é ${nome}%0A👤 *Profissional:* ${profSelec?.nome}%0A📅 *Data:* ${dataFormatada} às ${horarioSelecionado}`;
      
      window.open(`https://wa.me/${profSelec?.telefone}?text=${msg}`, "_blank");
      
      alert("Agendamento realizado com sucesso!"); 
      window.location.reload(); 
    } catch (e) { 
      console.error(e); 
      alert("Erro ao salvar."); 
    } finally { 
      setCarregando(false); 
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black text-white p-6 pb-40 font-sans selection:bg-yellow-500/30 selection:text-yellow-500">
      
      {/* HEADER */}
      <header className="flex flex-col items-center justify-center py-8 relative animate-in fade-in slide-in-from-top-4 duration-700">
        <img 
          src="https://i.imgur.com/EhlDl0d.png" 
          alt="Dom Frediane Barbearia" 
          className="h-28 w-auto object-contain drop-shadow-[0_0_25px_rgba(234,179,8,0.2)]"
        />
        {etapa === 1 && (
             <span className="absolute top-8 right-0 text-[10px] font-bold bg-zinc-900/50 backdrop-blur-md text-zinc-400 px-3 py-1 rounded-full border border-zinc-800/50 uppercase tracking-widest">
                 Etapa 1/2
             </span>
        )}
      </header>

      {etapa === 1 ? (
        <div className="space-y-10 animate-in fade-in duration-500 delay-150">
          
          {/* 1. SERVIÇOS */}
          <section>
            <h2 className="text-zinc-400 text-xs font-bold uppercase mb-6 tracking-[0.2em] pl-1 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-yellow-500/50"></span> 1. Escolha o estilo
            </h2>
            <div className="grid gap-4">
              {servicos.map(s => {
                const isSelected = servicosIds.includes(s.id);
                return (
                <button key={s.id} onClick={() => toggleServico(s.id)}
                  className={`group relative p-5 rounded-2xl border backdrop-blur-sm transition-all duration-500 ease-out flex justify-between items-center hover:-translate-y-1
                    ${isSelected
                      ? "border-yellow-500/50 bg-zinc-900/80 shadow-[0_10px_30px_-10px_rgba(234,179,8,0.3)]" 
                      : "border-white/5 bg-white/5 text-zinc-400 hover:bg-white/10 hover:border-white/10 hover:shadow-lg"
                    }`}>
                  
                  <div className="text-left z-10">
                    <p className={`font-bold text-lg transition-colors duration-300 ${isSelected ? "text-white" : "text-zinc-300 group-hover:text-white"}`}>
                      {s.nome}
                    </p>
                    <p className="text-sm font-medium opacity-60 group-hover:opacity-100 transition-opacity">R$ {s.preco.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 z-10">
                    <span className="text-xs font-mono bg-black/30 px-2 py-1 rounded-md border border-white/5 text-zinc-400">{s.tempo} min</span>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-black font-bold transition-all duration-500 ${isSelected ? "bg-yellow-500 rotate-0 scale-100" : "bg-transparent border border-zinc-700 rotate-90 scale-0 opacity-0"}`}>
                      {isSelected && "✓"}
                    </div>
                  </div>
                </button>
              )})}
            </div>
          </section>

          {/* 2. PROFISSIONAL */}
          {servicosIds.length > 0 && (
            <section className="animate-in slide-in-from-bottom-4 duration-700 fade-in">
              <h2 className="text-zinc-400 text-xs font-bold uppercase mb-6 tracking-[0.2em] pl-1 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-yellow-500/50"></span> 2. Com quem?
              </h2>
              <div className="flex gap-4">
                {profissionais.map(p => (
                  <button key={p.id} onClick={() => setProfissionalId(p.id)}
                    className={`flex-1 p-6 rounded-2xl border backdrop-blur-sm text-center transition-all duration-500 group hover:-translate-y-1
                      ${profissionalId === p.id 
                        ? "border-yellow-500/50 bg-zinc-900/80 text-white shadow-[0_10px_30px_-10px_rgba(234,179,8,0.3)]" 
                        : "border-white/5 bg-white/5 text-zinc-500 hover:bg-white/10 hover:border-white/10 hover:text-white"
                      }`}>
                    <div className={`w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 shadow-xl
                      ${profissionalId === p.id ? "bg-yellow-500 text-black scale-110" : "bg-zinc-800/80 text-zinc-600 group-hover:bg-zinc-700 group-hover:text-zinc-300"}`}>
                      {p.nome[0]}
                    </div>
                    <p className="font-bold text-sm tracking-wide">{p.nome}</p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* 3. DATA E HORA */}
          {profissionalId && (
            <section className="animate-in slide-in-from-bottom-4 duration-700 fade-in space-y-6">
               <h2 className="text-zinc-400 text-xs font-bold uppercase tracking-[0.2em] pl-1 flex items-center gap-2">
                 <span className="w-4 h-[1px] bg-yellow-500/50"></span> 3. Melhor horário
               </h2>
               
               {/* CALENDÁRIO */}
               <div className="flex overflow-x-auto pb-6 gap-3 snap-x scrollbar-hide -mx-6 px-6 mask-image-linear-gradient-to-r">
                  {diasDisponiveis.map((dia, index) => {
                    const isSelected = dataSelecionada === dia.valorBanco;
                    return (
                      <button key={dia.valorBanco} onClick={() => setDataSelecionada(dia.valorBanco)}
                        className={`snap-start min-w-[75px] h-[90px] rounded-2xl border backdrop-blur-sm flex flex-col items-center justify-center gap-1 transition-all duration-300 hover:-translate-y-1
                          ${isSelected 
                            ? "bg-yellow-500 border-yellow-500 text-black shadow-lg shadow-yellow-500/30" 
                            : "bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10 hover:border-white/10 hover:text-white"
                          }
                        `}>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? "text-black/70" : "text-zinc-500"}`}>
                          {index === 0 ? "Hoje" : dia.diaSemana}
                        </span>
                        <span className="text-3xl font-black tracking-tighter">
                          {dia.diaNumero}
                        </span>
                      </button>
                    )
                  })}
               </div>

               {/* GRADE DE HORÁRIOS */}
               {dataSelecionada && (
                 <div className="animate-in fade-in duration-500">
                    {buscandoHorarios ? (
                      <div className="flex justify-center py-12"><div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div></div>
                    ) : (
                      <div className="grid grid-cols-4 gap-3">
                        {gerarHorarios().map(h => {
                          const isOcupado = horariosOcupados.includes(h);
                          const isSelecionado = horarioSelecionado === h;
                          return (
                            <button key={h} onClick={() => !isOcupado && setHorarioSelecionado(h)} disabled={isOcupado}
                              className={`relative py-3 rounded-xl border backdrop-blur-md text-sm font-bold transition-all duration-300
                                ${isOcupado ? "bg-transparent border-transparent text-zinc-800 opacity-30 cursor-not-allowed" 
                                  : isSelecionado ? "bg-yellow-500 text-black border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.5)] scale-105 z-10" 
                                  : "bg-white/5 border-white/5 text-zinc-300 hover:border-yellow-500/30 hover:bg-yellow-500/10 hover:text-yellow-500 hover:shadow-md"
                                }`}>
                              {h}
                            </button>
                          );
                        })}
                      </div>
                    )}
                 </div>
               )}
            </section>
          )}
        </div>
      ) : (
        // --- TELA DE CONFIRMAÇÃO ---
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8 pt-4">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-white tracking-tighter">Quase lá! 🏁</h2>
            <p className="text-zinc-400 font-medium">Confira os detalhes do seu estilo</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <div className="space-y-3 relative z-10">
              {servicosSelec.map(s => (
                <div key={s.id} className="flex justify-between text-sm items-center group">
                  <span className="text-zinc-300 font-medium group-hover:text-white transition-colors">{s.nome}</span>
                  <span className="font-bold text-zinc-200 bg-black/30 border border-white/5 px-3 py-1 rounded-md">R$ {s.preco.toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-white/10 pt-6 flex justify-between items-center text-sm relative z-10">
              <div className="flex flex-col gap-1">
                <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-yellow-500"></div> Data</span>
                <span className="text-white font-bold text-lg">{dataSelecionada.split('-').reverse().join('/')}</span>
              </div>
              <div className="flex flex-col text-right gap-1">
                <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest flex justify-end items-center gap-1">Horário <div className="w-1 h-1 rounded-full bg-yellow-500"></div></span>
                <span className="text-white font-bold text-lg">{horarioSelecionado}</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-zinc-900 to-black p-5 rounded-2xl flex justify-between items-center border border-yellow-500/20 shadow-lg relative z-10">
              <span className="text-zinc-400 font-bold text-xs uppercase tracking-widest">TOTAL A PAGAR</span>
              <span className="text-yellow-500 font-black text-2xl tracking-tighter">R$ {valorTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-5 animate-in fade-in duration-700 delay-300">
            <div className="group">
              <label className="text-[10px] font-bold text-zinc-500 uppercase ml-4 mb-2 block tracking-widest group-focus-within:text-yellow-500 transition-colors">Seu Nome</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: João Silva" 
                className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl focus:border-yellow-500/50 focus:bg-zinc-900/80 focus:shadow-[0_0_20px_rgba(234,179,8,0.1)] outline-none text-white placeholder:text-zinc-600 transition-all duration-300" />
            </div>
            <div className="group">
              <label className="text-[10px] font-bold text-zinc-500 uppercase ml-4 mb-2 block tracking-widest group-focus-within:text-yellow-500 transition-colors">WhatsApp</label>
              <input 
                type="tel" 
                value={whatsapp} 
                onChange={(e) => setWhatsapp(formatarTelefone(e.target.value))} 
                placeholder="(00) 00000-0000" 
                maxLength={15}
                className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl focus:border-yellow-500/50 focus:bg-zinc-900/80 focus:shadow-[0_0_20px_rgba(234,179,8,0.1)] outline-none text-white placeholder:text-zinc-600 transition-all duration-300" 
              />
            </div>
          </div>
        </div>
      )}

      {/* BOTÃO FLUTUANTE PREMIUM */}
      {horarioSelecionado && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/95 to-transparent z-50 animate-in slide-in-from-bottom-full duration-700">
          <button 
            onClick={() => etapa === 1 ? setEtapa(2) : finalizarAgendamento()}
            disabled={carregando || (etapa === 2 && (!nome || !whatsapp))}
            className="group relative w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-5 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.3)] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:scale-100 disabled:shadow-none overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 blur-md"></div>
            <span className="relative flex items-center justify-center gap-3 text-lg tracking-wide">
            {carregando ? "PROCESSANDO..." : etapa === 1 ? (<>CONTINUAR <span className="bg-black/20 px-3 py-1 rounded-lg text-sm font-bold">R$ {valorTotal.toFixed(2)}</span></>) : ("CONFIRMAR AGENDAMENTO 🚀")}
            </span>
          </button>
        </div>
      )}
    </main>
  );
}