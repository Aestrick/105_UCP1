'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    static associate(models) {
      // define association here
    }
  }
  Hotel.init({
    // 'id' tidak perlu ditulis, Sequelize otomatis tahu
    tipe_kamar: DataTypes.STRING,
    kapasitas_tamu: DataTypes.INTEGER,
    lantai: DataTypes.INTEGER,
    fasilitas: DataTypes.TEXT,
    tanggal_pesan: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Hotel',      // Nama Model (H-nya besar)
    tableName: 'hotel',    // Nama Tabel di MySQL
    timestamps: false      // PENTING! Matikan createdAt/updatedAt
  });
  return Hotel;
};