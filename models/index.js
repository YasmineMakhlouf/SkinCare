const User = require('./User');
const Appointment = require('./Appointment');
const Service = require('./Service');
const Payment = require('./Payment');
const Review = require('./Review');
const sequelize = require('../config/db-sequelize');

// Define associations
// User - Appointment (1:M)
User.hasMany(Appointment, { foreignKey: 'user_id' });
Appointment.belongsTo(User, { foreignKey: 'user_id' });

// Service - Appointment (1:M)
Service.hasMany(Appointment, { foreignKey: 'service_id' });
Appointment.belongsTo(Service, { foreignKey: 'service_id' });

// User - Payment (1:M)
Appointment.hasOne(Payment, { foreignKey: 'appointment_id' });
Payment.belongsTo(Appointment, { foreignKey: 'appointment_id' });

// User - Review (1:M)
User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

// Service - Review (1:M)
Service.hasMany(Review, { foreignKey: 'service_id' });
Review.belongsTo(Service, { foreignKey: 'service_id' });

// Sync database
const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('All tables have been created or updated.');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

module.exports = { User, Appointment, Service, Payment, Review, syncDB };
