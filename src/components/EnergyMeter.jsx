import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EnergyMeter = ({ event }) => {
  const [level, setLevel] = useState(30);

  useEffect(() => {
    if (event) {
      // Simulate energy spike based on event type
      const base = event.type === 'wicket' ? 80 : event.type === 'boundary' ? 90 : 50;
      const spike = base + Math.floor(Math.random() * 10);
      setLevel(spike);
      
      const timer = setTimeout(() => {
        setLevel(base - 10);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [event]);

  return (
    <div className="glass p-6 rounded-xl border-cyber-accent/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-orbitron text-xs tracking-[0.2em] text-cyber-accent">STADIUM CROWD ENERGY</h3>
        <span className="font-orbitron text-cyber-accent text-sm">{level}%</span>
      </div>
      
      <div className="relative h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
        <motion.div 
          animate={{ width: `${level}%` }}
          transition={{ type: "spring", stiffness: 100 }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyber-secondary via-cyber-accent to-cyber-primary shadow-[0_0_15px_rgba(255,0,229,0.5)]"
        />
        
        {/* Grid lines */}
        <div className="absolute inset-0 flex justify-between px-1 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-[1px] h-full bg-white/10" />
          ))}
        </div>
      </div>
      
      <div className="mt-4 flex gap-1 h-2">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              height: level > (i * 5) ? Math.random() * 8 + 4 : 2,
              opacity: level > (i * 5) ? 1 : 0.2
            }}
            className="flex-1 bg-cyber-accent rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

export default EnergyMeter;
