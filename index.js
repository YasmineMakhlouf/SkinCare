const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import route files
const userRoutes = require('./routes/UserRoutes');
const serviceRoutes = require('./routes/ServiceRoutes');
const appointmentRoutes = require('./routes/AppointmentRoutes');
const paymentRoutes = require('./routes/PaymentRoutes');
const reviewRoutes = require('./routes/ReviewRoutes');

// Mount routes
app.use('/users', userRoutes);
app.use('/services', serviceRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/payments', paymentRoutes);
app.use('/reviews', reviewRoutes);

// Optional: A default route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Import the syncDB function to synchronize models with the database
const { syncDB } = require('./models');

// Sync the database and then start the server
syncDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error while syncing the database:', error);
  });
