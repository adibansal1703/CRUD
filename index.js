const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));

let posts = [
  {
    id: uuidv4(),
    username: "Aditi",
    tweet: "Hello Coders!",
  },
  {
    id: uuidv4(),
    username: "Anu",
    tweet: "Hello World!",
  },
  {
    id: uuidv4(),
    username: "Ilsha",
    tweet: "Hello Designers",
  },
  {
    id: uuidv4(),
    username: "Divya",
    tweet: "Hello Aditi",
  },
];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, tweet } = req.body;
  let id = uuidv4();
  posts.push({ id, username, tweet });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newTweet = req.body.tweet;
  let post = posts.find((p) => id === p.id);
  post.tweet = newTweet;
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  posts.pop(post);
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.listen(port, () => {
  console.log("Server Started");
});
