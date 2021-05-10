const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  res.send(`<ul> 
    <li> <a > Hamlet</a> </li>
    <li> <a > Macbeth</a> </li>
    <li> <a > a Midsummer Night's Dream</a></li>
    <li> <a > Othello</a></li>
    <li> <a > Romeo and Juliet</a></li> </ul>`);
});

app.listen(3000);
