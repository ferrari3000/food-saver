---
name: FoodSaver Project State
description: Current state of the FoodSaver app — stack, features, how to run, key files
type: project
---

FoodSaver is a personal recipe and meal planning app powered by the Anthropic API (claude-opus-4-7).

## Stack
- **Frontend**: React + Vite, running on port 5173
- **Backend**: Node.js + Express (CommonJS), running on port 3001
- **AI**: Anthropic SDK (`@anthropic-ai/sdk`), structured JSON output via `output_config.format`

## How to run
- Backend: `cd backend && npm run dev` (uses `node --watch`)
- Frontend: `cd frontend && npm run dev`
- Vite proxies `/api` → `http://localhost:3001`

## Features
### Tab 1 — Search
- User adds ingredients as chips
- POST `/api/recipes/search` → Claude returns 6–8 recipes with full ingredients + instructions
- Recipe cards show cooking method badge (no images)
- Click card → inline detail view (no second API call, full data already in card)

### Tab 2 — Meal Planner
- Cooking method toggle chips (Baked, Grilled, Pan-fried, Stir-fry, Slow Cooker, Roasted, Steamed, Air Fryer, Dutch Oven)
- Liked ingredients chip input
- Preferences persist to localStorage
- "Generate My Week" → POST `/api/mealplan/generate` → 5-day dinner plan
- Day cards are expandable; plan persists to localStorage

## Header
- Full-width hero image (240px tall, border-radius: 20px)
- Image set via `backgroundImage` inline style from imported asset
- Dark gradient overlay from bottom; white title text over it
- Image file: `frontend/src/assets/daniel-6qtE-gJIZ90-unsplash.jpg` (Unsplash, free use)
- Background color of page: #f5f5f0 (warm off-white)

## Key files
- `backend/routes/recipes.js` — Claude recipe search (POST /search)
- `backend/routes/mealplan.js` — Claude meal plan generation (POST /generate)
- `backend/schemas/recipeSchema.js` — JSON schema for recipe output
- `backend/schemas/mealplanSchema.js` — JSON schema for meal plan output
- `frontend/src/api.js` — fetch helpers (searchRecipes, generateMealPlan)
- `frontend/src/components/MealPlanner.jsx` — full meal planner UI
- `frontend/src/App.css` — all styles

## API key
- Stored in `backend/.env` as `ANTHROPIC_API_KEY`
- `.env` is in `.gitignore` — never committed
- Anthropic API is billed separately from Claude.ai subscription (~$0.01–0.05/request with Opus)

## Notes
- Anthropic client is instantiated inside each route handler (not at module level) to avoid env timing issues
- `output_config.format` does NOT accept a `name` field — omit it
- Backend is explicitly CommonJS (`"type": "commonjs"` in package.json)
