const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');
const pool = require('./db')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/signup', async (req, res) => {
  try {
    // Receive body data
    const { name, password, email, username } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    // Query all users with the inputted email or username
    const checker = await pool.query("SELECT * FROM users WHERE email = $1 OR username = $2", [email.toLowerCase(), username.toLowerCase()])

    // Check if Email or Username is already in Use
    if (checker.rows.length > 0) {
      if (checker.rows[0].email == email.toLowerCase()) return res.status(401).json({error: "Email Already Registered"});
      else if (checker.rows[0].username == username.toLowerCase()) return res.status(401).json({error: "Username Already in Use"});
    }

    // Post new user data into db and create token
    const newUser = await pool.query("INSERT INTO users (name, password, email, username) VALUES($1, $2, $3, $4) RETURNING *", [name, hashPassword, email.toLowerCase(), username.toLowerCase()]);
    const user = newUser.rows[0];
    const secret = crypto.randomBytes(32).toString('hex');
    const token = jwt.sign({ userId: user.uid}, secret)

    return res.json({ user, newUser, token })
  } catch(err) {
    console.log(err);
    return res.status(500).json({error: "Internal Server Error"});
  }
});

app.post('/login', async (req, res) => {
  try {
    // Receive body data
    const { email, password } = req.body;

    // Query db for users with matching email
    const userRes = await pool.query("SELECT * FROM users WHERE email = $1", [email.toLowerCase()]);
    const user = userRes.rows[0];

    // If user exists check password
    if (user) {
      const passMatch = await bcrypt.compare(password, user.password);
      if (!passMatch) {
        return res.status(401).json({error: "Invalid Credentials"});
      }

      // Create token
      const secret = crypto.randomBytes(32).toString('hex');
      const token = jwt.sign({ userId: user.uid}, secret)

      return res.json({ user, token })
    } else {
      return res.status(401).json({error: "Invalid Credentials"});
    }
  } catch (err) {
    return res.status(500).json({error: "Internal Server Error"});
  }
})

app.get('/user/:email', async (req, res) => {
  try {
    // Query users with matching email
    const { email } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email.toLowerCase()])
    res.json(user.rows);

    // If user not found returns error
    if (user.rows.length < 1) {
      return res.status(401).json({error: "User Not Found"});
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({error: "Internal Server Error"});
  }
});

app.listen(5000, () => {
  console.log('server on');
})