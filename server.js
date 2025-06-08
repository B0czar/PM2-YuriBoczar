// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const routes = require("./routes");
const frontRoutes = require("./routes/frontRoutes");
const pool = require("./config/database");

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// EJS Layouts configuration
app.use(expressLayouts);
app.set("layout", "layout/main");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "assets")));

// Mount front-end routes
app.use("/", frontRoutes);

// Usando as rotas definidas
app.use("/api", routes);

// Teste de conexão com o banco de dados
const testDatabaseConnection = async () => {
    try {
        const client = await pool.connect();
        console.log("Conexão com o banco de dados estabelecida com sucesso!");
        client.release();
    } catch (err) {
        console.error("Erro ao conectar com o banco de dados:", err);
        process.exit(1); // Encerra o servidor se não conseguir conectar ao banco
    }
};

// Inicializa o servidor
const startServer = async () => {
    try {
        await testDatabaseConnection();
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    } catch (err) {
        console.error("Erro ao iniciar o servidor:", err);
        process.exit(1);
    }
};

startServer();
