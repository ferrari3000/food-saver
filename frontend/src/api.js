const BASE = '/api';

export async function searchRecipes(ingredients) {
  const res = await fetch(`${BASE}/recipes/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients }),
  });
  if (!res.ok) throw new Error('Failed to search recipes');
  return res.json();
}

export async function sendMealPlanEmail(plan) {
  const res = await fetch(`${BASE}/email/mealplan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan }),
  });
  if (!res.ok) throw new Error('Failed to send email');
  return res.json();
}

export async function generateMealPlan(cookingMethods, likedIngredients) {
  const res = await fetch(`${BASE}/mealplan/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cookingMethods, likedIngredients }),
  });
  if (!res.ok) throw new Error('Failed to generate meal plan');
  return res.json();
}
