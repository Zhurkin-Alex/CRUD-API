import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());

let users: User[] = [];

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

// GET api/users
app.get('/api/users', (req: Request, res: Response) => {
  res.status(200).json(users);
});

// GET api/users/{userId}
app.get('/api/users/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = users.find((user) => user.id === userId);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else {
    res.status(200).json(user);
  }
});

// POST api/users
app.post('/api/users', (req: Request, res: Response) => {
  const { username, age, hobbies } = req.body;
  if (!username || !age) {
    res.status(400).json({ error: 'Username and age are required' });
  } else {
    const newUser: User = {
      id: uuidv4(),
      username,
      age,
      hobbies: hobbies || [],
    };
    users.push(newUser);
    res.status(201).json(newUser);
  }
});

// PUT api/users/{userId}
app.put('/api/users/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  const { username, age, hobbies } = req.body;
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    res.status(404).json({ error: 'User not found' });
  } else if (!username || !age) {
    res.status(400).json({ error: 'Username and age are required' });
  } else {
    users[userIndex] = {
      ...users[userIndex],
      username,
      age,
      hobbies: hobbies || [],
    };
    res.status(200).json(users[userIndex]);
  }
});

// DELETE api/users/{userId}
app.delete('/api/users/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    res.status(404).json({ error: 'User not found' });
  } else {
    users.splice(userIndex, 1);
    res.sendStatus(204);
  }
});

// Handle non-existing endpoints
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Handle server errors
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


export default app;