const express = require("express");
const db = require("../db/firebase");
const router = express.Router();

// Rota de teste para criar um post
router.post("/posts", async (req, res) => {
  console.log("Dados recebidos:", req.body);
  const { title, description, latitude, longitude } = req.body;

  if (!title || !description || !latitude || !longitude) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
  }

  try {
    const newPost = {
      title,
      description,
      location: {
        latitude,
        longitude,
      },
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection("posts").add(newPost);
    res.status(201).json({ id: docRef.id, message: "Postagem criada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar postagem." });
  }
});

module.exports = router;