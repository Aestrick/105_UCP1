require('dotenv').config(); // Membaca file .env

// Ambil semua variabel dari .env
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

module.exports = {
  // Blok Development (tanpa tanda kutip di 'development')
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql"
  },
  
  // Blok Test (buat jaga-jaga)
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME + "_test", // database_test
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql"
  },
  
  // Blok Production (buat jaga-jaga)
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME + "_prod", // database_prod
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql"
  }
};