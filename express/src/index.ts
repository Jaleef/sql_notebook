import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 9000;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express! I want to learn more about TypeScript.');
});

app.get('/connect', (req: Request, res: Response) => {
  
})
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
