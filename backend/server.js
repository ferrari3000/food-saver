const express = require('express');
const cors = require('cors');
const recipesRouter = require('./routes/recipes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/recipes', recipesRouter);

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
