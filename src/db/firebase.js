const admin = require("firebase-admin");
require("dotenv").config(); // Carregar as variáveis de ambiente

// Carregar as credenciais do Firebase Admin SDK
const serviceAccount = require("../config/firebase-config.json"); // Caminho ajustado

// Inicializar o Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Inicializar o Firestore

module.exports = db;
