export default function RecipeList({ recipes, onSelect }) {
  if (recipes.length === 0) return null;

  return (
    <div className="recipe-list">
      <h2>Recipes you can make</h2>
      <div className="recipe-grid">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card" onClick={() => onSelect(recipe.id)}>
            <img src={recipe.image} alt={recipe.title} loading="lazy" />
            <p>{recipe.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
