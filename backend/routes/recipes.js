const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const BASE = 'https://api.spoonacular.com';
const KEY = process.env.SPOONACULAR_API_KEY;

router.get('/search', async (req, res) => {
  const { ingredients } = req.query;
  if (!ingredients) return res.status(400).json({ error: 'ingredients query param required' });

  try {
    const params = new URLSearchParams({
      ingredients,
      number: 10,
      ranking: 2,
      ignorePantry: true,
      apiKey: KEY,
    });
    const response = await fetch(`${BASE}/recipes/findByIngredients?${params}`);
    const meals = await response.json();
    res.json({ meals });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const params = new URLSearchParams({ apiKey: KEY });
    const response = await fetch(`${BASE}/recipes/${req.params.id}/information?${params}`);
    const meal = await response.json();
    res.json({ meal });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipe details' });
  }
});

module.exports = router;
