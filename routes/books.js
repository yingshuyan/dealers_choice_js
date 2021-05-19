const express = require("express");
const { client } = require("../db");
const router = express.Router();
const addBook = require("../views/addBook");

//GET "/books" send list of books
router.get("/", async (req, res, next) => {
  try {
    const bookList = await client.query(`
      SELECT * FROM booklist;
      
      `);

    res.send(`
      <html>
      <body>
      <ul>
      ${bookList.rows
        .map((ele) => `<li> <a href= /books/${ele.name}>${ele.name}</a></li>`)
        .join("")}
      </ul>
      </body>
      </html>
      `);
  } catch (er) {
    next(er);
  }
});

//USE /add to routes
router.get("/add", (req, res, next) => {
  res.send(addBook());
});

//POST "/books/add"
router.post("/add", async (req, res, next) => {
  await client.query(
    `
    INSERT INTO booklist (name,author,url) VALUES ($1,$2,$3)
    RETURNING *
    `[(req.params.name, req.params.author, req.params.url)]
  );

  res.send("book is added");
});
//GET "/books/:name" send book detail by name
router.get("/:name", async (req, res, next) => {
  try {
    const bookName = req.params.name;
    console.log(bookName);
    const bookDetail = (
      await client.query(
        `
    SELECT * FROM booklist Where
    name = $1;
    `,
        [bookName]
      )
    ).rows[0];
    res.send(`
      <html>
  <header>
  <h1> ${bookName}</h1>
  </header>
      <body>
      <ul>
      <li>
      ID: ${bookDetail.id}
      </li>
      <li>
      NAME: ${bookDetail.name}
      </li>
      <li>
      AUTHOR: ${bookDetail.author}
      </li>
      <li>
      <a href=${bookDetail.url}>
      WIKILINK: ${bookDetail.url}
      </a>
      </li>
        <ul>
        </body>
        </html>
    `);
  } catch (er) {
    next(er);
  }
});

//GET error handling middleware;
router.get("/", (req, res) => {
  res.status(500).send(Error.message); //why do we need to write status there.
});
module.exports = router;
