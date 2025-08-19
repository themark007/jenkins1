// index.js
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage
let todos = [];
let currentId = 1;

// HTML with embedded CSS
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced Todo App</title>
    <style>
        :root {
            --primary: #2563eb;
            --secondary: #8b5cf6;
            --accent: #ec4899;
            --dark: #1e293b;
            --light: #f8fafc;
            --success: #10b981;
            --warning: #f59e0b;
            --error: #ef4444;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            margin-bottom: 2rem;
            color: white;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .todo-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
            border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .input-group {
            display: flex;
            gap: 10px;
            margin-bottom: 1.5rem;
        }

        .todo-input {
            flex: 1;
            padding: 15px 20px;
            border: none;
            border-radius: 50px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            font-size: 1rem;
            outline: none;
            transition: all 0.3s ease;
        }

        .todo-input::placeholder {
            color: rgba(255, 255, 255, 0.7);
        }

        .todo-input:focus {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .add-btn {
            padding: 15px 25px;
            border: none;
            border-radius: 50px;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .add-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        .todos-container {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .todo-item {
            display: flex;
            align-items: center;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 15px;
            transition: all 0.3s ease;
            animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .todo-item:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateX(5px);
        }

        .todo-text {
            flex: 1;
            color: white;
            font-size: 1.1rem;
        }

        .todo-completed .todo-text {
            text-decoration: line-through;
            opacity: 0.7;
        }

        .action-btn {
            padding: 8px 15px;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-left: 0.5rem;
        }

        .complete-btn {
            background: var(--success);
            color: white;
        }

        .delete-btn {
            background: var(--error);
            color: white;
        }

        .stats {
            color: white;
            text-align: center;
            margin-top: 2rem;
            font-size: 1.2rem;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        }

        @media (max-width: 600px) {
            .input-group {
                flex-direction: column;
            }
            
            .todo-input {
                margin-bottom: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Advanced Todo App</h1>
            <p>Manage your tasks in style</p>
        </div>

        <div class="todo-card">
            <div class="input-group">
                <input type="text" class="todo-input" placeholder="Enter new task..." id="todoInput">
                <button class="add-btn" onclick="addTodo()">Add Todo</button>
            </div>

            <div class="todos-container" id="todosContainer"></div>
        </div>

        <div class="stats">
            Total todos: <span id="totalCount">0</span> | 
            Completed: <span id="completedCount">0</span>
        </div>
    </div>

    <script>
        let todos = [];

        async function fetchTodos() {
            const response = await fetch('/todos');
            todos = await response.json();
            renderTodos();
        }

        async function addTodo() {
            const input = document.getElementById('todoInput');
            const text = input.value.trim();
            
            if (text) {
                await fetch('/todos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text })
                });
                
                input.value = '';
                await fetchTodos();
            }
        }

        async function toggleTodo(id) {
            await fetch(\`/todos/\${id}/toggle\`, { method: 'PUT' });
            await fetchTodos();
        }

        async function deleteTodo(id) {
            await fetch(\`/todos/\${id}\`, { method: 'DELETE' });
            await fetchTodos();
        }

        function renderTodos() {
            const container = document.getElementById('todosContainer');
            const totalCount = document.getElementById('totalCount');
            const completedCount = document.getElementById('completedCount');
            
            container.innerHTML = '';
            totalCount.textContent = todos.length;
            completedCount.textContent = todos.filter(t => t.completed).length;

            todos.forEach(todo => {
                const todoEl = document.createElement('div');
                todoEl.className = \`todo-item \${todo.completed ? 'todo-completed' : ''}\`;
                todoEl.innerHTML = \`
                    <span class="todo-text">\${todo.text}</span>
                    <button class="action-btn complete-btn" onclick="toggleTodo(\${todo.id})">
                        \${todo.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteTodo(\${todo.id})">
                        Delete
                    </button>
                \`;
                container.appendChild(todoEl);
            });
        }

        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTodo();
        });

        fetchTodos();
    </script>
</body>
</html>
`;

// Routes
app.get('/', (req, res) => {
  res.send(htmlContent);
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const todo = {
    id: currentId++,
    text: req.body.text,
    completed: false,
    createdAt: new Date()
  };
  todos.push(todo);
  res.json(todo);
});

app.put('/todos/:id/toggle', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (todo) {
    todo.completed = !todo.completed;
    res.json(todo);
  } else {
    res.status(404).send('Todo not found');
  }
});

app.delete('/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index !== -1) {
    todos.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send('Todo not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
