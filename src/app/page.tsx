import Link from "next/link";

export default function Home() {
  // --- CARROSSEL EXPANDIDO (8 FOTOS) ---
  const cortes = [
    { id: 1, img: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2070&auto=format&fit=crop", title: "Degradê Navalhado" },
    { id: 2, img: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop", title: "Barba Modelada" },
    { id: 3, img: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1976&auto=format&fit=crop", title: "Corte Clássico" },
    { id: 4, img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop", title: "Estilo Moderno" },
    { id: 5, img: "https://images.unsplash.com/photo-1503951914875-befbb32989d7?q=80&w=2068&auto=format&fit=crop", title: "Acabamento Premium" },
    { id: 6, img: "https://images.unsplash.com/photo-1634480603038-161b40285642?q=80&w=1974&auto=format&fit=crop", title: "Pigmentação" },
    { id: 7, img: "https://images.unsplash.com/photo-1532710093739-9470acff878f?q=80&w=2070&auto=format&fit=crop", title: "Bigode & Estilo" },
    { id: 8, img: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=1972&auto=format&fit=crop", title: "Experiência Completa" },
  ];

  const feedbacks = [
    { id: 1, nome: "Ricardo Silva", texto: "Melhor corte que já fiz em Maringá. O atendimento é VIP do início ao fim.", estrelas: 5 },
    { id: 2, nome: "André Costa", texto: "Profissionais incríveis. O ambiente é sensacional, vale cada centavo.", estrelas: 5 },
    { id: 3, nome: "Felipe Santos", texto: "Pontualidade e precisão. Virei cliente fiel!", estrelas: 5 },
  ];

  return (
    <main className="min-h-screen text-white font-sans selection:bg-yellow-500/30 selection:text-yellow-500 relative overflow-x-hidden">
      
      {/* --- BACKGROUND GERAL --- */}
      <div className="fixed inset-0 z-0">
        <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 blur-[2px] opacity-40"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503951914875-befbb32989d7?q=80&w=2068&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/90 to-zinc-900/80"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')"}}></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* ================= HERO SECTION ================= */}
        <div className="flex flex-col items-center justify-center pt-24 pb-16 px-6 text-center space-y-8 animate-in fade-in duration-1000">
          
          <div className="relative group">
            <div className="absolute -inset-10 bg-yellow-500/20 blur-3xl rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
            <img 
              src="https://i.imgur.com/EhlDl0d.png" 
              alt="Dom Frediane" 
              className="h-32 md:h-52 w-auto object-contain relative drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 drop-shadow-sm leading-tight">
              ELEGÂNCIA É <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600">UMA ESCOLHA.</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-2xl font-medium max-w-xl mx-auto leading-relaxed">
              Mais do que um corte, uma experiência de alto padrão para quem valoriza estilo e exclusividade.
            </p>
          </div>

          <div className="pt-4 w-full max-w-sm">
            <Link 
              href="/agendar"
              className="group relative w-full flex items-center justify-center overflow-hidden rounded-2xl py-5 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(234,179,8,0.3)] hover:shadow-[0_0_60px_rgba(234,179,8,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600"></div>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 blur-md"></div>
              
              <span className="relative flex items-center gap-3 text-black font-black text-xl tracking-wide uppercase">
                Agendar Horário
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
            <p className="mt-4 text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] animate-pulse">
              • Vagas limitadas para hoje •
            </p>
          </div>
        </div>

        {/* ================= GALERIA DE CORTES (FULL WIDTH) ================= */}
        <section className="py-16 w-full animate-in slide-in-from-bottom-10 duration-1000 delay-150 border-t border-white/5 bg-black/20 backdrop-blur-sm">
          <div className="px-6 mb-8 flex items-end justify-between max-w-7xl mx-auto">
             <div>
                <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                   <span className="w-8 h-[1px] bg-yellow-500"></span> Nosso Portfólio
                </h2>
                <h3 className="text-3xl md:text-4xl font-black text-white">TRANSFORMAÇÕES</h3>
             </div>
             <div className="text-yellow-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2 animate-pulse">
                Deslize para ver <span className="text-xl">→</span>
             </div>
          </div>

          {/* Container "Full Bleed" - Ocupa toda a largura */}
          <div className="flex overflow-x-auto gap-4 px-6 pb-8 snap-x scrollbar-hide w-full">
            {cortes.map((corte) => (
              <div key={corte.id} 
                   className="snap-center shrink-0 w-[300px] md:w-[450px] h-[400px] md:h-[550px] relative rounded-3xl overflow-hidden group border border-white/10 shadow-2xl transition-all duration-500 hover:shadow-yellow-500/20">
                 
                 {/* Imagem */}
                 <img src={corte.img} alt={corte.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" />
                 
                 {/* Overlay Gradiente */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity"></div>
                 
                 {/* Texto */}
                 <div className="absolute bottom-0 left-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="w-12 h-1 bg-yellow-500 mb-4 rounded-full"></div>
                    <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-1">Dom Frediane</p>
                    <p className="text-3xl font-black text-white leading-none">{corte.title}</p>
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FEEDBACKS (PROVA SOCIAL) ================= */}
        <section className="py-16 px-6 max-w-6xl mx-auto w-full animate-in slide-in-from-bottom-10 duration-1000 delay-300">
           <div className="text-center mb-12">
              <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mb-3">Quem conhece, confia</h2>
              <h3 className="text-3xl md:text-4xl font-black text-white">O QUE DIZEM NOSSOS CLIENTES</h3>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              {feedbacks.map((fb) => (
                <div key={fb.id} className="bg-zinc-900/40 backdrop-blur-md border border-white/5 p-8 rounded-3xl relative hover:-translate-y-2 transition-transform duration-300 shadow-xl group">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full blur-2xl group-hover:bg-yellow-500/10 transition-colors"></div>
                   <div className="text-yellow-500 text-lg mb-4 flex gap-1">
                      {"★".repeat(fb.estrelas)}
                   </div>
                   <p className="text-zinc-300 text-base leading-relaxed mb-6 italic font-medium">"{fb.texto}"</p>
                   <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center font-bold text-sm border border-white/10 text-white">
                        {fb.nome[0]}
                      </div>
                      <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">{fb.nome}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* ================= INSTAGRAM CTA ================= */}
        <section className="py-10 px-6 animate-in slide-in-from-bottom-10 duration-1000 delay-500">
           <div className="max-w-5xl mx-auto bg-gradient-to-r from-zinc-900 to-zinc-950 border border-white/5 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500/10 rounded-full blur-[100px] animate-pulse"></div>
              
              <div className="relative z-10 space-y-8">
                 <div className="inline-block p-5 rounded-2xl bg-white/5 border border-white/10 mb-2 rotate-3 group-hover:rotate-6 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">SIGA O MESTRE</h2>
                 <p className="text-zinc-400 text-lg max-w-lg mx-auto">
                    Bastidores, tutoriais de estilo e promoções relâmpago exclusivas para seguidores.
                 </p>
                 <a 
                   href="https://instagram.com" 
                   target="_blank" 
                   className="inline-flex items-center gap-3 bg-white text-black font-black py-4 px-10 rounded-full hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:-translate-y-1"
                 >
                    @domfrediane 
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </section>

        {/* ================= RODAPÉ ================= */}
        <footer className="p-6 md:p-10 animate-in fade-in duration-1000 delay-700">
          <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
            
            <div className="flex items-center gap-6 text-left">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-yellow-500 shadow-lg shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Localização</p>
                <p className="text-zinc-200 font-bold text-lg">Av. Brasil, 1234 - Zona 01</p>
                <p className="text-zinc-400 text-sm">Maringá - PR</p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/5 md:hidden"></div>

            <div className="flex items-center gap-6 text-left">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-yellow-500 shadow-lg shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Horários</p>
                <p className="text-zinc-200 font-bold text-lg">Seg a Sáb: 08:30 às 19:00</p>
                <p className="text-green-500 text-xs font-bold flex items-center gap-2 uppercase tracking-wider mt-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Aberto Agora
                </p>
              </div>
            </div>

          </div>
          
          <div className="mt-10 text-center">
             <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] cursor-default hover:text-zinc-400 transition-colors">
               © 2024 Dom Frediane • Excelência em Estilo
             </p>
          </div>
        </footer>

      </div>
    </main>
  );
}