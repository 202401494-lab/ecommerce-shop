# 🎉 Proyecto E-Commerce Completo - Resumen de Implementación

Tu sitio web de e-commerce está completamente creado y listo para configurar.

## ✅ Lo que se ha implementado

### Backend (Node.js + Express)
✅ Servidor API en puerto 5000  
✅ Autenticación con Google OAuth 2.0  
✅ Lectura de catálogo desde Excel  
✅ Sistema de carrito de compras  
✅ Generación de órdenes  
✅ Envío de PDF por correo con Nodemailer  
✅ Base de datos SQLite para órdenes  
✅ Panel admin protegido (solo abi05guardado@gmail.com)  

### Frontend (React)
✅ Interfaz moderna con Tailwind CSS  
✅ Catálogo de productos responsivo  
✅ Carrito de compras con persistencia (localStorage)  
✅ Autenticación con Google  
✅ Sistema de notificaciones (Toast)  
✅ Panel admin para ver todas las órdenes  
✅ Menú navegable  

### Características
✅ Login/Logout con Google  
✅ Agregar productos al carrito  
✅ Modificar cantidades  
✅ Checkout con envío de email + PDF  
✅ Historial de órdenes en admin  
✅ Responsive design (mobile, tablet, desktop)  

## 📁 Estructura del Proyecto

```
E-commerce/
├── backend/
│   ├── services/          # Servicios de negocio
│   │   ├── excelReader.js    # Lee Excel de productos
│   │   ├── orderService.js   # Genera PDF y envía emails
│   │   └── databaseService.js # Gestiona base de datos
│   ├── server.js          # Servidor principal
│   ├── config.js          # Configuración
│   ├── package.json       # Dependencias
│   ├── .env.example       # Variables de entorno
│   └── API.md             # Documentación API
│
├── frontend/
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── AuthContext.js     # Contexto de autenticación
│   │   ├── CartContext.js     # Contexto del carrito
│   │   ├── api.js             # Cliente Axios
│   │   ├── App.js             # Componente principal
│   │   └── index.js           # Entrada
│   ├── public/
│   │   └── index.html     # HTML principal
│   ├── package.json       # Dependencias
│   ├── tailwind.config.js # Configuración Tailwind
│   └── .env.example       # Variables de entorno
│
├── data/
│   ├── productos.xlsx     # Catálogo de productos (Excel)
│   ├── createExcel.js     # Script para generar Excel
│   └── ecommerce.db       # Base de datos SQLite (se crea al iniciar)
│
├── README.md              # Información general
├── SETUP_GUIDE.md         # Guía de configuración detallada
└── SETUP_GUIDE_ES.md      # Esta guía completa
```

## 🚀 Pasos Iniciales Rápidos

### 1. Instala Node.js
Descarga desde: https://nodejs.org/ (versión LTS 16+)

### 2. Genera el archivo Excel
```bash
cd data
npm install xlsx
node createExcel.js
cd ..
```

### 3. Instala todas las dependencias
```bash
npm run install-all
```

O por separado:
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 4. Configura variables de entorno
```bash
# En backend/
cp .env.example .env
```

Edita `backend/.env` con:
```
PORT=5000
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=abi05guardado@gmail.com
GOOGLE_CLIENT_ID=TU_CLIENT_ID_AQUI
GOOGLE_CLIENT_SECRET=TU_SECRET_AQUI
GMAIL_USER=tu_email@gmail.com
GMAIL_PASSWORD=tu_app_password_aqui
```

### 5. Inicia la aplicación
```bash
npm start
```

Accede a:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🔐 Configuraciones Necesarias

### Google OAuth Setup

1. Ve a: https://console.cloud.google.com/
2. Crea nuevo proyecto
3. Busca "Google+ API" y habilítala
4. Ve a Credenciales → Crear Credenciales → OAuth 2.0 Client ID
5. Tipo: Aplicación Web
6. Orígenes de JavaScript autorizados:
   - http://localhost:5000
7. URIs de redirección autorizados:
   - http://localhost:5000/api/auth/google/callback
8. Copia Client ID y Secret a tu .env

### Gmail para envío de correos

1. Habilita 2FA: https://myaccount.google.com/security
2. Ve a: https://myaccount.google.com/apppasswords
3. Selecciona: Correo → Windows
4. Copia la contraseña de 16 caracteres
5. Usa esa contraseña en `GMAIL_PASSWORD` del .env

## 📊 Archivo Excel de Productos

El archivo `data/productos.xlsx` debe tener estas columnas:

| id | nombre | precio | descripcion | imagen | categoria | stock |
|----|--------|--------|-------------|--------|-----------|-------|
| 1 | Laptop Pro | 1299.99 | Laptop profesional | [URL] | Electrónica | 5 |
| 2 | Mouse Inalámbrico | 29.99 | Mouse ergonómico | [URL] | Accesorios | 20 |

- **id**: Número único
- **nombre**: Nombre del producto
- **precio**: Precio en dólares
- **descripcion**: Descripción corta
- **imagen**: URL de imagen (puede estar vacío)
- **categoria**: Categoría del producto
- **stock**: Cantidad disponible

## 🔄 Flujo de la Aplicación

```
1. Usuario abre el sitio → Catálogo de productos
   ↓
2. Usuario inicia sesión con Google
   ↓
3. Usuario agrega productos al carrito
   ↓
4. Usuario hace checkout
   ↓
5. Sistema crea orden y envía email con PDF
   ↓
6. Admin recibe email en abi05guardado@gmail.com
   ↓
7. Admin puede ver todas las órdenes en Panel Admin
```

## 📧 Correos y Órdenes

- **Correo de Admin**: abi05guardado@gmail.com (recibe copias de todas las órdenes)
- **Correo de Cliente**: El usuario recibe su copia de la orden
- **Formato**: PDF con detalles de la orden, productos y total

## 🛠️ Tecnologías Usadas

**Backend:**
- Express.js - Framework web
- Passport.js - Autenticación OAuth
- Nodemailer - Envío de emails
- PDFKit - Generación de PDFs
- XLSX - Lectura de Excel
- SQLite3 - Base de datos

**Frontend:**
- React 18 - UI Framework
- Tailwind CSS - Estilos
- Axios - Cliente HTTP
- React Icons - Iconos
- React Hot Toast - Notificaciones

## ⚙️ Variables de Entorno Completas

**Backend (.env)**:
```
PORT=5000
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=abi05guardado@gmail.com
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GMAIL_USER=your_email@gmail.com
GMAIL_PASSWORD=your_app_password
EXCEL_PATH=../data/productos.xlsx
SESSION_SECRET=your_secret_key
NODE_ENV=development
```

**Frontend (.env)**:
```
REACT_APP_API_URL=http://localhost:5000
```

## 🐛 Troubleshooting

**Error: "Excel file not found"**
- Verifica que `data/productos.xlsx` existe
- Ejecuta `node data/createExcel.js`

**Error: "Gmail error"**
- Verifica que habilitaste 2FA
- Usa contraseña de aplicación (no contraseña normal)
- Verifica que `GMAIL_USER` coincide con tu correo

**Error: "Google auth failed"**
- Verifica tus credenciales en `backend/.env`
- Verifica que los URIs están correctos en Google Cloud Console

**Puerto ya está en uso**
- Cambia `PORT=5001` en backend/.env
- O mata el proceso: `npx kill-port 5000`

## 📝 Notas Importantes

1. **Datos de Prueba**: El archivo Excel de ejemplo tiene 5 productos de prueba. Reemplázalos con tus productos.

2. **Base de Datos**: Se crea automáticamente `data/ecommerce.db` cuando inicia el servidor. No la elimines.

3. **Seguridad**: En producción, cambia `SESSION_SECRET` y todas las contraseñas.

4. **CORS**: Actualmente permite peticiones desde `http://localhost:3000`. Para producción, cambia esto en `backend/server.js`.

## 🎯 Próximos Pasos

1. Instala Node.js
2. Crea credenciales OAuth en Google
3. Configura Gmail para envío de correos
4. Edita `backend/.env` con tus credenciales
5. Ejecuta `npm run install-all`
6. Ejecuta `npm start`
7. Reemplaza `data/productos.xlsx` con tus productos reales

## 📞 Ayuda

Si necesitas cambios o ajustes, aquí hay lo que puedes personalizar fácilmente:

- **Colores**: Edita clases Tailwind en componentes React
- **Estilos**: Edita `frontend/src/App.css` y `tailwind.config.js`
- **Correo Admin**: Cambia `ADMIN_EMAIL` en `.env`
- **Puerto**: Cambia `PORT` en `.env`
- **Productos**: Edita `data/productos.xlsx`

¡Tu aplicación está lista! 🚀
