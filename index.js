const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');
const fileUpload = require('express-fileupload');
const { ensureAdmin } = require('./middleware/adminMiddleware');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use(fileUpload());

// Import route files
const userRoutes = require('./routes/UserRoutes');
const serviceRoutes = require('./routes/ServiceRoutes');
const appointmentRoutes = require('./routes/AppointmentRoutes');
const paymentRoutes = require('./routes/PaymentRoutes');
const reviewRoutes = require('./routes/ReviewRoutes');
const UserController = require('./controllers/UserController');
const profileRoutes = require('./routes/profileRoutes');
const AppointmentController = require('./controllers/AppointmentController');
const ServiceService = require('./services/ServiceService');
const PaymentService = require('./services/PaymentService');
const ReviewService = require('./services/ReviewService');

const adminRoutes = require('./routes/AdminRoutes');

const session = require('express-session');

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true, // or false depending on your needs
  cookie: {
    maxAge: 3600000, // 1 hour
    secure: false // true if using HTTPS only
  }
}));

// Mount routes
app.use('/users', userRoutes);
app.use('/services', serviceRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/payments', paymentRoutes);
app.use('/reviews', reviewRoutes);
app.use('/admin', adminRoutes);

app.use(express.static('public'));
const { syncDB } = require('./models');
const AppointmentService = require('./services/AppointmentService');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/home', (req, res) => {
  const userId = req.session.user_id;
  const userName = req.session.user_name || 'Guest';
  const isAdmin = userId === 5;

  res.render('home', {
    user: {
      name: userName,
      isAdmin: isAdmin
    }
  });
});


app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/logout', UserController.logout);
app.use('/profile', profileRoutes);

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/aboutus', (req, res) => {
  res.render('aboutus');
});

app.get('/privacy', (req, res) => {
  res.render('privacy');
});

app.get('/terms', (req, res) => {
  res.render('terms');
});

app.get('/', (req, res) => {
  res.render('welcome');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/manageUsers', ensureAdmin, async (req, res) => {
  try {
    const users = await getAllUsersData();
    res.render('manageUsers', { users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to load users');
  }
});


app.get('/manageServices', ensureAdmin, async (req, res) => {
  try {
    const services = await ServiceService.getAllServices();
    res.render('manageServices', { services });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to load services');
  }
});

app.get('/manageAppointments', ensureAdmin, async (req, res) => {
  try {
    const appointments = await AppointmentService.getAllAppointments();
    res.render('manageAppointments', { appointments });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to load appointments');
  }
});

app.get('/managePayments', ensureAdmin, async (req, res) => {
  try {
    const payments = await PaymentService.getAllPayments();
    res.render('managePayments', { payments });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to load payments');
  }
});

app.get('/manageReviews', ensureAdmin, async (req, res) => {
  try {
    const reviews = await ReviewService.getAllReviews();
    res.render('manageReviews', { reviews });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to load reviews');
  }
});

app.use('/reviews', reviewRoutes);

app.use('/services', serviceRoutes);

app.use('/appointments', appointmentRoutes);

app.get('/dashboard', ensureAdmin, (req, res) => {
  res.render('admin', {
    user: {
      name: req.session.user_name || 'Admin',
    },
  });
});
