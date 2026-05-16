import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Share2, Target, Zap, Activity, Info } from 'lucide-react';
import html2canvas from 'html2canvas';

const IntelligenceDashboard = ({ event, module, intelligence, loading, onRefresh }) => {
  const cardRef = useRef(null);

  const speak = () => {
    if (!intelligence) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(intelligence);
    utterance.pitch = 1.0;
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const share = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, { backgroundColor: '#050505', scale: 2 });
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `faniq-report-${module?.id}.png`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div 
        ref={cardRef}
        className="glass p-8 rounded-2xl min-h-[350px] flex flex-col justify-between border-t-4 transition-all duration-500 relative overflow-hidden"
        style={{ borderTopColor: module?.color || '#00f2ff', boxShadow: `0 10px 40px -10px ${module?.color || '#00f2ff'}40` }}
      >
        {/* Technical Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-lg flex items-center justify-center text-3xl border shadow-lg"
                style={{ backgroundColor: module?.color + '10', borderColor: module?.color + '40' }}
              >
                {module?.icon || '🔬'}
              </div>
              <div>
                <h2 className="font-orbitron text-2xl font-black tracking-tighter" style={{ color: module?.color }}>
                  {module?.name || 'SELECT MODULE'}
                </h2>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">{module?.description || 'Awaiting Data Input...'}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] font-bold px-2 py-1 bg-cyber-primary/20 text-cyber-primary rounded border border-cyber-primary/30 uppercase tracking-tighter">
                SECURE FEED: ACTIVE
              </span>
              <span className="text-[8px] text-white/20 font-mono">HASH: {Math.random().toString(16).slice(2, 10).toUpperCase()}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white/60">
              <Activity size={14} className="text-cyber-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest">LIVE DATA INPUT:</span>
              <span className="text-xs italic truncate">"{event?.text || 'Awaiting live event...'}"</span>
            </div>

            <div className="min-h-[120px] bg-white/[0.02] rounded-xl border border-white/5 p-6 flex items-center">
              {loading ? (
                <div className="flex flex-col items-center justify-center w-full gap-4">
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ height: [10, 30, 10] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="w-1 bg-cyber-primary rounded-full"
                      />
                    ))}
                  </div>
                  <p className="font-orbitron text-[10px] tracking-widest animate-pulse">PROCESSING NEURAL INSIGHTS...</p>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-lg font-medium leading-relaxed ${intelligence?.includes('Offline') ? 'text-red-400 font-mono text-sm bg-red-500/10 p-4 rounded-lg border border-red-500/30' : ''}`}
                  dangerouslySetInnerHTML={{ __html: intelligence?.replace(/\*\*(.*?)\*\*/g, '<span class="text-cyber-primary font-bold">$1</span>') }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5 relative z-10">
          <div className="flex gap-3">
            <button 
              onClick={speak}
              disabled={!intelligence || loading}
              className="flex items-center gap-2 px-4 py-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 transition-all disabled:opacity-20"
            >
              <Volume2 size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Audio Brief</span>
            </button>
            <button 
              onClick={onRefresh}
              disabled={!event || !module || loading}
              className="p-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 transition-all disabled:opacity-20"
            >
              <Zap size={16} />
            </button>
          </div>
          
          <button 
            onClick={share}
            disabled={!intelligence || loading}
            className="flex items-center gap-3 px-6 py-3 rounded bg-cyber-primary text-black font-black uppercase text-[10px] tracking-widest hover:brightness-110 transition-all disabled:opacity-20 shadow-[0_0_20px_rgba(0,242,255,0.3)]"
          >
            <Share2 size={14} />
            Export Intel Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntelligenceDashboard;
