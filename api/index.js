const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "", 
  database: "cafe_menu",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");


  db.query(
    `
    CREATE TABLE IF NOT EXISTS menu_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
    (err) => {
      if (err) throw err;
      console.log("Menu items table ready");
    }
  );
});


app.post("/api/menu-items", (req, res) => {
  const { title, description, price } = req.body;

  if (!title || !description || !price || price <= 0) {
    return res
      .status(400)
      .json({
        error: "All fields are required and price must be greater than 0",
      });
  }

  const query =
    "INSERT INTO menu_items (title, description, price) VALUES (?, ?, ?)";
  db.query(query, [title, description, parseFloat(price)], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to add menu item" });
    }
    res.status(201).json({ id: result.insertId, title, description, price });
  });
});

app.get("/api/menu-items", (req, res) => {
  const { search } = req.query;
  let query = "SELECT * FROM menu_items";
  let params = [];

  if (search) {
    query += " WHERE title LIKE ? OR description LIKE ?";
    params = [`%${search}%`, `%${search}%`];
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch menu items" });
    }
    res.json(results);
  });
});


app.delete('/api/menu-items/:id', (req, res) => {
  const itemId = req.params.id;
  
  if (!itemId || isNaN(itemId)) {
    return res.status(400).json({ error: 'Invalid menu item ID' });
  }
  
  const query = 'DELETE FROM menu_items WHERE id = ?';
  db.query(query, [itemId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete menu item' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    
    res.status(200).json({ message: 'Menu item deleted successfully' });
  });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
