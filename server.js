// const express = require("express");
// const app = express();
// const path = require("path");
// const morgan = require("morgan");

// app.use(express.json()); // body parsing for json;
// app.use(morgan("dev")); // morgon to log each req;

// GET sent book.html
// app.get("/", async (req, res, next) => {});

// app.get("/details/:id", (req, res, next) => {
//   res.sendFile(path.join(__dirname, `/public/${req.params.id}.html`));
// });

// // app.use(express.static(path.join(__dirname, "public")));
// const port = 3000;
// app.listen(port, () => {
//   console.log(`listen at http://localhost:${port}`);
// });

const express = require("express");
const app = express();
const routes = require("./routes/books");
const morgan = require("morgan");
const { client, syncAndSeed } = require("./db");
const addBook = require("./views/addBook");
app.use(express.static(__dirname + "/public"));
//body parsing for json;
app.use(express.json());
//body parsing for urlencode
app.use(express.urlencoded({ extended: false }));
//use morgan for logging
app.use(morgan("dev"));

//USE /books to routes
app.use("/books", routes);
//USE redirect from /to /books
app.use("/", (req, res, next) => {
  res.redirect("/books");
});

app.listen(1337, () => {
  syncAndSeed();
  console.log("app is listening");
});
