import bcrypt from 'bcrypt';
import express from 'express';
import cors from 'cors';
import pool from './db.js'
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import multer from 'multer'
import { uploadToS3, GetFromS3 } from '../src/s3.mjs';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// Sign up user
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

// Login in user
app.post('/login', async (req, res) => {
  try {
    // Receive body data
    const { email, password } = req.body;

    // Query db for users with matching email
    const userRes = await pool.query("SELECT * FROM users WHERE email = $1", [email.toLowerCase()]);
    const user = userRes.rows[0];
    console.log(user)

    // If user exists check password
    if (user) {
      const passMatch = await bcrypt.compare(password, user.password);
      if (!passMatch) {
        return res.status(401).json({error: "Invalid Credentials"});
      }

      // Create token
      const secret = crypto.randomBytes(32).toString('hex');
      const token = jwt.sign({ userId: user.uid}, secret)

      const key = user.avatar
      const url = await GetFromS3({ key })
      return res.json({ user, token, url })
    } else {
      return res.status(401).json({error: "Invalid Credentials"});
    }
  } catch (err) {
    return res.status(500).json({error: "Internal Server Error"});
  }
})

// Insert profile information into db
app.put('/profile', async (req, res) => {
  try {
    // Update profile information
    const { name, username, email, prevEmail, avatarKey } = req.body;

    // Query all users with the inputted email or username
    const checker = await pool.query("SELECT * FROM users WHERE (email = $1 OR username = $2) AND email <> $3", [email.toLowerCase(), username.toLowerCase(), prevEmail.toLowerCase()])

    // Check if Email or Username is already in Use
    if (checker.rows.length > 0) {
      if (checker.rows[0].email == email.toLowerCase()) return res.status(401).json({error: "Email Already Registered"});
      else if (checker.rows[0].username == username.toLowerCase()) return res.status(401).json({error: "Username Already in Use"});
    }
    const user = await pool.query("UPDATE users SET name = $1, username = $2, email = $3, avatar = $5 WHERE email = $4 ", [name, username.toLowerCase(), email.toLowerCase(), prevEmail.toLowerCase(), avatarKey])
    return res.json({ user })
  } catch (err) {
    console.log(err);
    return res.status(500).json({error: "Internal Server Error"});
  }
});

// Upload Avatars to S3 Bucket
app.post('/upload', upload.single('avatar'), async (req, res) => {
  try {
    const file = req.file
    const key = req.body.key

    const uid = await uploadToS3({ file, key });
    return res.send({ uid })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Server Error"})
  }
})

app.listen(5000, () => {
  console.log('server on');
})