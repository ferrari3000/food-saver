import { useState, useEffect } from 'react';
import { generateMealPlan } from '../api';

const COOKING_METHODS = [
  'Baked', 'Grilled', 'Pan-fried', 'Stir-fry',
  'Slow Cooker', 'Roasted', 'Steamed', 'Air Fryer', 'Dutch Oven'
];

function loadPrefs() {
  try {
    return JSON.parse(localStorage.getItem('mealPlannerPrefs') || '{}');
  } catch {
    return {};
  }
}

export default function MealPlanner() {
  const saved = loadPrefs();
  const [cookingMethods, setCookingMethods] = useState(saved.cookingMethods ?? []);
  const [likedIngredients, setLikedIngredients] = useState(saved.likedIngredients ?? []);
  const [inputValue, setInputValue] = useState('');
  const [plan, setPlan] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mealPlan') || 'null'); } catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    localStorage.setItem('mealPlannerPrefs', JSON.stringify({ cookingMethods, likedIngredients }));
  }, [cookingMethods, likedIngredients]);

  function toggleMethod(method) {
    setCookingMethods(prev =>
      prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method]
    );
  }

  function addIngredient(e) {
    e.preventDefault();
    const val = inputValue.trim().toLowerCase();
    if (val && !likedIngredients.includes(val)) {
      setLikedIngredients(prev => [...prev, val]);
    }
    setInputValue('');
  }

  function removeIngredient(ing) {
    setLikedIngredients(prev => prev.filter(i => i !== ing));
  }

  function toggleDay(day) {
    setExpanded(prev => ({ ...prev, [day]: !prev[day] }));
  }

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    try {
      const data = await generateMealPlan(cookingMethods, likedIngredients);
      setPlan(data.plan);
      localStorage.setItem('mealPlan', JSON.stringify(data.plan));
      setExpanded({});
    } catch {
      setError('Could not generate meal plan. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="meal-planner">
      <section className="prefs-section">
        <h2>Your Preferences</h2>

        <div className="pref-group">
          <h3>Cooking Methods</h3>
          <div className="method-toggles">
            {COOKING_METHODS.map(m => (
              <button
                key={m}
                className={`method-toggle${cookingMethods.includes(m) ? ' selected' : ''}`}
                onClick={() => toggleMethod(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="pref-group">
          <h3>Ingredients You Like</h3>
          <form className="input-row" onSubmit={addIngredient}>
            <input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="e.g. chicken, broccoli..."
            />
            <button type="submit" disabled={!inputValue.trim()}>Add</button>
          </form>
          <div className="chips">
            {likedIngredients.map(ing => (
              <span key={ing} className="chip">
                {ing}
                <button onClick={() => removeIngredient(ing)} aria-label={`Remove ${ing}`}>×</button>
              </span>
            ))}
          </div>
        </div>

        <button
          className="search-btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Generating your week…' : 'Generate My Week'}
        </button>
        {error && <p className="error">{error}</p>}
      </section>

      {plan && (
        <section className="plan-section">
          <h2>This Week's Dinners</h2>
          <div className="plan-list">
            {plan.map(meal => (
              <div key={meal.day} className="day-card">
                <button className="day-card-header" onClick={() => toggleDay(meal.day)}>
                  <div className="day-card-summary">
                    <span className="day-label">{meal.day}</span>
                    <span className="method-badge">{meal.cookingMethod}</span>
                    <span className="day-title">{meal.title}</span>
                  </div>
                  <span className="expand-icon">{expanded[meal.day] ? '▲' : '▼'}</span>
                </button>
                {expanded[meal.day] && (
                  <div className="day-card-body">
                    <p className="servings-note">{meal.servings} servings</p>
                    <div className="detail-body">
                      <section>
                        <h3>Ingredients</h3>
                        <ul>
                          {meal.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                        </ul>
                      </section>
                      <section>
                        <h3>Instructions</h3>
                        {meal.instructions.map((step, i) => (
                          <p key={i}><strong>{i + 1}.</strong> {step}</p>
                        ))}
                      </section>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
