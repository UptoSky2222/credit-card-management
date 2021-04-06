const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const reminder = require('./reminder');
// const swaggerDocument = require('./swagger.json');

const { errorHandler } = require('./middlewares/errorHandling');


const PORT = process.env.PORT || 5000;

// middlwares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// importing routes
const authRoute = require('./routes/auth');
const cardRoute = require('./routes/card');


// Routes middlewares
app.use('/api/user', authRoute);
app.use('/api/cards', cardRoute);

// 404 
app.use((req, res) => {
    res.statusCode = 404;
    throw new Error(`404 not found`);
})

// Error Handler
app.use(errorHandler);

reminder();


db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
});
