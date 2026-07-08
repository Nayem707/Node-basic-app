const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send(
    "Hello Nayem! Your Node.js app is running inside a Docker Container! 🚀",
  );
});

app.get("/app", (req, res) => {
  res.send(
    "Hello New Code! Your Node.js app is running inside a Docker Container! 🚀",
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
