// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");
const pool = require("./config/database");

const app = express();
const port = process.env.PORT || 3000;

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Middleware de erro global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
    });
});

// Rotas da API
app.use("/api", routes);

// Rotas do frontend
app.get("/", (req, res) => {
    res.render('pages/home');
});

app.get("/tasks", (req, res) => {
    res.render('pages/tasks');
});

app.get("/categories", (req, res) => {
    res.render('pages/categories');
});

app.get("/users", (req, res) => {
    res.render('pages/users');
});

// Rota 404
app.use((req, res) => {
    res.status(404).render('pages/404');
});

// Teste de conexão com o banco de dados
const testDatabaseConnection = async () => {
    try {
        const client = await pool.connect();
        console.log("Conexão com o banco de dados estabelecida com sucesso!");
        client.release();
    } catch (err) {
        console.error("Erro ao conectar com o banco de dados:", err);
        process.exit(1);
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
