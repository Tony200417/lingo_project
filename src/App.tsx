import { useState, useEffect } from 'react';
import { Language, Lesson, UserProgress } from './types';
import { LESSONS } from './constants';
import { ChatTutor } from './components/ChatTutor';
import { LessonCard } from './components/LessonCard';
import { LessonDetail } from './components/LessonDetail';
import { Login } from './components/Login';
import { db } from './firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { 
  Globe2, 
  BookOpen, 
  MessageSquare, 
  Trophy, 
  Settings,
  LayoutDashboard,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  LogOut,
  User as UserIcon,
  Menu,
  X,
  Moon,
  Sun,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { LingoIcon } from './components/LingoIcon';

export default function App() {
  const [user, setUser] = useState<string | null>(localStorage.getItem('lingofast_user'));
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'lessons' | 'chat' | 'progress'>('lessons');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lingofast_theme') === 'dark' || 
             (!localStorage.getItem('lingofast_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [progress, setProgress] = useState<UserProgress>({
    completedLessons: [],
    currentLanguage: 'en',
    levels: {
      en: 'A1',
      pt: 'A1',
    },
  });
  const [expandedLevel, setExpandedLevel] = useState<string | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('lingofast_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('lingofast_theme', 'light');
    }
  }, [darkMode]);

  const levels: ('A1' | 'A2' | 'B1' | 'B2')[] = ['A1', 'A2', 'B1', 'B2'];

  // Load progress from Firestore
  useEffect(() => {
    if (user) {
      const progressRef = doc(db, 'progress', user);
      const unsubscribe = onSnapshot(progressRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProgress(prev => ({
            ...prev,
            completedLessons: data.completedLessons || [],
            levels: data.levels || { en: 'A1', pt: 'A1' }
          }));
        }
      }, (error) => {
        console.error("Firestore Error:", error);
      });

      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('lingofast_user', user);
    } else {
      localStorage.removeItem('lingofast_user');
    }
  }, [user]);

  const handleLogin = (username: string) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('lessons');
  };

  const currentLevel = progress.levels[language];
  const currentLessons = LESSONS[language].filter(l => l.level === currentLevel);
  const allLessonsOfLevel = LESSONS[language].filter(l => l.level === currentLevel);
  const isLevelCompleted = allLessonsOfLevel.length > 0 && allLessonsOfLevel.every(l => progress.completedLessons.includes(l.id));

  const handleLevelUp = async () => {
    const currentIndex = levels.indexOf(currentLevel);
    if (currentIndex < levels.length - 1) {
      const nextLevel = levels[currentIndex + 1];
      const newLevels = { ...progress.levels, [language]: nextLevel };
      try {
        await setDoc(doc(db, 'progress', user!), {
          userId: user,
          completedLessons: progress.completedLessons,
          levels: newLevels,
          lastUpdated: new Date().toISOString()
        });
        // State will be updated by onSnapshot
      } catch (error) {
        console.error("Error advancing level:", error);
      }
    }
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const handleLessonComplete = async () => {
    if (user && selectedLesson && !progress.completedLessons.includes(selectedLesson.id)) {
      const newCompleted = [...progress.completedLessons, selectedLesson.id];
      
      try {
        await setDoc(doc(db, 'progress', user), {
          userId: user,
          completedLessons: newCompleted,
          levels: progress.levels,
          lastUpdated: new Date().toISOString()
        });
      } catch (error) {
        console.error("Error saving progress:", error);
      }
    }
    setSelectedLesson(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col md:flex-row transition-colors duration-200">
      {/* Mobile Header */}
      <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <LingoIcon size={32} />
          <h1 className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white">LingoFast</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col fixed h-full z-50 transition-all duration-300 md:translate-x-0 md:w-64",
        isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center gap-3">
          <LingoIcon size={40} />
          <h1 className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white">LingoFast</h1>
        </div>

        <div className="px-6 mb-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <UserIcon size={16} />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{user}</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">Estudiante</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <button
            onClick={() => {
              setActiveTab('lessons');
              setIsSidebarOpen(false);
            }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
              activeTab === 'lessons' 
                ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400" 
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
            )}
          >
            <LayoutDashboard size={20} />
            Lecciones
          </button>
          <button
            onClick={() => {
              setActiveTab('chat');
              setIsSidebarOpen(false);
            }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
              activeTab === 'chat' 
                ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400" 
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
            )}
          >
            <MessageSquare size={20} />
            Tutor IA
          </button>
          <button
            onClick={() => {
              setActiveTab('progress');
              setIsSidebarOpen(false);
            }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
              activeTab === 'progress' 
                ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400" 
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
            )}
          >
            <Trophy size={20} />
            Progreso
          </button>
        </nav>

        <div className="p-4 space-y-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="hidden md:flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </button>

          <div className="bg-indigo-600 rounded-2xl p-4 text-white relative overflow-hidden group">
            <Sparkles className="absolute -right-2 -top-2 opacity-20 group-hover:scale-125 transition-transform" size={60} />
            <p className="text-xs font-medium opacity-80 mb-1">Mejora a Pro</p>
            <p className="text-sm font-bold mb-3">Tutoría IA Ilimitada</p>
            <button className="w-full py-2 bg-white text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors">
              Comenzar
            </button>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white">
              {activeTab === 'lessons' && 'Ruta de Aprendizaje'}
              {activeTab === 'chat' && 'Tutor de Idiomas IA'}
              {activeTab === 'progress' && 'Tus Logros'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {language === 'en' ? 'Aprendiendo Inglés' : 'Aprendendo Português'} • Nivel {currentLevel}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-1 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <button
              onClick={() => setLanguage('en')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                language === 'en' ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none" : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              <Globe2 size={16} />
              Inglés
            </button>
            <button
              onClick={() => setLanguage('pt')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                language === 'pt' ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none" : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              <Globe2 size={16} />
              Português
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'lessons' && (
            <motion.div
              key="lessons"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {selectedLesson ? (
                <LessonDetail
                  lesson={selectedLesson}
                  language={language}
                  onBack={() => setSelectedLesson(null)}
                  onComplete={handleLessonComplete}
                />
              ) : (
                <div className="space-y-8">
                  {/* Instructions for beginners */}
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center">
                        <GraduationCap size={20} />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white">¿Cómo empezar?</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Selecciona una lección para comenzar a aprender. Cada lección incluye teoría y un pequeño cuestionario. 
                      Cuando completes todas las lecciones de tu nivel actual ({currentLevel}), podrás avanzar al siguiente nivel. 
                      ¡No olvides practicar con el Tutor IA para mejorar tu fluidez!
                    </p>
                  </div>

                  {isLevelCompleted && currentLevel !== 'B2' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gradient-to-r from-indigo-600 to-violet-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-200 flex flex-col md:flex-row items-center justify-between gap-6"
                    >
                      <div>
                        <h3 className="text-2xl font-bold mb-2">¡Nivel {currentLevel} Completado! 🏆</h3>
                        <p className="opacity-90">Has dominado todas las lecciones de este nivel en {language === 'en' ? 'Inglés' : 'Portugués'}. ¿Estás listo para el siguiente reto?</p>
                      </div>
                      <button 
                        onClick={handleLevelUp}
                        className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                      >
                        Pasar al Nivel {levels[levels.indexOf(currentLevel) + 1]}
                      </button>
                    </motion.div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentLessons.map((lesson) => (
                      <LessonCard
                        key={lesson.id}
                        lesson={lesson}
                        isCompleted={progress.completedLessons.includes(lesson.id)}
                        onSelect={handleLessonSelect}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800 flex items-start gap-3">
                <Sparkles className="text-indigo-600 dark:text-indigo-400 shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-sm font-medium text-indigo-900 dark:text-indigo-100">¡La práctica hace al maestro!</p>
                  <p className="text-xs text-indigo-700/80 dark:text-indigo-300/80">
                    Habla con nuestro tutor de IA sobre cualquier tema. Corregirá tu gramática y te ayudará a ampliar tu vocabulario en tiempo real.
                  </p>
                </div>
              </div>
              <ChatTutor language={language} />
            </motion.div>
          )}

          {activeTab === 'progress' && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-4">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{progress.completedLessons.length}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Lecciones Completadas</p>
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4">
                    <BookOpen size={24} />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{LESSONS.en.length + LESSONS.pt.length}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Lecciones Totales</p>
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-xl flex items-center justify-center mb-4">
                    <Trophy size={24} />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Math.round((progress.completedLessons.length / (LESSONS.en.length + LESSONS.pt.length)) * 100)}%
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Progreso General</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <h4 className="font-bold text-gray-900 dark:text-white mb-6">Progreso por Nivel</h4>
                <div className="space-y-4">
                  {levels.map((lvl) => {
                    const enLessons = LESSONS.en.filter(l => l.level === lvl);
                    const ptLessons = LESSONS.pt.filter(l => l.level === lvl);
                    const enCompleted = enLessons.filter(l => progress.completedLessons.includes(l.id));
                    const ptCompleted = ptLessons.filter(l => progress.completedLessons.includes(l.id));
                    const isExpanded = expandedLevel === lvl;

                    return (
                      <div key={lvl} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                        <button 
                          onClick={() => setExpandedLevel(isExpanded ? null : lvl)}
                          className="w-full p-6 flex items-center justify-between hover:bg-gray-100/50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center font-bold",
                              enCompleted.length + ptCompleted.length === enLessons.length + ptLessons.length
                                ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                : "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                            )}>
                              {lvl}
                            </div>
                            <div className="text-left">
                              <h5 className="font-bold text-gray-900 dark:text-white">Nivel {lvl}</h5>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {enCompleted.length + ptCompleted.length} de {enLessons.length + ptLessons.length} lecciones completadas
                              </p>
                            </div>
                          </div>
                          <ChevronRight className={cn("text-gray-400 transition-transform", isExpanded && "rotate-90")} size={20} />
                        </button>
                        
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-6 pb-6 border-t border-gray-100 dark:border-gray-800 pt-6"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Inglés</span>
                                    <span className="text-xs font-bold text-indigo-600">{Math.round((enCompleted.length / (enLessons.length || 1)) * 100)}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                    <div 
                                      className="bg-indigo-600 h-full transition-all duration-500"
                                      style={{ width: `${(enCompleted.length / (enLessons.length || 1)) * 100}%` }}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    {enLessons.map(lesson => (
                                      <div key={lesson.id} className="flex items-center gap-2 text-xs">
                                        {progress.completedLessons.includes(lesson.id) ? (
                                          <CheckCircle2 size={14} className="text-green-500" />
                                        ) : (
                                          <div className="w-3.5 h-3.5 rounded-full border border-gray-300 dark:border-gray-600" />
                                        )}
                                        <span className={cn(progress.completedLessons.includes(lesson.id) ? "text-gray-900 dark:text-gray-100" : "text-gray-400")}>
                                          {lesson.title}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Portugués</span>
                                    <span className="text-xs font-bold text-emerald-500">{Math.round((ptCompleted.length / (ptLessons.length || 1)) * 100)}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                    <div 
                                      className="bg-emerald-500 h-full transition-all duration-500"
                                      style={{ width: `${(ptCompleted.length / (ptLessons.length || 1)) * 100}%` }}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    {ptLessons.map(lesson => (
                                      <div key={lesson.id} className="flex items-center gap-2 text-xs">
                                        {progress.completedLessons.includes(lesson.id) ? (
                                          <CheckCircle2 size={14} className="text-green-500" />
                                        ) : (
                                          <div className="w-3.5 h-3.5 rounded-full border border-gray-300 dark:border-gray-600" />
                                        )}
                                        <span className={cn(progress.completedLessons.includes(lesson.id) ? "text-gray-900 dark:text-gray-100" : "text-gray-400")}>
                                          {lesson.title}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
