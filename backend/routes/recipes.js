const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const BASE = 'https://www.themealdb.com/api/json/v1/1';

router.get('/search', async (req, res) => {
  const { ingredients } = req.query;
  if (!ingredients) return res.status(400).json({ error: 'ingredients query param required' });

  const list = ingredients.split(',').map(s => s.trim()).filter(Boolean);

  try {
    const results = await Promise.all(
      list.map(ing =>
        fetch(`${BASE}/filter.php?i=${encodeURIComponent(ing)}`)
          .then(r => r.json())
          .then(data => data.meals || [])
      )
    );

    // Score meals by how many queried ingredients they match
    const scoreMap = {};
    for (const meals of results) {
      for (const meal of meals) {
        if (!scoreMap[meal.idMeal]) {
          scoreMap[meal.idMeal] = { meal, score: 0 };
        }
        scoreMap[meal.idMeal].score += 1;
      }
    }

    const sorted = Object.values(scoreMap)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(({ meal }) => meal);

    res.json({ meals: sorted });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const response = await fetch(`${BASE}/lookup.php?i=${req.params.id}`);
    const data = await response.json();
    const meal = data.meals?.[0] ?? null;
    if (!meal) return res.status(404).json({ error: 'Recipe not found' });
    res.json({ meal });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipe details' });
  }
});

module.exports = router;
