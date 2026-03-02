"use client";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de login
    setTimeout(() => {
      setLoading(false);
      alert("Login realizado (Simulação)");
    }, 2000);
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center relative overflow-hidden font-sans selection:bg-yellow-500/30 selection:text-yellow-500">
      
      {/* --- BACKGROUND --- */}
      <div className="fixed inset-0 z-0">
         {/* Imagem de fundo luxuosa e escura */}
         <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 blur-sm opacity-30"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1635273051937-92d473489e2e?q=80&w=2070&auto=format&fit=crop')" }} // Textura de couro/escuro
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/90 to-zinc-900/90"></div>
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')"}}></div>
      </div>

      {/* --- CONTEÚDO --- */}
      <div className="relative z-10 w-full max-w-md p-6 animate-in fade-in zoom-in duration-700">
        
        {/* Efeito de Luz de Fundo (Spotlight) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[100px] -z-10"></div>

        {/* LOGO */}
        <div className="flex justify-center mb-8 relative group">
           <div className="absolute -inset-10 bg-yellow-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-700"></div>
           <img 
              src="https://i.imgur.com/EhlDl0d.png" 
              alt="Dom Frediane" 
              className="h-24 w-auto object-contain drop-shadow-2xl relative"
            />
        </div>

        {/* CARTÃO DE LOGIN (GLASSMORPHISM) */}
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden">
           
           {/* Detalhe Dourado no Topo */}
           <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>

           <div className="text-center mb-8 space-y-2">
             <h1 className="text-2xl font-black text-white tracking-tight">ÁREA RESTRITA</h1>
             <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">Acesso Administrativo</p>
           </div>

           <form onSubmit={handleLogin} className="space-y-6">
              
              {/* Input Email */}
              <div className="space-y-2 group">
                 <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 group-focus-within:text-yellow-500 transition-colors">E-mail</label>
                 <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-yellow-500 transition-colors">
                       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@domfrediane.com"
                      className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:border-yellow-500/50 focus:bg-black/40 focus:shadow-[0_0_20px_rgba(234,179,8,0.1)] outline-none transition-all duration-300"
                    />
                 </div>
              </div>

              {/* Input Password */}
              <div className="space-y-2 group">
                 <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 group-focus-within:text-yellow-500 transition-colors">Senha</label>
                 <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-yellow-500 transition-colors">
                       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </div>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:border-yellow-500/50 focus:bg-black/40 focus:shadow-[0_0_20px_rgba(234,179,8,0.1)] outline-none transition-all duration-300"
                    />
                 </div>
              </div>

              {/* Botão de Login */}
              <button 
                type="submit" 
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-xl py-4 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 transition-transform duration-500 group-hover:scale-105"></div>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 blur-md"></div>
                
                <span className="relative flex items-center justify-center gap-2 text-black font-black uppercase tracking-wider text-sm">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      Acessando...
                    </>
                  ) : (
                    <>
                      Entrar no Sistema
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </>
                  )}
                </span>
              </button>

           </form>

           <div className="mt-8 text-center">
              <Link href="/" className="text-xs text-zinc-600 hover:text-yellow-500 transition-colors duration-300 border-b border-transparent hover:border-yellow-500 pb-0.5">
                 Voltar para o Site
              </Link>
           </div>

        </div>

        <p className="text-center text-[10px] text-zinc-600 uppercase tracking-[0.2em] mt-8 cursor-default opacity-50 hover:opacity-100 transition-opacity">
           © 2024 Dom Frediane Admin
        </p>

      </div>
    </main>
  );
}