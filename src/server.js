import express from 'express';
import "dotenv/config"
import movieRouter from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use('/user', movieRouter);
app.listen(PORT, () => {
  console.log(`Server is running`);
});
