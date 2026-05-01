const MEALPLAN_SCHEMA = {
  type: 'object',
  properties: {
    plan: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          day: { type: 'string' },
          title: { type: 'string' },
          cookingMethod: { type: 'string' },
          servings: { type: 'integer' },
          ingredients: { type: 'array', items: { type: 'string' } },
          instructions: { type: 'array', items: { type: 'string' } },
        },
        required: ['day', 'title', 'cookingMethod', 'servings', 'ingredients', 'instructions'],
        additionalProperties: false,
      },
    },
  },
  required: ['plan'],
  additionalProperties: false,
};

module.exports = MEALPLAN_SCHEMA;
