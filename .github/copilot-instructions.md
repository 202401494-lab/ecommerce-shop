# E-Commerce Project Setup Instructions

Proyecto full-stack de e-commerce con React, Node.js y Excel completamente funcional.

## ✅ Características Implementadas

- Autenticación con Google OAuth
- Catálogo de productos desde Excel
- Carrito de compras con persistencia
- Sistema de órdenes con PDF
- Envío de correos automático
- Panel admin protegido
- Interfaz responsiva

## 📁 Estructura
- `backend/`: API Node.js + Express con autenticación y órdenes
- `frontend/`: App React con Tailwind CSS
- `data/`: Archivo Excel de productos

## 🚀 Inicio Rápido

1. Instala Node.js 16+
2. `npm run install-all` - Instala todas las dependencias
3. Configura `backend/.env` con:
   - Google OAuth credentials
   - Gmail credentials
4. `npm start` - Inicia frontend (3000) y backend (5000)

## 📖 Documentación

- `SETUP_GUIDE.md` - Guía completa
- `SETUP_GUIDE_ES.md` - Guía en español
- `backend/API.md` - Documentación de API

## 🔐 Variables de Entorno Necesarias

```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GMAIL_USER=...
GMAIL_PASSWORD=... (use app password, not regular password)
```

## Admin Access
- Email: abi05guardado@gmail.com
- Solo este correo puede acceder al panel admin
