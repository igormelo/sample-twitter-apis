const express = require("express");
const twitterClient = require("../config/twitter-config");
const router = express.Router();

router.get("/tweets/nearby", async (req, res) => {
  const { lat, lng, query, radius = "10km" } = req.query;

  if (!lat || !lng || !query) {
    return res
      .status(400)
      .json({ error: "Latitude, longitude e query são obrigatórias!" });
  }

  try {
    const tweets = await twitterClient.v2.search(
      `${query} point_radius:[${lng} ${lat} ${radius}]`,
      {
        expansions: ["geo.place_id"],
        "place.fields": ["geo"],
        max_results: 50,
      }
    );

    // Retornar os tweets encontrados
    res.json({
      message: "Tweets encontrados com sucesso!",
      data: tweets,
    });
  } catch (error) {
    console.error("Erro ao buscar tweets:", error);
    res.status(500).json({ error: "Erro ao buscar tweets." });
  }
});

router.get("/tweets/friends", async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(400)
        .json({ error: "User not authenticated correctly." });
    }
    const userId = req.user.id;
    const friends = await twitterClient.v2.following(userId, {
      max_results: 100,
    });

    if (!friends || !friends.data) {
      return res.status(404).json({ error: "Friends not found" });
    }
    const friendIds = friends.data.map((friend) => friend.id);

    const tweets = [];
    for (const friendId of friendIds) {
      const userTweets = await twitterClient.v2.userTimeline(friendId, {
        max_results: 5,
      });
      if (userTweets && userTweets.data) {
        tweets.push(...userTweets.data);
      }
    }

    res.json({
      message: "Friends' tweets successfully retrieved!",
    });
  } catch (error) {
    console.error("Error when searching for friends' tweets:", error);
    res.status(500).json({ error: "Error when searching for friends' tweets." });
  }
});

module.exports = router;
