const express = require('express');
const Anthropic = require('@anthropic-ai/sdk').default;
const MEALPLAN_SCHEMA = require('../schemas/mealplanSchema');
const router = express.Router();

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a weekly meal planning assistant. Given a user's preferred cooking methods and liked ingredients, create a varied and delicious 5-day dinner meal plan (Monday through Friday). Each meal should use the preferred cooking methods and incorporate the liked ingredients where appropriate. Vary the meals so no method or ingredient is overused. Include practical, clearly written recipes. Return only valid JSON matching the provided schema.`;

router.post('/generate', async (req, res) => {
  const { cookingMethods = [], likedIngredients = [] } = req.body;

  try {
    const userMsg = [
      cookingMethods.length > 0
        ? `My preferred cooking methods: ${cookingMethods.join(', ')}.`
        : 'I am open to any cooking method.',
      likedIngredients.length > 0
        ? `Ingredients I enjoy: ${likedIngredients.join(', ')}.`
        : 'I enjoy a wide variety of ingredients.',
      'Please create a 5-day dinner meal plan for me.',
    ].join(' ');

    const response = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 6000,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content: userMsg }],
      output_config: {
        format: {
          type: 'json_schema',
          name: 'meal_plan',
          schema: MEALPLAN_SCHEMA,
        },
      },
    });

    const data = JSON.parse(response.content[0].text);
    res.json({ plan: data.plan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate meal plan' });
  }
});

module.exports = router;
