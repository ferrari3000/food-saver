const express = require('express');
const Anthropic = require('@anthropic-ai/sdk').default;
const RECIPE_SCHEMA = require('../schemas/recipeSchema');
const router = express.Router();

const SYSTEM_PROMPT = `You are a creative home cooking assistant. When given a list of ingredients, suggest 6–8 delicious recipes that use those ingredients as the main components. You may include basic pantry staples (salt, pepper, oil, garlic, onion, common spices) without listing them as required ingredients. Each recipe should be practical and clearly written for a home cook. Return only valid JSON matching the provided schema.`;

router.post('/search', async (req, res) => {
  const client = new Anthropic();
  const { ingredients } = req.body;
  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: 'ingredients array required' });
  }

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 4096,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [
        {
          role: 'user',
          content: `I have these ingredients: ${ingredients.join(', ')}. What recipes can I make?`,
        },
      ],
      output_config: {
        format: {
          type: 'json_schema',
          schema: RECIPE_SCHEMA,
        },
      },
    });

    const data = JSON.parse(response.content[0].text);
    res.json({ meals: data.recipes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate recipes' });
  }
});

module.exports = router;
