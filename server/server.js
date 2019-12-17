require('dotenv').config({path: __dirname + '/.env'});
console.log(require('dotenv').config({debig: true}));
const express = require('express');
const app = express();

const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");


const port = process.env.PORT || 5000;
app.use('/', express.static(path.join(__dirname, 'build')));

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
});

const registerRouter = require('./routes/register');
app.use('/register', registerRouter);

const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const productsRouter = require('./routes/products');
app.use('/products', productsRouter);

const reviewsRouter = require('./routes/reviews');
app.use('/reviews', reviewsRouter);

// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build/'))
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});