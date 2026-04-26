const BASE = '/api';

export async function searchRecipes(ingredients) {
  const params = new URLSearchParams({ ingredients: ingredients.join(',') });
  const res = await fetch(`${BASE}/recipes/search?${params}`);
  if (!res.ok) throw new Error('Failed to search recipes');
  return res.json();
}

export async function getRecipe(id) {
  const res = await fetch(`${BASE}/recipes/${id}`);
  if (!res.ok) throw new Error('Failed to fetch recipe');
  return res.json();
}
