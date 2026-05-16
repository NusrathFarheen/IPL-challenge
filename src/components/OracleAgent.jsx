import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertCircle } from 'lucide-react';

const OracleAgent = ({ event, universe }) => {
  // Mock predictions based on event
  const predictions = [
    { label: "Next Ball: Boundary", prob: 25, trend: "up" },
    { label: "Wicket Probability", prob: 12, trend: "down" },
    { label: "Projected Score", prob: 185, trend: "stable" }
  ];

  return (
    <div className="glass p-5 rounded-xl border-cyber-primary/30 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
        <Brain size={40} className="text-cyber-primary" />
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-cyber-primary/20 flex items-center justify-center">
          <Brain size={16} className="text-cyber-primary" />
        </div>
        <h3 className="font-orbitron text-xs tracking-widest text-cyber-primary uppercase">Agentic Oracle v1</h3>
      </div>

      <div className="space-y-4">
        <p className="text-[10px] text-white/40 uppercase font-bold mb-2">Real-time Game Analysis</p>
        
        {predictions.map((p, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-white/80">{p.label}</span>
              <span className="text-cyber-primary">{p.prob}{p.label.includes('Score') ? '' : '%'}</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(p.prob / (p.label.includes('Score') ? 250 : 100)) * 100}%` }}
                className="h-full bg-cyber-primary"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-white/5 rounded border border-white/10 flex items-start gap-2">
        <AlertCircle size={14} className="text-cyber-accent mt-0.5" />
        <p className="text-[10px] leading-relaxed text-white/60">
          <span className="text-cyber-accent font-bold">AI INSIGHT:</span> Current pitch friction suggests a spin-friendly over. Suggesting aggressive field placement.
        </p>
      </div>
    </div>
  );
};

export default OracleAgent;
