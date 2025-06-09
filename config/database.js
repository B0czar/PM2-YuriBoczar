const { Pool } = require("pg");
require("dotenv").config();

// Helper to guarantee that env vars do not contain leading/trailing spaces or line-breaks
const env = (key, fallback) => {
    const value = process.env[key];
    if (typeof value === "string") return value.trim();
    return fallback;
};

const pool = new Pool({
    host: env("DB_HOST"),
    port: env("DB_PORT"),
    user: env("DB_USER"),
    password: env("DB_PASSWORD"),
    database: env("DB_DATABASE"),
    // SSL is mandatory on Supabase and other managed Postgres services.
    // When running locally (e.g., with Docker / local Postgres) you can disable it by setting DB_SSL=false.
    ssl: env("DB_SSL", "true") === "true" ? { rejectUnauthorized: false } : false,

    // Pool tuning parameters
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
