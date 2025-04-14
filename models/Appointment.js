const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db-sequelize');
const moment = require('moment');

class Appointment extends Model {}

Appointment.init(
  {
    // Primary key
    appointment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    // Appointment date (formatted)
    appointment_date: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return moment(this.getDataValue('appointment_date')).format('YYYY-MM-DD');
      },
    },
    // Reference to user
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Reference to service
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Status of the appointment
    appointment_status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'rejected', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'Appointment',
    tableName: 'appointments',
    timestamps: false,
  }
);

module.exports = Appointment;
