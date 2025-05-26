const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
    max: 20,
    idleTimeoutMillis: 60000,
    connectionTimeoutMillis: 30000,
    maxUses: 100000,
    keepAlive: true,
    keepAliveInitialDelayMillis: 10000,
    retry_strategy: function (options) {
        if (options.error) {
            console.error("Database connection error:", options.error);
            return true;
        }
        return false;
    },
});

pool.on("error", (err, client) => {
    console.error("Erro inesperado no pool de conexões:", err);
});

pool.on("connect", (client) => {
    console.log("Nova conexão estabelecida com o banco de dados");
});

pool.on("remove", (client) => {
    console.log("Conexão removida do pool");
});

module.exports = pool;
