export default function RecipeList({ recipes, onSelect }) {
  if (recipes.length === 0) return null;

  return (
    <div className="recipe-list">
      <h2>Recipes you can make</h2>
      <div className="recipe-grid">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card" onClick={() => onSelect(recipe)}>
            <div className="recipe-card-body">
              <span className="method-badge">{recipe.cookingMethod}</span>
              <p className="recipe-title">{recipe.title}</p>
              <p className="recipe-servings">{recipe.servings} servings</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
