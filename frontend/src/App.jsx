import { useState } from 'react';
import IngredientInput from './components/IngredientInput';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import { searchRecipes, getRecipe } from './api';
import './App.css';

export default function App() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState(null);

  function addIngredient(ing) {
    const normalized = ing.toLowerCase();
    if (!ingredients.includes(normalized)) {
      setIngredients(prev => [...prev, normalized]);
    }
  }

  function removeIngredient(ing) {
    setIngredients(prev => prev.filter(i => i !== ing));
  }

  async function handleSearch() {
    setLoading(true);
    setError(null);
    setRecipes([]);
    setSelectedMeal(null);
    try {
      const data = await searchRecipes(ingredients);
      if (!data.meals || data.meals.length === 0) {
        setError('No recipes found for those ingredients. Try adding more!');
      } else {
        setRecipes(data.meals);
      }
    } catch {
      setError('Something went wrong. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }

  async function handleSelectRecipe(id) {
    setDetailLoading(true);
    setError(null);
    try {
      const data = await getRecipe(id);
      setSelectedMeal(data.meal);
    } catch {
      setError('Could not load recipe details.');
    } finally {
      setDetailLoading(false);
    }
  }

  return (
    <div className="app">
      <header>
        <h1>FoodSaver</h1>
        <p>Turn your leftovers into a meal</p>
      </header>
      <main>
        {!selectedMeal ? (
          <>
            <IngredientInput
              ingredients={ingredients}
              onAdd={addIngredient}
              onRemove={removeIngredient}
              onSearch={handleSearch}
              loading={loading}
            />
            {error && <p className="error">{error}</p>}
            {detailLoading && <p className="loading">Loading recipe…</p>}
            <RecipeList recipes={recipes} onSelect={handleSelectRecipe} />
          </>
        ) : (
          <RecipeDetail meal={selectedMeal} onBack={() => setSelectedMeal(null)} />
        )}
      </main>
    </div>
  );
}
