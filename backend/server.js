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
    const { name, password, email, username } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newName = await pool.query("INSERT INTO users (name, password, email, username) VALUES($1, $2, $3, $4) RETURNING *", [name, hashPassword, email, username]);
    const user = newName.rows[0];
    console.log(user)
    const secret = crypto.randomBytes(32).toString('hex');
    const token = jwt.sign({ userId: user.uid}, secret)

    return res.json({ newName, token })
  } catch(err) {
    console.log(err);
    return res.status(500).json({error: "Internal Server Error"});
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userRes = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = userRes.rows[0];
    const passMatch = await bcrypt.compare(password, user.password);

    if (!user || !passMatch) {
      return res.status(401).json({error: "Invalid Credentials"});
    }

    const secret = crypto.randomBytes(32).toString('hex');
    const token = jwt.sign({ userId: user.uid}, secret)

    return res.json({ token })
  } catch (err) {
    console.log(err);
    return res.status(500).json({error: "Internal Server Error"});
  }
})

app.get('/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email])
    res.json(user.rows);
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