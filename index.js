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
    res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>One Page Website</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        header {
            background-color: #333;
            color: #fff;
            padding: 10px 0;
            text-align: center;
        }

        nav {
            display: flex;
            justify-content: center;
            background-color: #444;
            padding: 10px;
        }

        nav a {
            color: #fff;
            text-decoration: none;
            margin: 0 15px;
            font-size: 18px;
        }

        nav a:hover {
            text-decoration: underline;
        }

        section {
            padding: 50px;
            background-color: #fff;
            margin: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        #home {
            background-color: #e8f4f8;
        }

        #about {
            background-color: #f8e8f4;
        }

        #settings {
            background-color: #e8f8e4;
        }

        #login {
            background-color: #f8f4e8;
        }

        #signup {
            background-color: #e8e4f8;
        }

        footer {
            text-align: center;
            padding: 20px;
            background-color: #333;
            color: #fff;
        }
    </style>
</head>
<body>

    <header>
        <h1>My One Page Website</h1>
    </header>

    <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#settings">Settings</a>
        <a href="#login">Login</a>
        <a href="#signup">Signup</a>
    </nav>

    <section id="home">
        <h2>Home</h2>
        <p>Welcome to our website! Explore the different sections to learn more about what we offer.</p>
    </section>

    <section id="about">
        <h2>About Us</h2>
        <p>We are a team of passionate individuals dedicated to providing the best service to our customers. Our mission is to create value and make a difference.</p>
    </section>

    <section id="settings">
        <h2>Settings</h2>
        <p>Manage your account settings here. You can update your preferences and configure your experience.</p>
    </section>

    <section id="login">
        <h2>Login</h2>
        <p>Please enter your login credentials to access your account.</p>
        <form>
            <label for="username">Username:</label><br>
            <input type="text" id="username" name="username"><br><br>
            <label for="password">Password:</label><br>
            <input type="password" id="password" name="password"><br><br>
            <input type="submit" value="Login">
        </form>
    </section>

    <section id="signup">
        <h2>Signup</h2>
        <p>Create a new account by filling out the form below.</p>
        <form>
            <label for="new-username">Username:</label><br>
            <input type="text" id="new-username" name="new-username"><br><br>
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email"><br><br>
            <label for="new-password">Password:</label><br>
            <input type="password" id="new-password" name="new-password"><br><br>
            <input type="submit" value="Signup">
        </form>
    </section>

    <footer>
        <p>&copy; 2024 My One Page Website. All rights reserved.</p>
    </footer>

</body>
</html>
`);
});

// Start Server
app.listen(port, () => {
    console.log("Server is running on localhost:" + port);
});
