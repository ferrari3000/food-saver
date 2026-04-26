export default function RecipeDetail({ meal, onBack }) {
  const ingredients = meal.extendedIngredients?.map(i => i.original) ?? [];

  const steps = meal.analyzedInstructions?.[0]?.steps ?? [];
  const fallbackInstructions = meal.instructions
    ? meal.instructions.replace(/<[^>]+>/g, '').split(/\n+/).filter(Boolean)
    : [];

  return (
    <div className="recipe-detail">
      <button className="back-btn" onClick={onBack}>← Back to results</button>
      <div className="detail-header">
        <img src={meal.image} alt={meal.title} />
        <div>
          <h2>{meal.title}</h2>
          <p className="meta">
            {meal.dishTypes?.[0] && <span>{meal.dishTypes[0]}</span>}
            {meal.cuisines?.[0] && <span>{meal.cuisines[0]}</span>}
          </p>
          {meal.sourceUrl && (
            <a href={meal.sourceUrl} target="_blank" rel="noreferrer" className="yt-link">
              View Original Recipe
            </a>
          )}
        </div>
      </div>
      <div className="detail-body">
        <section>
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
          </ul>
        </section>
        <section>
          <h3>Instructions</h3>
          {steps.length > 0
            ? steps.map(s => <p key={s.number}><strong>{s.number}.</strong> {s.step}</p>)
            : fallbackInstructions.map((line, i) => <p key={i}>{line}</p>)
          }
        </section>
      </div>
    </div>
  );
}
