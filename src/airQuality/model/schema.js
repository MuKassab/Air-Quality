import { DataTypes } from 'sequelize';
import { CITIES } from '../../common/constants/cities.js';

export const CitiesPollutionTrackingSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  city: {
    type: DataTypes.ENUM(...Object.values(CITIES)),
    allowNull: false,
  },
  aqius: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mainus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
};
