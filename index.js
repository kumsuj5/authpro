// const express = require("express");
// const mongoose = require("mongoose");
// // const bodyParser = require('body-parser');
// const port = process.env.PORT || 3000;
// const app = express();


// mongoose.connect('mongodb+srv://kumsuj5:8953729002@authpro.9mh0h.mongodb.net/?retryWrites=true&w=majority&appName=authpro');
// mongoose.connection.on('error', err => {
//     console.log("connection failed vks");
// });
// mongoose.connection.on('connected', () => {
//     console.log("connected to mongoose");
// });

// app.listen(port, () => {
//     console.log("Server is running on localhost " + port);
// });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();

const port = process.env.PORT || 3000;
console.log(process.env.PORT)

// Middleware
app.use(bodyParser.json()); 

// Database Connection
mongoose.connect('mongodb+srv://kumsuj5:8953729002@authpro.9mh0h.mongodb.net/?retryWrites=true&w=majority&appName=authpro', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});

mongoose.connection.on('error', err => {
    console.log("Connection failed: ", err);
});

mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});
app.use(bodyParser.json());
// Routes
app.use('/api/v1/', productRoutes);
app.use('/api/v1/', authRoutes);

app.use('/', (req, res, next) => {
    res.status(200).send("har har mahadev");
});

// Start Server
app.listen(port, () => {
    console.log("Server is running on localhost:" + port);
});
