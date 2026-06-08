# 🛍️ E-Commerce Website

Un sitio web de e-commerce completo con catálogo de productos desde Excel, carrito de compras, autenticación con Google y sistema de órdenes con PDF.

## ✨ Características

✅ **Catálogo de Productos** - Cargados desde archivo Excel  
✅ **Carrito de Compras** - Con persistencia en navegador  
✅ **Autenticación Google** - Login seguro  
✅ **Sistema de Órdenes** - Genera PDF con detalles  
✅ **Envío de Correos** - Automático a cliente y admin  
✅ **Panel Admin** - Solo accesible por admin  
✅ **Interfaz Responsiva** - Mobile, tablet, desktop  
✅ **Base de Datos** - SQLite para historial de órdenes  

## 🚀 Inicio Rápido

### 1. Requisitos
- **Node.js** 16+ ([descargar](https://nodejs.org/))
- **npm** (viene con Node.js)

### 2. Instalar Dependencias
```bash
npm run install-all
```

### 3. Configurar Variables de Entorno

```bash
cp backend/.env.example backend/.env
```

Edita `backend/.env`:
```
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
GMAIL_USER=tu_email@gmail.com
GMAIL_PASSWORD=tu_app_password
```

### 4. Iniciar Aplicación
```bash
npm start
```

Accede a:
- 🌐 **Frontend**: http://localhost:3000
- ⚙️ **Backend**: http://localhost:5000

## 📖 Guías Completas

- [Setup Guide (English)](./SETUP_GUIDE.md)
- [Setup Guide (Español)](./SETUP_GUIDE_ES.md)
- [API Documentation](./backend/API.md)

## 🔐 Configuración Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea nuevo proyecto
3. Habilita "Google+ API"
4. Crea credenciales OAuth 2.0
5. Autoriza:
   - Orígenes: `http://localhost:5000`
   - Redirección: `http://localhost:5000/api/auth/google/callback`
6. Copia ID y Secret a `.env`

## 📧 Configuración Gmail

1. Habilita [2FA](https://myaccount.google.com/security)
2. Genera [app password](https://myaccount.google.com/apppasswords)
3. Usa el password en `GMAIL_PASSWORD` del `.env`

## 📊 Archivo Excel de Productos

Edita `data/productos.xlsx` con tus productos.

**Columnas:**
- `id` - Número único
- `nombre` - Nombre del producto
- `precio` - Precio en USD
- `descripcion` - Descripción
- `imagen` - URL de imagen (opcional)
- `categoria` - Categoría
- `stock` - Stock disponible

## 👤 Admin Access

Solo el correo `abi05guardado@gmail.com` tiene acceso al panel admin.

**Función del Panel:**
- Ver todas las órdenes
- Ver detalles de cada pedido
- Monitorear ventas

## 🏗️ Estructura del Proyecto

```
E-commerce/
├── backend/              # Node.js + Express API
│   ├── services/         # Servicios de negocio
│   ├── server.js         # Servidor principal
│   └── package.json      # Dependencias
├── frontend/             # React App
│   ├── src/              # Componentes
│   ├── public/           # Assets
│   └── package.json      # Dependencias
├── data/                 # Datos
│   ├── productos.xlsx    # Catálogo
│   └── createExcel.js    # Generador
└── docs/                 # Documentación
```

## 🛠️ Tecnologías

**Backend:**
- Node.js + Express
- Passport.js (Auth)
- Nodemailer (Emails)
- PDFKit (PDFs)
- SQLite3 (Database)
- XLSX (Excel)

**Frontend:**
- React 18
- Tailwind CSS
- Axios
- React Icons
- React Hot Toast

## 📝 Flujo de Uso

```
1. Usuario → Accede al sitio
2. Usuario → Ve catálogo de productos
3. Usuario → Inicia sesión con Google
4. Usuario → Agrega productos al carrito
5. Usuario → Hace checkout
6. Sistema → Crea orden y envía PDF por email
7. Admin → Recibe notificación en admin@email.com
8. Admin → Puede ver todas las órdenes
```

## ⚙️ Comandos Disponibles

```bash
# Instalar todo
npm run install-all

# Iniciar ambos servidores
npm start

# Solo backend (puerto 5000)
npm run backend

# Solo frontend (puerto 3000)
npm run frontend
```

## 🐛 Troubleshooting

**Puerto en uso**
```bash
npx kill-port 5000
```

**Excel no se carga**
```bash
node data/createExcel.js
```

**Gmail rechaza email**
- Verifica que habilitaste 2FA
- Usa contraseña de aplicación, no tu contraseña
- Verifica que `GMAIL_USER` es correcto

## 🔄 Desarrollo

Para modo desarrollo con hot reload:
```bash
# Terminal 1
npm run backend
# Terminal 2  
npm run frontend
```

## 📦 Build para Producción

```bash
cd frontend
npm run build
```

Los archivos compilados irán a `frontend/build/`

## 🚀 Desplegar

Instrucciones para desplegar en Heroku, Vercel o tu servidor preferido en `SETUP_GUIDE_ES.md`

## 📝 Notas

- La base de datos SQLite se crea automáticamente en `data/ecommerce.db`
- Los carritos se guardan en localStorage del navegador
- Los emails se envían automáticamente con PDF adjunto
- Admin recibe copia de cada orden

## 💡 Personalización

- **Colores**: Edita Tailwind en componentes React
- **Estilos**: Modifica `frontend/src/App.css`
- **Correo Admin**: Cambia `ADMIN_EMAIL` en `.env`
- **Productos**: Edita `data/productos.xlsx`

## 📄 License

MIT

---

**¿Necesitas ayuda?** Lee `SETUP_GUIDE_ES.md` para guía completa en español.
