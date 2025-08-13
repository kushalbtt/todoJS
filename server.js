import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// In-memory storage (in real apps, use a database)
let todos = [];

// API Routes
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    const { task } = req.body;
    if (!task || task.trim() === '') {
        return res.status(400).json({ error: 'Task cannot be empty' });
    }
    
    todos.push(task.trim());
    res.json({ message: 'Task added successfully', todos });
});

app.delete('/api/todos/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index < 0 || index >= todos.length) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    const deletedTask = todos.splice(index, 1)[0];
    res.json({ message: 'Task deleted successfully', deletedTask, todos });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📱 Open your browser and go to: http://localhost:${PORT}`);
}); 