const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

//GET sent book.html
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/public/book.html"));
});

app.get("/details/:id", (req, res, next) => {
  res.sendFile(path.join(__dirname, `/public/${req.params.id}.html`));
});
// app.use(express.static(path.join(__dirname, "public")));

const port = 3000;
app.listen(port, () => {
  console.log(`listen at http://localhost:${port}`);
});
