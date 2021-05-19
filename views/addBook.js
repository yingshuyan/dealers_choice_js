module.exports = () => {
  return `
<html>
<link rel = "stylesheet" href = "/style.css" />
<header>
</header>
<body>
<div>
<form method="post" action="/posts">
          <label for="name">Name</label>
          <input type="text" name="name" />
          <label for="author">Author</label>
          <input type="text" name="author" />
          <label for="url">Url</label>
          <input type="text" name="url" />
          <button type="submit">Submit</button>
        </form>
</div>
</body>
</html>
`;
};
