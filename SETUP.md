# 🚀 Guía de Configuración

## Requisitos Previos

- Node.js v16 o superior
- MongoDB instalado y ejecutándose
- Una cuenta de Google para OAuth
- Gmail con contraseña de aplicación

## 1️⃣ Configurar Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
3. Ve a "Credenciales" y crea un "OAuth 2.0 Client ID"
4. Configura como "Aplicación web"
5. Agrega estas URLs autorizadas:
   - `http://localhost:5173`
   - `http://localhost:5000`
6. Copia el Client ID y Client Secret

## 2️⃣ Configurar Variables de Entorno

### Backend (`backend/.env`)

```bash
# Copiar el archivo de ejemplo
cp backend/.env.example backend/.env

# Editar y llenar:
MONGODB_URI=mongodb://localhost:27017/ecommerce
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
JWT_SECRET=tu_secret_aleatorio_aqui
EMAIL_USER=abi05guardado@gmail.com (o tu email)
EMAIL_PASS=tu_contraseña_de_aplicacion_de_gmail
ORDERS_EMAIL=abi05guardado@gmail.com
```

### Frontend

Configurar en `frontend/src/pages/Account.jsx` el Google Client ID

## 3️⃣ Instalar Dependencias

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

## 4️⃣ Iniciar MongoDB

```bash
# En Windows
mongod

# En Mac/Linux
brew services start mongodb-community
```

## 5️⃣ Cargar Productos desde PDF

1. Obtén el PDF con los productos
2. Crea un script en `backend/scripts/importProducts.js` o usa la API manualmente
3. Endpoint: `POST /api/products`

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Producto 1",
    "description": "Descripción",
    "price": 29.99,
    "image": "url_imagen",
    "category": "Categoría",
    "stock": 10
  }'
```

## 6️⃣ Ejecutar la Aplicación

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

## ✅ Verificar Funcionamiento

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api/health

## 📝 Notas

- Los pedidos se enviarán a abi05guardado@gmail.com en PDF
- Cada cliente recibe una copia del pedido en su email
- Los productos se pueden gestionar desde la API (solo requiere POST /api/products)

## 🆘 Solución de Problemas

**Error: "No se puede conectar a MongoDB"**
- Verifica que MongoDB esté ejecutándose
- Revisa la URI en `.env`

**Error: "Email no se envía"**
- Revisa credenciales de Gmail
- Habilita "Aplicaciones menos seguras" o usa contraseña de aplicación
- Revisa spam/promotions

**Error: "Google Login no funciona"**
- Verifica que el Client ID sea correcto
- Revisa las URLs autorizadas en Google Cloud
