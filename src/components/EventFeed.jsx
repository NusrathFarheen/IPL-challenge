import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { liveEvents } from '../data/events';

const EventFeed = ({ onEventSelect, activeEventId }) => {
  return (
    <div className="glass p-4 rounded-xl h-[400px] flex flex-col overflow-hidden border-cyber-primary/20">
      <h2 className="text-xl font-orbitron mb-4 text-cyber-primary flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        LIVE MATCH FEED
      </h2>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {liveEvents.map((event) => (
          <motion.div
            key={event.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onEventSelect(event)}
            className={`p-3 rounded-lg cursor-pointer border-l-4 border-y border-r transition-all duration-300 ${
              activeEventId === event.id 
                ? 'bg-cyber-primary/10 border-l-cyber-primary border-y-cyber-primary/20 border-r-cyber-primary/20 shadow-[0_0_15px_rgba(0,242,255,0.15)]' 
                : 'bg-white/5 border-white/10 hover:border-l-cyber-primary/50 hover:bg-white/10'
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full font-bold ${
                event.type === 'wicket' ? 'bg-red-500/20 text-red-400' : 
                event.type === 'boundary' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
              }`}>
                {event.type}
              </span>
              <span className="text-[10px] text-white/40">JUST NOW</span>
            </div>
            <p className="text-sm font-medium">{event.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventFeed;
