const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'moew_db',
  password: process.env.DB_PASSWORD || 'postgres',
  port: 5432,
});

app.get('/', (req, res) => {
  res.send('Moew API is running');
});

// TODO: Create Cat CRUD routes here
// app.get('/cats', ...);
// app.post('/cats', ...);
// app.put('/cats/:id', ...);
// app.delete('/cats/:id', ...);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
