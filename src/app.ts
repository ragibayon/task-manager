import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import connectDB from './db/connect';
import taskRoutes from './router/tasks';
import path from 'path';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
// app.use(bodyParser.urlencoded({extended: false}));

// routes
app.use('/api/v1/tasks', taskRoutes);

// db connection
const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`application is listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
