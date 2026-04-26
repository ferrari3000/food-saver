import { useState } from 'react';

export default function IngredientInput({ ingredients, onAdd, onRemove, onSearch, loading }) {
  const [value, setValue] = useState('');

  function handleKeyDown(e) {
    if ((e.key === 'Enter' || e.key === ',') && value.trim()) {
      e.preventDefault();
      onAdd(value.trim());
      setValue('');
    }
  }

  function handleAdd() {
    if (value.trim()) {
      onAdd(value.trim());
      setValue('');
    }
  }

  return (
    <div className="ingredient-input">
      <h2>What's in your fridge?</h2>
      <div className="input-row">
        <input
          type="text"
          placeholder="Type an ingredient and press Enter"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAdd} disabled={!value.trim()}>Add</button>
      </div>
      <div className="chips">
        {ingredients.map(ing => (
          <span key={ing} className="chip">
            {ing}
            <button onClick={() => onRemove(ing)} aria-label={`Remove ${ing}`}>×</button>
          </span>
        ))}
      </div>
      <button
        className="search-btn"
        onClick={onSearch}
        disabled={ingredients.length === 0 || loading}
      >
        {loading ? 'Searching…' : 'Find Recipes'}
      </button>
    </div>
  );
}
