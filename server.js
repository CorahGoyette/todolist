// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Access the controllers for our various entities
const users = require('./controllers/users');
const todos = require('./controllers/todos');
const dbAdmin = require('./controllers/dbAdmin');


dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Register our controller routes
app.use('/users', users());
app.use('/todos', todos());
app.use('/dbAdmin', dbAdmin());


app.get('/', (req, res) => {
    return res.status(200).send({ 'message': 'Welcome to our TODO app' });
});

app.listen(process.env.PORT)
console.log('app running on port ', process.env.PORT);