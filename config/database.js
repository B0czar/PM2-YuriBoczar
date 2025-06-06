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
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    maxUses: 7500,
    keepAlive: true,
    keepAliveInitialDelayMillis: 5000,
});

const handlePoolError = async (err, client) => {
    console.error("Erro no pool de conexões:", err);
    try {
        const newClient = await pool.connect();
        console.log("Nova conexão estabelecida após erro");
        newClient.release();
    } catch (error) {
        console.error("Erro ao tentar reconectar:", error);
    }
};

pool.on("error", handlePoolError);

pool.on("connect", (client) => {
    console.log("Nova conexão estabelecida com o banco de dados");
});

pool.on("remove", (client) => {
    console.log("Conexão removida do pool");
});

module.exports = pool;
