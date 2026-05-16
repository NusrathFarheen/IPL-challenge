import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { liveEvents } from './data/events';
import { modules } from './data/modules';
import { generateIntelligence } from './lib/gemini';
import EventFeed from './components/EventFeed';
import ModuleGrid from './components/ModuleGrid';
import IntelligenceDashboard from './components/IntelligenceDashboard';
import EnergyMeter from './components/EnergyMeter';
import OracleAgent from './components/OracleAgent';
import ChatAgent from './components/ChatAgent';
import { Target, Shield, Globe, Cpu, Users, BarChart3, Zap } from 'lucide-react';

function App() {
  const [selectedEvent, setSelectedEvent] = useState(liveEvents[0]);
  const [selectedModule, setSelectedModule] = useState(modules[0]);
  const [intelligence, setIntelligence] = useState("");
  const [loading, setLoading] = useState(false);
  const [userPersona, setUserPersona] = useState("Expert Analyst");
  const [isSyncing, setIsSyncing] = useState(false);

  const personas = ["Expert Analyst", "Casual Fan", "Technical Coach", "Stats Junkie"];



  useEffect(() => {
    if (selectedEvent && selectedModule) {
      handleSync();
    }
  }, [selectedEvent, selectedModule, userPersona]);

  const handleSync = async () => {
    setLoading(true);
    setIsSyncing(true);
    const result = await generateIntelligence(selectedEvent, selectedModule, userPersona);
    setIntelligence(result);
    setLoading(false);
    setTimeout(() => setIsSyncing(false), 800);
  };

  return (
    <div className="min-h-screen bg-cyber-bg text-white selection:bg-cyber-primary selection:text-black font-rajdhani">
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none z-0" 
           style={{ backgroundImage: 'radial-gradient(#00f2ff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        {/* Header - Broadcast Style */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 pb-6 border-b border-white/5 gap-6">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Target className="text-cyber-primary" size={24} />
                <h1 className="text-3xl font-black font-orbitron tracking-tighter">
                  FAN<span className="text-cyber-primary">IQ</span> AGENT
                </h1>
              </div>
              <p className="text-[9px] tracking-[0.4em] text-white/40 uppercase font-black ml-1">Live Intelligence Command Center</p>
            </div>
            
            <div className="hidden md:flex gap-4 border-l border-white/10 pl-6">
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-white/30 uppercase">System Status</span>
                <span className="text-[10px] font-bold text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> NOMINAL
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-white/30 uppercase">Network</span>
                <span className="text-[10px] font-bold text-cyber-primary">GOOGLE CLOUD AI</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <Users size={14} className="text-white/40" />
              <select 
                value={userPersona}
                onChange={(e) => setUserPersona(e.target.value)}
                className="bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none cursor-pointer"
              >
                {personas.map(p => <option key={p} value={p} className="bg-cyber-bg">{p}</option>)}
              </select>
            </div>
            <button 
              onClick={handleSync}
              disabled={loading || isSyncing}
              className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border bg-cyber-primary/10 border-cyber-primary text-cyber-primary hover:bg-cyber-primary/20 hover:shadow-[0_0_15px_rgba(0,242,255,0.4)] ${
                (loading || isSyncing) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'SYNCING...' : 'MANUAL SYNC'}
            </button>
          </div>
        </header>

        {/* Main Interface Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Top Row: Module Selection */}
          <div className="lg:col-span-12">
            <ModuleGrid 
              activeModuleId={selectedModule?.id}
              onModuleSelect={setSelectedModule}
            />
          </div>

          {/* Left Column: Feed & Energy */}
          <div className="lg:col-span-4 space-y-6">
            <EventFeed 
              onEventSelect={(e) => { setSelectedEvent(e); }} 
              activeEventId={selectedEvent?.id}
            />
            <OracleAgent event={selectedEvent} />
            <EnergyMeter event={selectedEvent} />
          </div>

          {/* Right Column: Deep Intelligence */}
          <div className="lg:col-span-8 space-y-6">
            <IntelligenceDashboard 
              event={selectedEvent}
              module={selectedModule}
              intelligence={intelligence}
              loading={loading}
              onRefresh={handleSync}
            />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Win Prob", value: "64.2%", icon: BarChart3, color: "text-blue-400" },
                { label: "Momentum", value: "+12.5", icon: Zap, color: "text-yellow-400" },
                { label: "Stability", value: "Secure", icon: Shield, color: "text-green-400" },
                { label: "Global Sync", value: "Active", icon: Globe, color: "text-purple-400" }
              ].map((stat, i) => (
                <div key={i} className="glass p-4 rounded-xl border-white/5 flex flex-col gap-1">
                  <stat.icon size={14} className={stat.color} />
                  <span className="text-[10px] font-bold text-white/30 uppercase">{stat.label}</span>
                  <span className="text-lg font-black">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center">
          <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/20">
            © 2026 FAN-IQ // AGENTIC SPORTS INTELLIGENCE // GOOGLE HACKATHON
          </p>
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-cyber-primary animate-ping" />
            <div className="w-2 h-2 rounded-full bg-cyber-primary" />
          </div>
        </footer>
      </div>

      {/* Floating AI Agent */}
      <ChatAgent currentEvent={selectedEvent} activeModule={selectedModule} />

      {/* Sync Flash Overlay */}
      <AnimatePresence>
        {isSyncing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] pointer-events-none border-[20px] border-cyber-primary/10"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
