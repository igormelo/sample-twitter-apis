require("dotenv").config(); // Carregar as variáveis do .env
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session"); // Importar o módulo express-session
const passport = require("./services/passport"); // Certifique-se de importar o Passport
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const twitterRoutes = require("./routes/twitterRoutes");

const app = express();

// Middlewares
app.use(bodyParser.json()); // Suporte para JSON no corpo da requisição
// Configurar sessões para o Passport
// Inicializar o Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use uma chave segura
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());


// Rotas
app.use("/auth", authRoutes);
app.use("/api", postRoutes);
app.use("/api", twitterRoutes);

// Configurar a porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
