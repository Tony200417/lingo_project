import { useState, useRef, useEffect } from 'react';
import { Message, Language } from '../types';
import { Send, Bot, User, Loader2, Mic, MicOff } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { LingoIcon } from './LingoIcon';
import { GoogleGenAI } from "@google/genai";

interface ChatTutorProps {
  language: Language;
}

export function ChatTutor({ language }: ChatTutorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: language === 'en' 
        ? "Hello! I'm your English tutor. How can I help you today?" 
        : "Olá! Sou seu tutor de português. Como posso te ajudar hoje?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'en' ? 'en-US' : 'pt-BR';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + (prev ? ' ' : '') + transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [language]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (error) {
        console.error('Failed to start listening:', error);
      }
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const chatRef = useRef<any>(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          language: language
        }),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.code || errorData.error || 'Failed to connect to tutor');
        } else {
          const text = await response.text();
          if (response.status === 503 || response.status === 504) {
            throw new Error('SERVICE_UNAVAILABLE');
          }
          throw new Error(`Server error (${response.status}): ${text.substring(0, 50)}...`);
        }
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('El servidor respondió en un formato inesperado. Por favor, intenta de nuevo.');
      }

      const data = await response.json();
      const modelMessage: Message = { role: 'model', text: data.text || 'Sorry, I encountered an error.' };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error: any) {
      console.error('Chat Error:', error);
      let errorText = error.message || 'Hubo un error al conectar con el tutor. Por favor, intenta de nuevo.';
      
      if (error.message?.includes('API_KEY_MISSING')) {
        errorText = 'Error: La clave de API de Gemini no está configurada en el servidor.';
      } else if (error.message?.includes('API_KEY_INVALID')) {
        errorText = 'Error: La clave de API de Gemini no es válida. Por favor, verifica tu configuración en AI Studio.';
      } else if (error.message?.includes('SERVICE_UNAVAILABLE')) {
        errorText = 'El tutor de IA está muy ocupado en este momento. Por favor, espera unos segundos e intenta de nuevo.';
      }

      setMessages(prev => [...prev, { role: 'model', text: errorText }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset chat when language changes
  useEffect(() => {
    chatRef.current = null;
    setMessages([
      {
        role: 'model',
        text: language === 'en' 
          ? "Hello! I'm your English tutor. How can I help you today?" 
          : "Olá! Sou seu tutor de português. Como posso te ayudar hoje?"
      }
    ]);
  }, [language]);

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-200">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 flex items-center gap-3">
        <LingoIcon size={32} className="w-10 h-10" />
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            {language === 'en' ? 'Lingo (English Tutor)' : 'Lingo (Tutor de Português)'}
            <span className="text-[10px] font-normal text-gray-400 dark:text-gray-500">v1.0.6</span>
          </h3>
          <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Online
          </p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-3 max-w-[85%]",
                m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                m.role === 'user' ? "bg-gray-200 dark:bg-gray-700" : "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
              )}>
                {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={cn(
                "p-3 rounded-2xl text-sm",
                m.role === 'user' 
                  ? "bg-indigo-600 text-white rounded-tr-none" 
                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none"
              )}>
                <div className="markdown-body dark:text-gray-200">
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex gap-3 mr-auto">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none">
              <Loader2 size={16} className="animate-spin text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex gap-2">
          <button
            onClick={toggleListening}
            className={cn(
              "p-2 rounded-xl transition-all border",
              isListening 
                ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 animate-pulse" 
                : "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
            title="Usar micrófono"
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={language === 'en' ? "Type your message..." : "Digite sua mensagem..."}
            className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm dark:text-white"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
