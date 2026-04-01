import { Lesson } from '../types';
import { BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  onSelect: (lesson: Lesson) => void;
}

export function LessonCard({ lesson, isCompleted, onSelect }: LessonCardProps) {
  const categoryColors = {
    vocabulary: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800',
    grammar: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-800',
    conversation: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-800',
  };

  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(lesson)}
      className={cn(
        "w-full text-left p-4 bg-white dark:bg-gray-900 rounded-2xl border transition-all group relative overflow-hidden",
        isCompleted 
          ? "border-green-100 dark:border-green-900/30 bg-green-50/30 dark:bg-green-900/5 shadow-sm shadow-green-100/50 dark:shadow-none" 
          : "border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-500 hover:shadow-md"
      )}
    >
      {isCompleted && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ 
            repeat: Infinity, 
            duration: 3, 
            ease: "linear",
            repeatDelay: 2
          }}
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent skew-x-[-20deg] pointer-events-none"
        />
      )}
      <div className="flex items-start justify-between mb-3">
        <div className={cn(
          "px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border",
          categoryColors[lesson.category]
        )}>
          {lesson.category}
        </div>
        {isCompleted && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <CheckCircle2 size={18} className="text-green-500 dark:text-green-400" />
          </motion.div>
        )}
      </div>
      
      <h4 className={cn(
        "font-bold mb-1 transition-colors",
        isCompleted ? "text-green-700 dark:text-green-400" : "text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
      )}>
        {lesson.title}
      </h4>
      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
        {lesson.description}
      </p>

      <div className="flex items-center justify-between text-[11px] font-medium">
        <span className="text-gray-400 dark:text-gray-500">Level: {lesson.level}</span>
        <div className={cn(
          "flex items-center gap-1 transition-opacity",
          isCompleted ? "text-green-600 dark:text-green-400" : "text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100"
        )}>
          {isCompleted ? 'Review Lesson' : 'Start Lesson'} <ChevronRight size={14} />
        </div>
      </div>

      {isCompleted && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-0 right-0 w-16 h-16 bg-green-500/5 dark:bg-green-400/5 rounded-bl-full -mr-4 -mt-4"
        />
      )}
    </motion.button>
  );
}
