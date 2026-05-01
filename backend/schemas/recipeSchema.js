const RECIPE_SCHEMA = {
  type: 'object',
  properties: {
    recipes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          cookingMethod: { type: 'string' },
          servings: { type: 'integer' },
          ingredients: { type: 'array', items: { type: 'string' } },
          instructions: { type: 'array', items: { type: 'string' } },
        },
        required: ['id', 'title', 'cookingMethod', 'servings', 'ingredients', 'instructions'],
        additionalProperties: false,
      },
    },
  },
  required: ['recipes'],
  additionalProperties: false,
};

module.exports = RECIPE_SCHEMA;
