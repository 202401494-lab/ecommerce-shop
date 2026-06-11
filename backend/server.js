require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const ExcelReader = require('./services/excelReader');
const OrderService = require('./services/orderService');
const DatabaseService = require('./services/databaseService');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'abi05guardado@gmail.com';

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use('/images', express.static(path.resolve(__dirname, '..', '..', 'data', 'imagenes')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const backendUrl = process.env.BACKEND_URL || process.env.FRONTEND_URL || '';
const googleCallbackURL = process.env.GOOGLE_CALLBACK_URL || `${backendUrl.replace(/\/$/, '')}/api/auth/google/callback`;
let googleAuthEnabled = false;

if (googleClientId && googleClientSecret) {
  passport.use(new GoogleStrategy({
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: googleCallbackURL
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        id: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        photo: profile.photos[0]?.value
      };
      return done(null, user);
    }
  ));
  googleAuthEnabled = true;
} else {
  console.warn('Google OAuth is not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in environment variables.');
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Initialize services
const excelReader = new ExcelReader(process.env.EXCEL_PATH || '../data/productos.xlsx');
const orderService = new OrderService();
const dbService = new DatabaseService();

// Initialize database
dbService.init();

// Auth Routes
if (googleAuthEnabled) {
  app.get('/api/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get('/api/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard?success=true`);
    }
  );
} else {
  app.get('/api/auth/google', (req, res) => {
    res.status(503).json({ error: 'Google OAuth is not configured.' });
  });

  app.get('/api/auth/google/callback', (req, res) => {
    res.status(503).json({ error: 'Google OAuth is not configured.' });
  });
}

app.get('/api/auth/logout', (req, res) => {
  req.logout(() => {
    res.json({ success: true });
  });
});

app.get('/api/auth/me', (req, res) => {
  if (req.user) {
    res.json({
      user: req.user,
      isAdmin: req.user.email === ADMIN_EMAIL
    });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// Products Routes
app.get('/api/products', (req, res) => {
  try {
    const products = excelReader.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Orders Routes
app.post('/api/orders', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const { items, total } = req.body;
    const order = {
      id: require('uuid').v4(),
      userId: req.user.id,
      userEmail: req.user.email,
      userName: req.user.name,
      items,
      total,
      date: new Date(),
      status: 'pending'
    };

    // Save to database
    dbService.saveOrder(order);

    // Send email with PDF
    orderService.sendOrderEmail(order);

    res.json({ success: true, orderId: order.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders', (req, res) => {
  if (!req.user || req.user.email !== ADMIN_EMAIL) {
    return res.status(403).json({ error: 'Admin access required' });
  }

  try {
    const orders = dbService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Backend running at http://localhost:${PORT}`);
});

module.exports = app;
