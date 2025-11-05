'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    static associate(models) {
    }
  }
  Hotel.init({
    tipe_kamar: DataTypes.STRING,
    kapasitas_tamu: DataTypes.INTEGER,
    lantai: DataTypes.INTEGER,
    fasilitas: DataTypes.TEXT,
    tanggal_pesan: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Hotel',      
    tableName: 'hotel',    
    timestamps: false      
  });
  return Hotel;
};