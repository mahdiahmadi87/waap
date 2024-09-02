const express = require('express');
const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');
const sqlite3 = require('sqlite3').verbose();

// Connect to a database (in this example, a new file-based database)
const db = new sqlite3.Database('waap_db.db');

const app = express();
app.use(express.json());

// Video
app.put('/videos/upload', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'video URL is required' });
  }

  const id = uuidv4();
  db.run('INSERT INTO videos (id, url) VALUES (?, ?)', [id, url], function(error) {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'error saving video' });
    }
    res.status(201).json({ id, url });
  });
});

app.get('/videos', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'video ID is required' });
  }
  db.all('SELECT url FROM videos WHERE id = ?', [id], (error, rows) => {
    if (error) {
    console.error(error);
    res.status(500).json({ error: 'error finding video' });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: 'video not found' });
    }
    res.json({ url: rows[0].url });
  });
});

app.get('/videos/all', async (req, res) => {
  db.all('SELECT id, url FROM videos', [], (error, rows) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'error finding videos' });
    }
    res.json(rows); 
  });
});

app.delete('/videos/delete', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'video ID is required' });
  }

  db.run('DELETE FROM videos WHERE id = ?', [id], function(error) {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'error deleting video' });
    }
    res.json({ message: 'video deleted successfully' });  });
});


// Song
app.put('/songs/upload', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'song URL is required' });
  }

  const id = uuidv4();
  db.run('INSERT INTO songs (id, url) VALUES (?, ?)', [id, url], function(error) {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'error saving song' });
    }
    res.status(201).json({ id, url });
  });
});

app.get('/songs', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'song ID is required' });
  }
  db.all('SELECT url FROM songs WHERE id = ?', [id], (error, rows) => {
    if (error) {
    console.error(error);
    res.status(500).json({ error: 'error finding song' });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: 'song not found' });
    }
    res.json({ url: rows[0].url });
  });
});

app.get('/songs/all', async (req, res) => {
  db.all('SELECT id, url FROM songs', [], (error, rows) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'error finding songs' });
    }
    res.json(rows); 
  });
});

app.delete('/songs/delete', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'song ID is required' });
  }

  db.run('DELETE FROM songs WHERE id = ?', [id], function(error) {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'error deleting song' });
    }
    res.json({ message: 'song deleted successfully' });  });
});


// docs
app.put('/docs/upload', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'doc URL is required' });
  }

  const id = uuidv4();
  db.run('INSERT INTO docs (id, url) VALUES (?, ?)', [id, url], function(error) {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'error saving doc' });
    }
    res.status(201).json({ id, url });
  });
});

app.get('/docs', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'doc ID is required' });
  }
  db.all('SELECT url FROM docs WHERE id = ?', [id], (error, rows) => {
    if (error) {
    console.error(error);
    res.status(500).json({ error: 'error finding doc' });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: 'doc not found' });
    }
    res.json({ url: rows[0].url });
  });
});

app.get('/docs/all', async (req, res) => {
  db.all('SELECT id, url FROM docs', [], (error, rows) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'error finding docs' });
    }
    res.json(rows); 
  });
});

app.delete('/docs/delete', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'doc ID is required' });
  }

  db.run('DELETE FROM docs WHERE id = ?', [id], function(error) {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'error deleting doc' });
    }
    res.json({ message: 'doc deleted successfully' });  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
