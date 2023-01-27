import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

// Frontend using port 3000
const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('Welcome to our api! Here is the pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});