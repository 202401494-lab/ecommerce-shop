# Backend API Documentation

## Endpoints

### Auth
- `GET /api/auth/google` - Inicia login con Google
- `GET /api/auth/google/callback` - Callback de Google
- `GET /api/auth/logout` - Cierra sesión
- `GET /api/auth/me` - Obtiene usuario actual

### Products
- `GET /api/products` - Obtiene todos los productos desde Excel

### Orders
- `POST /api/orders` - Crea un nuevo pedido (requiere autenticación)
- `GET /api/orders` - Obtiene todos los pedidos (solo admin)

### Health
- `GET /api/health` - Verifica estado del servidor

## Environment Variables

```
PORT=5000
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=abi05guardado@gmail.com
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GMAIL_USER=your_email@gmail.com
GMAIL_PASSWORD=your_app_password
EXCEL_PATH=../data/productos.xlsx
SESSION_SECRET=your_secret
NODE_ENV=development
```
