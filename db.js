const pg = require("pg");
const client = new pg.Client("postgress://localhost/dealerschoice");
client.connect();

const syncAndSeed = async () => {
  try {
    await client.query(`
    DROP TABLE IF EXISTS booklist;
    CREATE TABLE booklist (
        id SERIAL PRIMARY KEY,
        name TEXT DEFAULT NULL,
        author TEXT DEFAULT NULL,
        url TEXT DEFAULT NULL

    );
    INSERT INTO booklist (name,author,url) VALUES ('Hamlet', 'William Shakespeare','https://en.wikipedia.org/wiki/Hamlet');
    INSERT INTO booklist (name,author,url) VALUES ('Macbeth', 'William Shakespeare','https://en.wikipedia.org/wiki/Macbeth');
    INSERT INTO booklist (name,author,url) VALUES ('Othello', 'William Shakespeare','https://en.wikipedia.org/wiki/Othello');
    INSERT INTO booklist (name,author,url) VALUES ('a_Midsummer_Night\`s_Dream', 'William Shakespeare','https://en.wikipedia.org/wiki/Macbeth');
    `);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  client,
  syncAndSeed,
};
