const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");


const app = express();
const PORT = 5000;
const USERS_FILE = path.join(__dirname, "users.json");

app.use(cors());

app.use(bodyParser.json());

app.post("/auth", (req, res) => {
  const { username, password, type } = req.body;

  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));

  if (type === "signup") {
    if (users.some((user) => user.username === username)) {
      return res.json({ success: false, message: "Username already exists" });
    }

    users.push({ username, password, tasks: [] });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return res.json({ success: true });
  }
  
  if (type === "login") {
    if (
      users.some(
        (user) => user.username === username && user.password === password
      )
    ) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  }

  return res
    .status(400)
    .json({ success: false, message: "Invalid request type" });
});

app.post("/logout", (req, res) => {
  // You can add more logic here if needed. For now, it just sends a success message.
  res.json({ success: true, message: "Logged out successfully" });
});

app.post("/add-task", (req, res) => {
  const { username, task } = req.body;

  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  user.tasks.push(task);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  res.json({ success: true });
});

app.get("/get-tasks", (req, res) => {
  const { username } = req.query;

  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, tasks: user.tasks });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
