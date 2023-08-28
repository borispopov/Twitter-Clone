import bcrypt from 'bcrypt';
import express from 'express';
import cors from 'cors';
import pool from './db.js'
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import multer from 'multer'
import { uploadToS3, GetFromS3 } from '../src/s3.mjs';
import { v4 as uuid } from 'uuid'

const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// Sign up user
app.post('/signup', async (req, res) => {
  try {
    const { name, password, email, username } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const checker = await pool.query("SELECT * FROM users WHERE email = $1 OR username = $2", [email.toLowerCase(), username.toLowerCase()])

    if (checker.rows.length > 0) {
      if (checker.rows[0].email == email.toLowerCase()) return res.status(401).json({error: "Email Already Registered"});
      else if (checker.rows[0].username == username.toLowerCase()) return res.status(401).json({error: "Username Already in Use"});
    }

    const newUser = await pool.query("INSERT INTO users (name, password, email, username) VALUES($1, $2, $3, $4) RETURNING *", [name, hashPassword, email.toLowerCase(), username.toLowerCase()]);
    const user = newUser.rows[0];
    const secret = crypto.randomBytes(32).toString('hex');
    const token = jwt.sign({ userId: user.uid}, secret)
    console.log('signed up: ', user.email)

    return res.json({ user, newUser, token })
  } catch(err) {
    console.log(err);
    return res.status(500).json({error: "Internal Server Error"});
  }
});

// Login in user
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userRes = await pool.query("SELECT * FROM users WHERE email = $1", [email.toLowerCase()]);
    const user = userRes.rows[0];
    console.log('logged in: ', user.email)

    if (user) {
      const passMatch = await bcrypt.compare(password, user.password);
      if (!passMatch) {
        return res.status(401).json({error: "Invalid Credentials"});
      }

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
    const { name, username, email, prevEmail, avatarKey } = req.body;

    const checker = await pool.query("SELECT * FROM users WHERE (email = $1 OR username = $2) AND email <> $3", [email.toLowerCase(), username.toLowerCase(), prevEmail.toLowerCase()])

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
    const key = "Avatars/" + req.body.key

    const uid = await uploadToS3({ file, key });
    return res.send({ uid })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Server Error"})
  }
})

app.post('/post', upload.single('image'), async (req, res) => {
  try {
    const file = req.file
    const uid = req.body.key
    const description = req.body.description
    const likes = 0
    const pid = uuid()

    let id = ''
    if (file) {
      const key = "Posts/" + uid + "/" + pid
      id = await uploadToS3({ file, key });
    }

    const response = await pool.query("INSERT INTO posts (uid, image, description, likes, timestamp, pid) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [uid, id, description, likes, parseInt(Date.now()), pid])
    return res.json({ response })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Server Error"})
  }
})

app.get('/posts', async (req, res) => {
  try {
    let num = parseInt(req.query.num)
    const query = req.query.query
    let posts;
    if (num != 0) {
      num = 'LIMIT '+ num
    } else {
      num = ''
    }
    switch (true) {
      case query == "likes":
        posts = await pool.query("SELECT * FROM posts ORDER BY likes DESC "+ num);
        break;
      case typeof query === "number":
        posts = await pool.query("SELECT * FROM posts WHERE uuid = "+ query + " ORDER BY timestamp DESC "+ num);
        break;
      default:
        posts = await pool.query("SELECT * FROM posts ORDER BY timestamp DESC "+ num);
        break;
    }
    let post = [];
    if (num < 1) num = posts.rows.length;
    for (let i = 0; i < num; i++) {
      const key = posts.rows[i].image
      const uid = posts.rows[i].uid
      const pid = posts.rows[i].pid
      const poster = await pool.query("SELECT name, username, avatar FROM users WHERE uid = " + uid)
      const avatar = poster.rows[0].avatar
      post.push({ image: await GetFromS3({ key }), name: poster.rows[0].name, username: poster.rows[0].username, pid: pid,
                  avatar: await GetFromS3({ key: avatar }), description: posts.rows[i].description,  timestamp: posts.rows[i].timestamp,
                  likes: posts.rows[i].likes })
    }
    return res.json({ post })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Server Error" })
  }
})

app.post('/like', async (req, res) => {
  try {
    const response = await pool.query('UPDATE posts SET likes = likes + 1 WHERE pid = $1 RETURNING likes', [req.body.pid]);
    return res.json({ likes: response.rows[0].likes })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Server Error" })
  }

})

app.listen(5000, () => {
  console.log('server on');
})