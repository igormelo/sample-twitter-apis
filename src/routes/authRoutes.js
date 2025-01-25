const express = require("express");
const passport = require("passport");
const router = express.Router();
const db = require("../db/firebase");

// Iniciar login no Twitter
router.get("/twitter", passport.authenticate("twitter"));

// Callback após autenticação
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: "/login", // Redireciona se falhar
  }),
  async (req, res) => {
    const user = req.user;
    try {
      await db.collection("users").doc(user.id).set({
        username: user.username,
        displayName: user.displayName,
        photos: user.photos,
        provider: user.provider,
      });

      res.json({
        message: "Autenticação bem-sucedida e usuário salvo!",
        user: req.user,
      });
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      res.status(500).json({ error: "Erro ao salvar usuário no Firestore." });
    }
  }
);

module.exports = router;
