
PROYECTO ACTUALIZADO - JULIANA 18 MULTIVERSE
===========================================

QUÉ CAMBIÉ
----------
Ahora la página es mucho más larga e interactiva, con varias interfaces temáticas:

1. Portada coquette
2. Primavera (minijuego de flores escondidas)
3. Temática coreana (video + sobres de fortuna)
4. Acuario (peces interactivos y mensajes)
5. Arte (rompecabezas con una foto real)
6. Postres (memory game + sorpresa inspirada en Pompompurin)
7. Final con pastel de fresas + corazón QR

ARCHIVOS
--------
juliana_18_multiverse/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── img/
    │   ├── foto1.jpeg
    │   ├── foto2.jpeg
    │   ├── foto3.jpeg
    │   ├── foto4.jpeg
    │   └── foto5.jpeg
    ├── music/
    │   └── cancion.mp3
    └── video/
        └── video-juliana.mp4

CÓMO PROBAR EN VS CODE
----------------------
Opción 1: Live Server
- Abre la carpeta completa.
- Haz clic derecho en index.html
- Open with Live Server
- Si te falla el 5500 porque Oracle lo usa, cambia en VS Code el puerto de Live Server a 5501.

Opción 2: Servidor Python
- Abre una terminal en esta carpeta
- Ejecuta:
  python -m http.server 8000
- Luego abre:
  http://localhost:8000

QR EN CORAZÓN
-------------
En script.js hay una línea así:

const ACCESS_URL = "https://reemplaza-por-tu-url-final.com/juliana18";

Cuando subas esta web a GitHub Pages, Netlify o Vercel,
solo reemplaza esa URL y el QR del corazón se actualizará automáticamente.

PERSONALIZAR TEXTOS
-------------------
Puedes editar:
- fortunes[] en script.js
- fishMessages[] en script.js
- los textos del HTML en cada sección

NOTA
----
La figura de la sección de postres es un amiguito pudding inspirado en Pompompurin,
hecho con CSS, para mantener el proyecto ligero y editable.
