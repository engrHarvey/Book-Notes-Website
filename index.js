import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const API_URL = "https://openlibrary.org/search.json";

const db = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY id ASC");
    res.render("index.ejs", {
      listItems: result.rows,
    });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).send("Error fetching books");
  }
});

app.post("/search", async (req, res) => {
  const { bookTitle } = req.body;
  
  try {
    const result = await axios.get(API_URL, {
      params: {
        q: bookTitle,
        lang: 'en',
      },
    });
    
    const book = result.data.docs[0];
    
    res.render("addbook.ejs", {
      title: book.title,
      author: book.author_name,
      cover: book.cover_edition_key,
    });
  } catch (error) {
    console.error("Error searching for book:", error);
    res.status(500).send("Error searching for book");
  }
});

app.post("/addBook", async (req, res) => {
  const { title, author, bookCover: cover, review } = req.body;
  
  try {
    await db.query(
      "INSERT INTO books (title, author_name, olid_cover, book_review) VALUES ($1, $2, $3, $4)", 
      [title, author, cover, review]
    );
    res.redirect("/");
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).send("Error adding book");
  }
});

app.post("/edit", (req, res) => {
  const { editID, editItemTitle, edittemAuthor, editBookCover, editReview } = req.body;
  res.render("editPage.ejs", {
    id: editID, 
    title: editItemTitle, 
    author: edittemAuthor, 
    cover: editBookCover, 
    review: editReview
  });
});

app.post("/update", async (req, res) => {
  const { updateID: id, updateReview } = req.body;
  try {
    await db.query("UPDATE books SET book_review = $1 WHERE id = $2", 
      [updateReview, id]);
    res.redirect("/");
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).send("Error updating book");
  }
});

app.post("/delete", async (req, res) => {
  const { deleteID: id } = req.body;
  try {
    await db.query("DELETE FROM books WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).send("Error deleting book");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});