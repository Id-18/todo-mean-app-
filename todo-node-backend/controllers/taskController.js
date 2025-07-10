const db = require('../db');

// ✅ GET all tasks
exports.getTasks = (req, res) => {
  db.query('SELECT * FROM tasks ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// ✅ POST a new task
exports.createTask = (req, res) => {
  const task = req.body;
  db.query('INSERT INTO tasks SET ?', task, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, ...task });
  });
};

// ✅ PUT update a task by ID
exports.updateTask = (req, res) => {
  const id = req.params.id;
  const { assignedTo, status, dueDate, priority, comments } = req.body;

  const sql = `UPDATE tasks SET 
    assignedTo = ?, 
    status = ?, 
    dueDate = ?, 
    priority = ?, 
    comments = ? 
    WHERE id = ?`;

  const values = [assignedTo, status, dueDate, priority, comments, id];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "✅ Task updated successfully!" });
  });
};

// ✅ DELETE task by ID
exports.deleteTask = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(204);
  });
};
