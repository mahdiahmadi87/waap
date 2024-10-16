const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // You can also set '*' to allow all origins, but it's not recommended for production.
}));

const pool = mysql.createPool({
  host: 'localhost',
  user: 'mahdi',
  password: 'password',
  database: 'waap_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.put('/upload', async (req, res) => {
  const body = req.body;

  if (!body.type)
    return res.status(400).json({ error: 'Type is required' });

  if (!["video", "song", "doc", "image"].includes(body.type))
    return res.status(400).json({ error: 'Type should be video or song or doc or image' });

  if (!body.subject)
    return res.status(400).json({ error: 'Subject is required' });

  if (!["program", "image", "video", "podcast", "article"].includes(body.subject))
    return res.status(400).json({ error: 'Subject should be program or image or video or podcast or article' });

  if (!body.title) 
    return res.status(400).json({ error: 'Title is required' });

  if (!body.author.uid) 
    return res.status(400).json({ error: 'Author UID is required' });

  if (!body.link) 
    return res.status(400).json({ error: 'Link is required' });


  const id = uuidv4();
  try {
    const [result] = await pool.execute(
      'INSERT INTO db (id, type, subject, title, author_uid, author_name, author_surname, description, image, link, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, body.type, body.subject, body.title, body.author.uid, body.author.name, body.author.surname, body.description, body.image, body.link, String(new Date().getTime() / 1000)]
    );
    res.status(201).json({ id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving' });
  }
});

app.get('/get', async (req, res) => {
  const query = req.query;
  if (!query) {
      return res.status(400).json({ error: 'Query is required' });
  }

  try {
    let key = Object.keys(query)[0]
    let value = query[key]
    const [rows] = await pool.execute(
      `SELECT id, subject, type, title, author_uid, author_name, author_surname, description, image, link, published FROM db WHERE ${key} = ?`,
      [value]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Not found' });
    }
    rows.forEach((d) => {
      d.author = {
        "uid": d.author_uid,
        "name": d.author_name,
        "surname": d.author_surname
      }
      delete d.author_uid
      delete d.author_name
      delete d.author_surname
    })

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error finding' });
  }
});

app.delete('/delete', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  try {
    const [result] = await pool.execute(
      'DELETE FROM db WHERE id = ?',
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
