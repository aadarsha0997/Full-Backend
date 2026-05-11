import express from 'express';
import "dotenv/config"
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';
import commentRouter from './routes/commentRoutes.js';

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

BigInt.prototype.toJSON = function () {
  return this.toString();
};

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);


app.listen(PORT, () => {
  console.log(`Server is running`);
});
