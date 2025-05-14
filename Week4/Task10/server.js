import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Joi from 'joi'; // Import Joi for validation

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.join(__dirname, 'users.json');

app.use(express.json());

const userSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name cannot be empty.',
    'string.min': 'Name must be at least 3 characters long.',
    'any.required': 'Name is required.'
  }),
  age: Joi.number().positive().integer().required().messages({
    'number.base': 'Age must be a number.',
    'number.positive': 'Age must be a positive number.',
    'any.required': 'Age is required.'
  })
});


async function readUsers() {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.writeFile(FILE_PATH, '[]');
      return [];
    }
    throw err;
  }
}

async function writeUsers(users) {
  await fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2));
}


app.post('/users', async (req, res) => {
  const { error } = userSchema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  const newUser = req.body;
  newUser.id = Date.now();

  const users = await readUsers();
  users.push(newUser);
  await writeUsers(users);

  res.status(201).json(newUser);
});

app.get('/users', async (req, res) => {
  const users = await readUsers();
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const users = await readUsers();
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: "User not found." });
  res.json(user);
}
);

app.put('/users/:id', async (req, res) => {
  const { error } = userSchema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  const users = await readUsers();
  const index = users.findIndex(u => u.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "User not found." });

  const updated = { ...users[index], ...req.body };
  users[index] = updated;
  await writeUsers(users);

  res.json(updated);
}
);

app.delete('/users/:id', async (req, res) => {
  const users = await readUsers();
  const index = users.findIndex(u => u.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "User not found." });

  const deleted = users.splice(index, 1)[0];
  await writeUsers(users);

  res.json(deleted);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
