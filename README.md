# Social Rockin' - La Red Social de Rock 🎸

## Descripción
Social Rockin' es una Single Page Application (SPA) desarrollada con Vue.js que permite a los amantes del rock conectarse, compartir contenido y interactuar. 

## Tecnologías Utilizadas
- Vue.js 3
- Vite
- Firebase (Authentication & Firestore)
- Tailwind CSS
- JavaScript

## Características Principales
- Autenticación de usuarios
- Creación y edición de perfiles
- Publicación de posts
- Sistema de comentarios
- Diseño responsive

## Requisitos Previos
- Node.js (versión 14 o superior)
- npm o yarn
- Cuenta de Firebase

## Configuración del Proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/JoaquinGuerreiro/social-rockin-app.git
cd social-rockin-app
```

### 2. Instalar dependencias
```bash
npm install
# o
yarn install
```

### 3. Configurar Firebase
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```plaintext
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
# o
yarn dev
```

## Despliegue
El proyecto está configurado para ser desplegado en Vercel. Para un despliegue exitoso:
1. Conecta tu repositorio con Vercel
2. Configura las variables de entorno en el panel de Vercel
3. ¡Listo! Tu aplicación estará en línea

## Demo
Puedes ver una demo en vivo del proyecto aquí: [Link a tu demo en Vercel]

## Contacto
- LinkedIn: [Tu perfil de LinkedIn]
- Email: [Tu email profesional]
- Portfolio: [Tu portfolio]

## Licencia
Este proyecto está bajo la Licencia MIT 