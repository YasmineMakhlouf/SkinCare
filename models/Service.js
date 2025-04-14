const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db-sequelize');

class Service extends Model {}

Service.init(
  {
    service_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    service_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    service_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    service_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service_duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Service',
    tableName: 'services',
    timestamps: false,
  }
);

module.exports = Service;
