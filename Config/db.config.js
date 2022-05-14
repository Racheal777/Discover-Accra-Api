//Database configuration
const dotenv = require('dotenv').config()

module.exports = {
    HOST : process.env.Host,
    USER: process.env.Username,
    PASSWORD: process.env.Password,
    DB: process.env.Database,
    dialect: 'postgres',
    PORT: 5433,
    pool: {
        max: 5,
        min: 1,
        acquire: 30000,
        idle: 10000
    }
}



// module.exports = {
//     HOST: "localhost",
//     USER: "postgres",
//     PASSWORD: "59014",
//     DB: "accra",
//     dialect: "postgres",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   };