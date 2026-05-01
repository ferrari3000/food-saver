import { useState } from 'react';
import IngredientInput from './components/IngredientInput';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import MealPlanner from './components/MealPlanner';
import headerLogo from './assets/daniel-6qtE-gJIZ90-unsplash.jpg';
import { searchRecipes } from './api';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('search');

  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="app">
      <header style={{ backgroundImage: `url(${headerLogo})` }}>
        <div className="header-overlay">
          <h1>FoodSaver</h1>
          <p>Turn your leftovers into a meal</p>
        </div>
      </header>
      <nav className="tab-bar">
        <button
          className={`tab-btn${activeTab === 'search' ? ' active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          Search
        </button>
        <button
          className={`tab-btn${activeTab === 'planner' ? ' active' : ''}`}
          onClick={() => setActiveTab('planner')}
        >
          Meal Planner
        </button>
      </nav>
      <main>
        {activeTab === 'search' && (
          <>
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
                {loading && <p className="loading">Asking Claude for recipes…</p>}
                <RecipeList recipes={recipes} onSelect={setSelectedMeal} />
              </>
            ) : (
              <RecipeDetail meal={selectedMeal} onBack={() => setSelectedMeal(null)} />
            )}
          </>
        )}
        {activeTab === 'planner' && <MealPlanner />}
      </main>
    </div>
  );
}
