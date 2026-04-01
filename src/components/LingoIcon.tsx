import { motion } from 'motion/react';
import { Bot } from 'lucide-react';

export function LingoIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <motion.div
        animate={{
          y: [0, -4, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10"
      >
        <Bot size={size} />
      </motion.div>
      
      {/* Animated glow background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-indigo-400 blur-xl rounded-full z-0"
      />
      
      {/* Antennas/Signals */}
      <motion.div
        animate={{
          scale: [1, 1.5],
          opacity: [0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
        className="absolute -top-1 w-2 h-2 bg-indigo-400 rounded-full"
      />
    </div>
  );
}
