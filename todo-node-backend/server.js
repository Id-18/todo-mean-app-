// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/tasks', taskRoutes);

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
