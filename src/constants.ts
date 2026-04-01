import { Lesson } from './types';

export const LESSONS: Record<'en' | 'pt', Lesson[]> = {
  en: [
    {
      id: 'en-1',
      title: 'Greetings & Basics',
      description: 'Learn how to say hello and introduce yourself. (Aprende a saludar y presentarte)',
      level: 'A1',
      category: 'vocabulary',
      content: `
# Greetings in English (Saludos en Inglés)

**Instrucciones:** Lee los saludos y repítelos en voz alta. Los saludos cambian según la hora del día.

Common greetings:
- **Hello / Hi**: Standard greetings. (Hola)
- **Good morning**: Until 12 PM. (Buenos días)
- **Good afternoon**: From 12 PM to 6 PM. (Buenas tardes)
- **Good evening**: After 6 PM. (Buenas noches - al llegar)
- **Good night**: When leaving or going to bed. (Buenas noches - al despedirse)

Introductions:
- **My name is...**: Mi nombre es...
- **Nice to meet you**: Mucho gusto.
- **How are you?**: ¿Cómo estás?
      `,
      quiz: [
        {
          question: "How do you say 'Mucho gusto' in English?",
          options: ["Hello", "Nice to meet you", "Good morning", "How are you?"],
          correctAnswer: 1
        },
        {
          question: "What greeting do you use at 10:00 AM?",
          options: ["Good afternoon", "Good night", "Good morning", "Good evening"],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 'en-2',
      title: 'Common Verbs',
      description: 'Master the most used verbs in English. (Domina los verbos más usados)',
      level: 'A1',
      category: 'grammar',
      content: `
# Essential Verbs: To Be (Verbo Ser/Estar)

**Instrucciones:** El verbo "To Be" es fundamental. Memoriza estas formas para poder construir oraciones básicas.

- **I am**: Yo soy / estoy
- **You are**: Tú eres / estás
- **He/She/It is**: Él/Ella/Eso es / está
- **We are**: Nosotros somos / estamos
- **They are**: Ellos son / están

Example:
- I am a student. (Yo soy un estudiante)
- She is happy. (Ella está feliz)
      `,
      quiz: [
        {
          question: "Which is the correct form for 'He'?",
          options: ["am", "are", "is", "be"],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 'en-3',
      title: 'Numbers and Time',
      description: 'Learn to count and tell the time. (Aprende los números y la hora)',
      level: 'A1',
      category: 'vocabulary',
      content: `
# Numbers 1-10 (Números del 1 al 10)

1. One
2. Two
3. Three
4. Four
5. Five
6. Six
7. Seven
8. Eight
9. Nine
10. Ten

# Telling the Time (Decir la hora)
- **What time is it?**: ¿Qué hora es?
- **It is [number] o'clock**: Son las [número] en punto.
- **It is half past [number]**: Son las [número] y media.
      `,
      quiz: [
        {
          question: "How do you say '3' in English?",
          options: ["Two", "Three", "Four", "Five"],
          correctAnswer: 1
        },
        {
          question: "What does 'What time is it?' mean?",
          options: ["¿Cómo estás?", "¿Qué hora es?", "¿Dónde estás?", "¿Quién eres?"],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'en-4',
      title: 'Family Members',
      description: 'Learn how to talk about your family. (Habla sobre tu familia)',
      level: 'A1',
      category: 'vocabulary',
      content: `
# Family Vocabulary (Vocabulario de Familia)

- **Father**: Padre
- **Mother**: Madre
- **Brother**: Hermano
- **Sister**: Hermana
- **Son**: Hijo
- **Daughter**: Hija
- **Grandfather**: Abuelo
- **Grandmother**: Abuela

Example:
- My mother is a teacher. (Mi madre es profesora)
- I have one brother. (Tengo un hermano)
      `,
      quiz: [
        {
          question: "How do you say 'Hermana'?",
          options: ["Brother", "Mother", "Sister", "Daughter"],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 'en-11',
      title: 'Colors and Clothing',
      description: 'Describe what people are wearing. (Describe la ropa y los colores)',
      level: 'A1',
      category: 'vocabulary',
      content: `
# Colors (Colores)
- **Red**: Rojo
- **Blue**: Azul
- **Green**: Verde
- **Yellow**: Amarillo
- **Black**: Negro
- **White**: Blanco

# Clothing (Ropa)
- **Shirt**: Camisa
- **Pants**: Pantalones
- **Shoes**: Zapatos
- **Dress**: Vestido
- **Hat**: Sombrero

Example:
- I am wearing a blue shirt. (Llevo una camisa azul)
- The shoes are black. (Los zapatos son negros)
      `,
      quiz: [
        {
          question: "What color is 'Azul'?",
          options: ["Red", "Blue", "Green", "Yellow"],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'en-5',
      title: 'Daily Routine',
      description: 'Talk about your day-to-day activities. (Habla de tu rutina diaria)',
      level: 'A2',
      category: 'conversation',
      content: `
# Daily Routine Vocabulary (Rutina Diaria)

**Instrucciones:** Usa estos verbos para describir lo que haces cada día.

- **Wake up**: Despertarse
- **Have breakfast**: Desayunar
- **Go to work**: Ir al trabajo
- **Have lunch**: Almorzar
- **Go home**: Ir a casa
- **Have dinner**: Cenar
- **Go to sleep**: Ir a dormir

Example:
- I wake up at 7 AM. (Me despierto a las 7 AM)
- I have lunch at 1 PM. (Almuerzo a la 1 PM)
      `,
      quiz: [
        {
          question: "What does 'Wake up' mean?",
          options: ["Almorzar", "Despertarse", "Cenar", "Dormir"],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'en-6',
      title: 'Food and Drinks',
      description: 'Order food at a restaurant. (Pide comida en un restaurante)',
      level: 'A2',
      category: 'vocabulary',
      content: `
# Food and Drinks (Comida y Bebida)

- **Water**: Agua
- **Coffee**: Café
- **Bread**: Pan
- **Chicken**: Pollo
- **Salad**: Ensalada
- **Menu**: Menú
- **Bill**: Cuenta

# Useful Phrases
- **I would like a coffee, please**: Me gustaría un café, por favor.
- **Can I have the bill?**: ¿Me trae la cuenta?
      `,
      quiz: [
        {
          question: "How do you say 'Agua'?",
          options: ["Coffee", "Bread", "Water", "Salad"],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 'en-12',
      title: 'The Weather',
      description: 'Talk about the climate and seasons. (Habla del clima y las estaciones)',
      level: 'A2',
      category: 'vocabulary',
      content: `
# Weather Vocabulary (Clima)
- **Sunny**: Soleado
- **Rainy**: Lluvioso
- **Cloudy**: Nublado
- **Snowy**: Nevado
- **Hot**: Caluroso
- **Cold**: Frío

# Seasons (Estaciones)
- **Spring**: Primavera
- **Summer**: Verano
- **Autumn/Fall**: Otoño
- **Winter**: Invierno

Example:
- It is sunny today. (Hoy está soleado)
- I love summer. (Me encanta el verano)
      `,
      quiz: [
        {
          question: "What does 'Rainy' mean?",
          options: ["Soleado", "Lluvioso", "Nublado", "Caluroso"],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'en-7',
      title: 'Survival Phrases',
      description: 'Quick phrases for common situations. (Frases de supervivencia)',
      level: 'A1',
      category: 'vocabulary',
      content: `
# Survival Phrases (Frases de Supervivencia)

**Instrucciones:** Estas frases te ayudarán si te sientes perdido o necesitas ayuda inmediata.

- **Where is the bathroom?**: ¿Dónde está el baño?
- **How much is it?**: ¿Cuánto cuesta?
- **Can you help me?**: ¿Me puedes ayudar?
- **I don't understand**: No entiendo.
- **Speak slowly, please**: Habla despacio, por favor.
      `,
      quiz: [
        {
          question: "How do you ask for the price?",
          options: ["Where is the bathroom?", "How much is it?", "Can you help me?", "I don't understand"],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'en-8',
      title: 'Past Tense',
      description: 'Talk about what you did yesterday. (Habla de lo que hiciste ayer)',
      level: 'A2',
      category: 'grammar',
      content: `
# Simple Past (Pasado Simple)

**Instrucciones:** Para hablar del pasado, la mayoría de los verbos terminan en "-ed".

- **I worked**: Yo trabajé
- **You played**: Tú jugaste
- **He/She/It cooked**: Él/Ella cocinó

# Irregular Verbs (Verbos Irregulares)
- **Go -> Went**: Ir -> Fui
- **Eat -> Ate**: Comer -> Comí
- **See -> Saw**: Ver -> Vi

Example:
- I went to the park yesterday. (Fui al parque ayer)
      `,
      quiz: [
        {
          question: "What is the past of 'Go'?",
          options: ["Goed", "Went", "Gone", "Going"],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'en-13',
      title: 'Giving Directions',
      description: 'Learn how to navigate a city. (Aprende a moverte por la ciudad)',
      level: 'B1',
      category: 'conversation',
      content: `
# Directions (Direcciones)
- **Turn left**: Gira a la izquierda
- **Turn right**: Gira a la derecha
- **Go straight**: Ve recto
- **Across from**: Frente a
- **Next to**: Al lado de

# Places in the City
- **Hospital**: Hospital
- **Bank**: Banco
- **Supermarket**: Supermercado
- **Park**: Parque

Example:
- The bank is next to the park. (El banco está al lado del parque)
- Turn left at the corner. (Gira a la izquierda en la esquina)
      `,
      quiz: [
        {
          question: "How do you say 'Gira a la derecha'?",
          options: ["Turn left", "Turn right", "Go straight", "Next to"],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'en-9',
      title: 'Future Plans',
      description: 'Talk about your future intentions. (Habla de tus planes futuros)',
      level: 'B1',
      category: 'grammar',
      content: `
# Future with "Going to" (Futuro con "Going to")

**Instrucciones:** Usamos "going to" para planes e intenciones futuras.

- **I am going to travel**: Voy a viajar
- **She is going to study**: Ella va a estudiar
- **They are going to eat**: Ellos van a comer

# Future with "Will"
- **I will help you**: Te ayudaré (promesa o decisión espontánea)
      `,
      quiz: [
        {
          question: "How do you say 'Voy a estudiar'?",
          options: ["I study", "I am going to study", "I studied", "I will study"],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'en-14',
      title: 'Health and Body',
      description: 'Describe how you feel. (Describe cómo te sientes)',
      level: 'B1',
      category: 'vocabulary',
      content: `
# Body Parts (Partes del Cuerpo)
- **Head**: Cabeza
- **Back**: Espalda
- **Arm**: Brazo
- **Leg**: Pierna
- **Stomach**: Estómago

# Health Problems
- **I have a headache**: Tengo dolor de cabeza
- **I have a fever**: Tengo fiebre
- **I feel sick**: Me siento enfermo

Example:
- My back hurts. (Me duele la espalda)
- You should see a doctor. (Deberías ver a un médico)
      `,
      quiz: [
        {
          question: "What does 'Headache' mean?",
          options: ["Dolor de espalda", "Dolor de cabeza", "Fiebre", "Tos"],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'en-10',
      title: 'Business English',
      description: 'Professional vocabulary for work. (Vocabulario profesional para el trabajo)',
      level: 'B2',
      category: 'vocabulary',
      content: `
# Business Vocabulary (Vocabulario de Negocios)

- **Meeting**: Reunión
- **Deadline**: Fecha límite
- **Feedback**: Retroalimentación
- **To schedule**: Programar
- **To postpone**: Posponer

# Useful Phrases
- **Let's schedule a meeting**: Programemos una reunión.
- **I need your feedback on this**: Necesito tu opinión sobre esto.
      `,
      quiz: [
        {
          question: "What does 'Deadline' mean?",
          options: ["Reunión", "Fecha límite", "Opinión", "Trabajo"],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'en-15',
      title: 'Environment & Ecology',
      description: 'Discuss global issues. (Habla sobre problemas globales)',
      level: 'B2',
      category: 'conversation',
      content: `
# Environmental Vocabulary (Medio Ambiente)
- **Pollution**: Contaminación
- **Global warming**: Calentamiento global
- **Recycling**: Reciclaje
- **Renewable energy**: Energía renovable
- **Sustainability**: Sostenibilidad

# Discussion Phrases
- **We must protect the planet**: Debemos proteger el planeta.
- **Recycling is important**: El reciclaje es importante.
      `,
      quiz: [
        {
          question: "What is 'Pollution'?",
          options: ["Reciclaje", "Contaminación", "Energía", "Clima"],
          correctAnswer: 1
        }
      ]
    }
  ],
  pt: [
    {
      id: 'pt-1',
      title: 'Saudações e Básico',
      description: 'Aprenda a dizer olá e se apresentar. (Aprende a saludar y presentarte)',
      level: 'A1',
      category: 'vocabulary',
      content: `
# Saudações em Português (Saludos en Portugués)

**Instrucciones:** Aprende los saludos básicos para iniciar una conversación.

Saudações comuns:
- **Olá / Oi**: Hola.
- **Bom dia**: Buenos días.
- **Boa tarde**: Buenas tardes.
- **Boa noite**: Buenas noches.

Apresentações:
- **Meu nome é...**: Mi nombre es...
- **Muito prazer**: Mucho gusto.
- **Como você está?**: ¿Cómo estás?
      `,
      quiz: [
        {
          question: "Como se diz 'Mucho gusto' em português?",
          options: ["Olá", "Muito prazer", "Bom dia", "Como você está?"],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'pt-2',
      title: 'Verbos Comuns',
      description: 'Domine os verbos mais usados em português. (Domina los verbos más usados)',
      level: 'A1',
      category: 'grammar',
      content: `
# Verbos Essenciais: Ser e Estar (Ser y Estar)

**Instrucciones:** En portugués, al igual que en español, diferenciamos entre estados permanentes y temporales.

**Verbo Ser (Permanente):**
- Eu sou (Yo soy)
- Você é (Tú eres)
- Nós somos (Nosotros somos)

**Verbo Estar (Temporário):**
- Eu estou (Yo estoy)
- Você está (Tú estás)
- Nós estamos (Nosotros estamos)
      `,
      quiz: [
        {
          question: "Qual verbo usar para 'Yo soy'?",
          options: ["Eu estou", "Eu sou", "Nós somos", "Eles são"],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 'pt-3',
      title: 'Rotina Diária',
      description: 'Fale sobre suas atividades do dia a dia. (Habla de tu rutina diaria)',
      level: 'A2',
      category: 'conversation',
      content: `
# Vocabulário de Rotina (Vocabulario de Rutina)

- **Acordar**: Despertarse
- **Tomar café da manhã**: Desayunar
- **Ir trabalhar**: Ir al trabajo
- **Almoçar**: Almorzar
- **Voltar para casa**: Volver a casa
- **Jantar**: Cenar
- **Ir dormir**: Ir a dormir
      `,
      quiz: [
        {
          question: "O que significa 'Almoçar'?",
          options: ["Desayunar", "Cenar", "Almorzar", "Dormir"],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 'pt-4',
      title: 'Survival Phrases',
      description: 'Quick phrases for common situations. (Frases de supervivencia)',
      level: 'A1',
      category: 'vocabulary',
      content: `
# Frases de Sobrevivência (Frases de Supervivencia)

- **Onde fica o banheiro?**: ¿Dónde está el baño?
- **Quanto custa?**: ¿Cuánto cuesta?
- **Você pode me ajudar?**: ¿Me puedes ayudar?
- **Eu não entendo**: No entiendo.
- **Fale devagar, por favor**: Habla despacio, por favor.
      `,
      quiz: [
        {
          question: "Como pedir ajuda?",
          options: ["Onde fica o banheiro?", "Quanto custa?", "Você pode me ayudar?", "Eu não entendo"],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 'pt-5',
      title: 'Pretérito Perfeito',
      description: 'Fale sobre ações concluídas no passado. (Habla del pasado)',
      level: 'B1',
      category: 'grammar',
      content: `
# O Passado em Português (El Pasado)

O **Pretérito Perfeito** indica acciones que empezaron y terminaron en el pasado.

Exemplos:
- Eu **falei** com ele ontem. (Hablé con él ayer)
- Nós **comemos** pizza. (Comimos pizza)
- Eles **foram** ao cinema. (Fueron al cine)
      `,
      quiz: [
        {
          question: "Como se diz 'Nosotros hablamos' no passado?",
          options: ["Nós falamos", "Nós falaremos", "Nós falo", "Nós falavam"],
          correctAnswer: 0
        }
      ]
    },
    {
      id: 'pt-6',
      title: 'Expressando Opiniões',
      description: 'Aprenda a debater e compartilhar seus pensamentos. (Expresa tus opiniones)',
      level: 'B2',
      category: 'conversation',
      content: `
# Expressões de Debate (Expresiones para Debatir)

- **Na minha opinião...**: En mi opinión...
- **Eu acho que...**: Yo creo que...
- **Concordo plenamente**: Estoy totalmente de acuerdo.
- **Discordo de você**: No estoy de acuerdo contigo.
- **Por outro lado...**: Por outro lado...
      `,
      quiz: [
        {
          question: "Como dizer 'Estoy totalmente de acuerdo'?",
          options: ["Discordo de você", "Eu acho que", "Concordo plenamente", "Por outro lado"],
          correctAnswer: 2
        }
      ]
    },
  ],
};
