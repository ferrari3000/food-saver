export default function RecipeDetail({ meal, onBack }) {
  return (
    <div className="recipe-detail">
      <button className="back-btn" onClick={onBack}>← Back to results</button>
      <div className="detail-header">
        <div>
          <span className="method-badge method-badge-lg">{meal.cookingMethod}</span>
          <h2>{meal.title}</h2>
          <p className="meta">{meal.servings} servings</p>
        </div>
      </div>
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
  );
}
