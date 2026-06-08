require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'abi05guardado@gmail.com',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GMAIL_USER: process.env.GMAIL_USER,
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
  EXCEL_PATH: process.env.EXCEL_PATH || '../data/productos.xlsx',
  SESSION_SECRET: process.env.SESSION_SECRET || 'your-secret-key',
  NODE_ENV: process.env.NODE_ENV || 'development'
};
