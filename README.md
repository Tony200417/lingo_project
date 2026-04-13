# 🤖 LingoFast - Tu Tutor de Idiomas con IA

LingoFast es una plataforma moderna y minimalista diseñada para revolucionar el aprendizaje de idiomas a través de la Inteligencia Artificial. Con un enfoque en la interactividad y la inmersión, LingoFast te permite practicar inglés y portugués con un tutor inteligente que corrige tus errores y te guía en tiempo real.

![LingoFast Preview](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

## ✨ Características Principales

- **Tutor de Idiomas IA**: Chat interactivo potenciado por **Google Gemini** para práctica de conversación real.
- **Lecciones Interactivas**: Contenido estructurado para niveles Principiante (A1) y más.
- **Reconocimiento de Voz**: Practica tu pronunciación directamente en el navegador.
- **Arquitectura Segura**: Implementación de Proxy Backend para proteger las claves de API de Gemini.
- **Diseño Premium**: Interfaz fluida con soporte para Modo Oscuro y animaciones modernas.
- **Full-Stack**: Construido con React, Vite y desplegado en Firebase.

## 🛠️ Stack Tecnológico

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React, Motion.
- **Backend (Proxy)**: Express.js, Firebase Functions.
- **IA**: Google Generative AI (Gemini 1.5 Flash).
- **Despliegue**: Firebase Hosting & Functions.

## 🚀 Instalación y Ejecución Local

### Requisitos Previos

- Node.js (v20 o superior recomendado)
- Una API Key de [Google AI Studio](https://aistudio.google.com/)

### Pasos

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Tony200417/lingo_project.git
   cd lingo_project
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   cd functions && npm install && cd ..
   ```

3. **Configurar variables de entorno**:
   Crea un archivo `.env` en la raíz con:
   ```env
   GEMINI_API_KEY=tu_api_key_aqui
   ```

4. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`.

## 📦 Despliegue en Producción (Firebase)

Este proyecto está pre-configurado para Firebase:

1. Realiza el build del frontend:
   ```bash
   npm run build
   ```
2. Despliega a Firebase:
   ```bash
   firebase deploy
   ```

## 🔒 Seguridad

LingoFast utiliza una arquitectura de **Proxy Backend**. Esto significa que el cliente nunca ve tu API Key de Gemini. Todas las peticiones pasan a través de una Firebase Function o un servidor Express local que actúa como intermediario seguro.

---

Desarrollado con ❤️ para mejorar el aprendizaje de idiomas con IA.
