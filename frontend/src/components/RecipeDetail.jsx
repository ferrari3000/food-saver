export default function RecipeDetail({ meal, onBack }) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push(`${measure ? measure.trim() + ' ' : ''}${ing.trim()}`);
    }
  }

  return (
    <div className="recipe-detail">
      <button className="back-btn" onClick={onBack}>← Back to results</button>
      <div className="detail-header">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <div>
          <h2>{meal.strMeal}</h2>
          <p className="meta">
            {meal.strCategory && <span>{meal.strCategory}</span>}
            {meal.strArea && <span>{meal.strArea}</span>}
          </p>
          {meal.strYoutube && (
            <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="yt-link">
              Watch on YouTube
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
          {meal.strInstructions.split('\r\n').filter(Boolean).map((step, i) => (
            <p key={i}>{step}</p>
          ))}
        </section>
      </div>
    </div>
  );
}
