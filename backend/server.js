require('dotenv').config();
const express = require('express');
const cors = require('cors');
const recipesRouter = require('./routes/recipes');
const mealplanRouter = require('./routes/mealplan');
const emailRouter = require('./routes/email');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/recipes', recipesRouter);
app.use('/api/mealplan', mealplanRouter);
app.use('/api/email', emailRouter);

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
