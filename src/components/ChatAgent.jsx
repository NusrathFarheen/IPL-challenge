import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';
import { askQuestion } from '../lib/gemini';

const ChatAgent = ({ currentEvent, activeModule }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Ready for tactical interrogation. Ask me anything about the current play." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userQuery = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userQuery }]);
    setIsTyping(true);

    const response = await askQuestion(userQuery, currentEvent, activeModule);
    
    setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-cyber-primary rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(0,242,255,0.5)] z-50"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-[350px] h-[500px] glass rounded-2xl flex flex-col border border-white/20 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-cyber-primary/10 border-b border-white/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyber-primary flex items-center justify-center text-black">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="font-orbitron text-xs font-bold tracking-widest text-cyber-primary uppercase">Tactical AI Analyst</h3>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Linked to Live Feed</span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl text-xs leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-cyber-primary/20 border border-cyber-primary/30 text-white rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-white/80 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl rounded-tl-none flex gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="w-1 h-1 bg-cyber-primary rounded-full"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/10 flex gap-2">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the play..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-cyber-primary/50 transition-colors"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 bg-cyber-primary rounded-lg flex items-center justify-center text-black disabled:opacity-30 transition-opacity"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAgent;
