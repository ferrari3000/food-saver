export default function RecipeList({ recipes, onSelect }) {
  if (recipes.length === 0) return null;

  return (
    <div className="recipe-list">
      <h2>Recipes you can make</h2>
      <div className="recipe-grid">
        {recipes.map(meal => (
          <div key={meal.idMeal} className="recipe-card" onClick={() => onSelect(meal.idMeal)}>
            <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
            <p>{meal.strMeal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
