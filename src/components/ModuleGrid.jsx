import React from 'react';
import { motion } from 'framer-motion';
import { modules } from '../data/modules';

const ModuleGrid = ({ onModuleSelect, activeModuleId }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <h2 className="text-xl font-orbitron text-white/80 flex items-center gap-2">
          INTELLIGENCE MODULES
        </h2>
        <span className="text-[10px] text-cyber-primary font-bold animate-pulse">SYSTEMS ACTIVE</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {modules.map((module) => (
          <motion.button
            key={module.id}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onModuleSelect(module)}
            className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden h-32 ${
              activeModuleId === module.id
                ? 'z-10 scale-105'
                : 'bg-white/5 border-white/10 hover:border-white/30'
            }`}
            style={{ 
              backgroundColor: activeModuleId === module.id ? module.color + '20' : 'rgba(255,255,255,0.02)',
              borderColor: activeModuleId === module.id ? module.color : 'rgba(255,255,255,0.1)',
              boxShadow: activeModuleId === module.id ? `0 0 20px ${module.color}40, inset 0 0 15px ${module.color}20` : 'none'
            }}
          >
            <span className="text-3xl">{module.icon}</span>
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-tighter block leading-none">{module.name}</span>
              <span className="text-[8px] text-white/40 uppercase mt-1 block leading-none">{module.id}</span>
            </div>
            
            {activeModuleId === module.id && (
              <motion.div 
                layoutId="activeGlow"
                className="absolute inset-0 -z-10 blur-xl opacity-30"
                style={{ backgroundColor: module.color }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ModuleGrid;
