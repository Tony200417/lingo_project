import React, { useState } from 'react';
import { Lesson, Language } from '../types';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, XCircle, Volume2, PlayCircle } from 'lucide-react';

interface LessonDetailProps {
  lesson: Lesson;
  language: Language;
  onBack: () => void;
  onComplete: () => void;
}

export const LessonDetail: React.FC<LessonDetailProps> = ({ lesson, language, onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState<'content' | 'quiz'>('content');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'en' ? 'en-US' : 'pt-BR';
    window.speechSynthesis.speak(utterance);
  };

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(index);
    const correct = index === lesson.quiz![currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);

    setTimeout(() => {
      if (currentQuestionIndex < lesson.quiz!.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setQuizFinished(true);
      }
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <button
        onClick={onBack}
        className="flex items-center text-slate-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-6 group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Volver a las lecciones
      </button>

      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-gray-800">
        <div className="bg-indigo-600 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-2 uppercase tracking-wider">
                {lesson.level} • {lesson.category}
              </span>
              <h1 className="text-3xl font-bold">{lesson.title}</h1>
            </div>
            <button 
              onClick={() => speak(lesson.title)}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              title="Escuchar título"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <AnimatePresence mode="wait">
            {currentStep === 'content' ? (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="prose prose-indigo dark:prose-invert max-w-none"
              >
                <div className="markdown-body dark:text-gray-200">
                  <Markdown>{lesson.content || 'No hay contenido disponible para esta lección.'}</Markdown>
                </div>
                
                <div className="mt-10 flex justify-center">
                  <button
                    onClick={() => lesson.quiz ? setCurrentStep('quiz') : onComplete()}
                    className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 flex items-center"
                  >
                    {lesson.quiz ? 'Comenzar Quiz' : 'Finalizar Lección'}
                    <PlayCircle className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ) : !quizFinished ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Prueba de conocimientos</h2>
                    <span className="text-sm font-medium text-slate-500 dark:text-gray-400">
                      Pregunta {currentQuestionIndex + 1} de {lesson.quiz?.length}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-full transition-all duration-500"
                      style={{ width: `${((currentQuestionIndex + 1) / (lesson.quiz?.length || 1)) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className="text-2xl font-medium text-slate-700 dark:text-gray-200 mb-6">
                    {lesson.quiz![currentQuestionIndex].question}
                  </h3>
                  <div className="grid gap-4">
                    {lesson.quiz![currentQuestionIndex].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                        disabled={selectedOption !== null}
                        className={`
                          p-5 rounded-2xl text-left border-2 transition-all flex justify-between items-center
                          ${selectedOption === null 
                            ? 'border-slate-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 dark:text-gray-200' 
                            : index === lesson.quiz![currentQuestionIndex].correctAnswer
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                              : selectedOption === index
                                ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400'
                                : 'border-slate-100 dark:border-gray-800 opacity-50'
                          }
                        `}
                      >
                        <span className="font-medium">{option}</span>
                        {selectedOption !== null && index === lesson.quiz![currentQuestionIndex].correctAnswer && (
                          <CheckCircle2 className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
                        )}
                        {selectedOption === index && index !== lesson.quiz![currentQuestionIndex].correctAnswer && (
                          <XCircle className="w-6 h-6 text-rose-500 dark:text-rose-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="finished"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">¡Excelente trabajo!</h2>
                <p className="text-slate-600 dark:text-gray-400 mb-10 max-w-md mx-auto">
                  Has completado la lección y superado el quiz. Sigue así para dominar el idioma.
                </p>
                <button
                  onClick={onComplete}
                  className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95"
                >
                  Finalizar y Guardar Progreso
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
