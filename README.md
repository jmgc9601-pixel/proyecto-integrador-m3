# Proyecto Integrador M3 — Jefe Maestro

Aplicación web de una sola página (SPA) que permite conversar con una interpretación ficticia de **John-117, el Jefe Maestro**, del universo Halo, utilizando inteligencia artificial de Google Gemini.

**Aplicación en producción:** [Abrir Jefe Maestro](https://proyecto-integrador-m3-wqfs-3yiwd379o-jmgc9601-pixel.vercel.app)

## Características

- Interfaz responsive con enfoque mobile-first.
- Navegación SPA entre Home, Chat y About.
- Conversación con Gemini mediante una función del servidor.
- Historial de conversación durante la sesión.
- Manejo de estados de carga y errores.
- Validación de mensajes e historial.
- Pruebas automatizadas con Vitest.

## Tecnologías y herramientas utilizadas

### Desarrollo

- **HTML5:** estructura de la aplicación.
- **CSS3:** estilos y diseño responsive.
- **JavaScript:** lógica de la aplicación, navegación y comunicación con el servidor.
- **Node.js y npm:** entorno de ejecución y gestión de dependencias.
- **Git y GitHub:** control de versiones y almacenamiento del código.
- **Vercel:** despliegue de la aplicación y ejecución de funciones del servidor.

### Inteligencia artificial

- **Google Gemini API:** genera las respuestas del Jefe Maestro.
- **ChatGPT:** herramienta de apoyo durante el proceso de aprendizaje, resolución de dudas, depuración de errores y elaboración de documentación.

### Pruebas

- **Vitest:** ejecución de pruebas automatizadas.
- **jsdom:** simulación de un entorno DOM para probar funcionalidades del frontend.

## Estructura del proyecto

```text
proyecto-integrador-m3/
├── api/
│   └── functions.mjs       # Función del servidor para consultar Gemini
├── src/
│   ├── index.html          # Documento HTML principal
│   ├── styles.css          # Estilos y diseño responsive
│   ├── app.js              # Navegación SPA y vistas
│   ├── chat.js             # Lógica de la conversación
│   ├── utils.js            # Funciones auxiliares
│   └── icon/
│       └── jefe.jfif       # Imagen del personaje
├── tests/
│   ├── utils.test.js       # Pruebas de utilidades
│   └── chat.test.js        # Pruebas del chat
├── .env.example            # Ejemplo de variables de entorno
├── .gitignore              # Archivos excluidos de Git
├── package.json            # Dependencias y scripts
├── package-lock.json       # Versiones de dependencias instaladas
├── vercel.json             # Configuración de Vercel, si aplica
└── vitest.config.mjs       # Configuración de Vitest
```

**Nota:** el archivo `.env` se utiliza para variables locales cuando corresponde, pero no debe subirse al repositorio. El árbol representa los archivos principales; `node_modules/` se omite porque contiene las dependencias instaladas.

## Requisitos

- Node.js y npm.
- Una clave de API de Google Gemini.
- Una cuenta de Vercel para desplegar la aplicación.

## Instalación y ejecución local

1. Clona el repositorio:

   ```bash
   git clone https://github.com/jmgc9601-pixel/proyecto-integrador-m3.git
   ```

2. Entra en la carpeta:

   ```bash
   cd proyecto-integrador-m3
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Configura la variable de entorno `GEMINI_API_KEY` para el entorno local de la función del servidor. No incluyas la clave en el código del frontend ni en GitHub.

5. Inicia el entorno de desarrollo de Vercel:

   ```bash
   npx vercel dev
   ```

6. Abre en el navegador la dirección local que indique Vercel.

## Variables de entorno y seguridad

La aplicación utiliza esta variable en el servidor:

| Variable | Descripción |
|---|---|
| `GEMINI_API_KEY` | Clave privada para autenticar las solicitudes a Gemini. |

La clave se lee mediante `process.env.GEMINI_API_KEY` en la función del servidor. En Vercel debe configurarse en los ajustes de variables de entorno del proyecto.

- No subir `.env` a GitHub.
- No incluir claves privadas en el frontend.
- Utilizar `.env.example` para documentar las variables necesarias sin incluir valores secretos.

## Pruebas automatizadas

Ejecuta las pruebas con:

```bash
npm test
```

En Windows PowerShell también puedes utilizar:

```powershell
npm.cmd test
```

Las pruebas cubren funciones auxiliares y comportamientos del chat, como respuestas exitosas, manejo de errores, reactivación del formulario y control del historial.

## Despliegue

La aplicación está desplegada en Vercel:

**URL de producción:** https://proyecto-integrador-m3-wqfs-3yiwd379o-jmgc9601-pixel.vercel.app

El código fuente se encuentra en GitHub:

**Repositorio:** https://github.com/jmgc9601-pixel/proyecto-integrador-m3

## Autor

Juan Garcia
Proyecto académico correspondiente al módulo M3.