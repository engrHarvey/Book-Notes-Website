import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import env from "dotenv";


const app = express();
const port = 3000;
env.config();

const API_URL = "https://openlibrary.org/search.json?";

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY id ASC");
    items = result.rows;

    res.render("index.ejs", {
      listItems: items,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/search", async (req, res) => {

  const book_title = req.body.bookTitle;
  
  try {
    const result = await axios.get(API_URL , {
      params: {
        q: book_title,
        lang: 'en',
      },
    });
    console.log(result.data.docs[0].title);
    console.log(result.data.docs[0].author_name);
    console.log(result.data.docs[0].cover_edition_key);
    
    res.render("addbook.ejs", {
      title: result.data.docs[0].title,
      author: result.data.docs[0].author_name,
      cover: result.data.docs[0].cover_edition_key,
    });
  } catch (error) {
    console.error(error);
  }
});

app.post("/addBook", async (req, res) => {

  const title = req.body.title;
  const author = req.body.author;
  const cover = req.body.bookCover;
  const review = req.body.review;
  try {
    await db.query("INSERT INTO books (title, author_name, olid_cover, book_review) VALUES ($1, $2, $3, $4)", 
      [title, author, cover, review]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", (req, res) => {

  const editID = req.body.editID;
  const editTitle = req.body.editItemTitle;
  const editAuthor = req.body.edittemAuthor;
  const editCover = req.body.editBookCover;
  const editReview = req.body.editReview;
  console.log(editID, editTitle, editAuthor, editCover, editReview);
  res.render("editPage.ejs", {
    id: editID, 
    title: editTitle, 
    author: editAuthor, 
    cover: editCover, 
    review: editReview
  });
});

app.post("/update", async (req, res) => {

  const ID = req.body.updateID;
  const updateReview = req.body.updateReview;
  try {
    await db.query("UPDATE books SET book_review = ($1) WHERE id = $2", 
      [updateReview, ID]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {

  const ID = req.body.deleteID;
  try {
    await db.query("DELETE FROM books WHERE id = $1", [ID]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});