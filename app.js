const express = require('express');
const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

// تنظیمات اتصال به دیتابیس
const pool = mysql.createPool({
  host: 'localhost',
  user: '',
  password: '',
  database: 'waap_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// videos
app.put('/videos/upload', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'video URL is required' });
  }

  const id = uuidv4();
  try {
    const [result] = await pool.execute(
      'INSERT INTO videos (id, url) VALUES (?, ?)',
      [id, url]
    );
    res.status(201).json({ id, url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error saving video' });
  }
});

app.get('/videos', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'video ID is required' });
  }

  try {
    const [rows] = await pool.execute(
      'SELECT url FROM videos WHERE id = ?',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'video not found' });
    }
    res.json({ url: rows[0].url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error finding video' });
  }
});

app.get('/videos/all', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT id, url FROM videos');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error finding videos' });
  }
});

app.delete('/videos/delete', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'video ID is required' });
  }

  try {
    const [result] = await pool.execute(
      'DELETE FROM videos WHERE id = ?',
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'video not found' });
    }
    res.json({ message: 'video deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error deleting video' });
  }
});


// Song
app.put('/songs/upload', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'song URL is required' });
  }

  const id = uuidv4();
  try {
    const [result] = await pool.execute(
      'INSERT INTO songs (id, url) VALUES (?, ?)',
      [id, url]
    );
    res.status(201).json({ id, url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error saving song' });
  }
});

app.get('/songs', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'song ID is required' });
  }

  try {
    const [rows] = await pool.execute(
      'SELECT url FROM songs WHERE id = ?',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'song not found' });
    }
    res.json({ url: rows[0].url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error finding song' });
  }
});

app.get('/songs/all', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT id, url FROM songs');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error finding songs' });
  }
});

app.delete('/songs/delete', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'song ID is required' });
  }

  try {
    const [result] = await pool.execute(
      'DELETE FROM songs WHERE id = ?',
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'song not found' });
    }
    res.json({ message: 'song deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error deleting song' });
  }
});


// docs
app.put('/docs/upload', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'doc URL is required' });
  }

  const id = uuidv4();
  try {
    const [result] = await pool.execute(
      'INSERT INTO docs (id, url) VALUES (?, ?)',
      [id, url]
    );
    res.status(201).json({ id, url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error saving doc' });
  }
});

app.get('/docs', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'doc ID is required' });
  }

  try {
    const [rows] = await pool.execute(
      'SELECT url FROM docs WHERE id = ?',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'doc not found' });
    }
    res.json({ url: rows[0].url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error finding doc' });
  }
});

app.get('/docs/all', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT id, url FROM docs');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error finding docs' });
  }
});

app.delete('/docs/delete', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'doc ID is required' });
  }

  try {
    const [result] = await pool.execute(
      'DELETE FROM docs WHERE id = ?',
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'doc not found' });
    }
    res.json({ message: 'doc deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error deleting doc' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});

/* Run these commands before running the APIs: 

CREATE DATABASE waap_db;
USE waap_db;
CREATE TABLE videos (
  id VARCHAR(36) PRIMARY KEY,
  url TEXT NOT NULL
);
CREATE TABLE songs (
  id VARCHAR(36) PRIMARY KEY,
  url TEXT NOT NULL
);
CREATE TABLE docs (
  id VARCHAR(36) PRIMARY KEY,
  url TEXT NOT NULL
); 
*/
