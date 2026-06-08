# PRIMERO: Instala Node.js

Este proyecto requiere Node.js 16+.

**Descarga Node.js:**
https://nodejs.org/ (descarga la versión LTS)

## Pasos para iniciar el proyecto:

### 1. Generar archivo Excel de productos (Primero)

```bash
cd data
npm install xlsx
node createExcel.js
```

Esto crea el archivo `productos.xlsx` con datos de ejemplo.

### 2. Configurar variables de entorno

#### Backend:
```bash
cd backend
cp .env.example .env
# Edita .env con tus credenciales
```

Variables necesarias:
- `GOOGLE_CLIENT_ID` - De Google Cloud Console
- `GOOGLE_CLIENT_SECRET` - De Google Cloud Console  
- `GMAIL_USER` - Tu correo de Gmail
- `GMAIL_PASSWORD` - Contraseña de aplicación de Gmail (2FA requerido)

#### Frontend:
```bash
cd frontend
cp .env.example .env
# No necesita cambios para desarrollo local
```

### 3. Instalar dependencias

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 4. Iniciar aplicación

Opción A - Ambos servidores:
```bash
npm start
```

Opción B - Por separado:
```bash
# Terminal 1 - Backend
npm run backend

# Terminal 2 - Frontend
npm run frontend
```

### 5. Acceder

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Admin: Inicia sesión con `abi05guardado@gmail.com`

## Configurar Google OAuth

1. Ve a https://console.cloud.google.com/
2. Crea un nuevo proyecto
3. Habilita la API "Google+ API"
4. Crea credenciales OAuth 2.0 (tipo: Aplicación web)
5. Agrega URI autorizados:
   - `http://localhost:5000`
   - `http://localhost:5000/api/auth/google/callback`
6. Copia Client ID y Client Secret a `.env`

## Configurar Gmail para envío de correos

1. Habilita 2FA en https://myaccount.google.com/security
2. Genera contraseña de aplicación en https://myaccount.google.com/apppasswords
3. Usa esa contraseña en `GMAIL_PASSWORD` del `.env`

## Reemplazar datos de productos

Edita `data/productos.xlsx` con tus productos.

Columnas requeridas:
- `id`: Número único
- `nombre`: Nombre del producto
- `precio`: Precio en dólares
- `descripcion`: Descripción del producto
- `imagen`: URL de la imagen (opcional)
- `categoria`: Categoría del producto
- `stock`: Cantidad disponible
