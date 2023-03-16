import express from 'express';
import AllRoutes from './routes/AllRoutes.js';
import bodyParser from 'body-parser';



const app = express();
const port = 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/api', AllRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
