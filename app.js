const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');

// Routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);

// Server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
