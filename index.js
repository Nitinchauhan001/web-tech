import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4002;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let userName = [];
let userPost = [];

app.get("/", (req, res) =>{
    res.render("index.ejs", { username : userName});
})

app.get("/login", (req, res) =>{
    res.render("login.ejs");
})

app.post("/user", (req, res) =>{
    const { username } = req.body;
    userName.push({ username });
    res.redirect("/");
})

app.get("/post", (req, res ) => {
    res.render("post.ejs", { username : userName});
})

app.get("/yourpost", (req, res) => {
    res.render("yourpost.ejs", { posts : userPost, username : userName});
})

app.post("/createpost", (req, res ) => {
    const { topicname, subject, content} = req.body;
    userPost.push({ topicname, subject, content});
    res.redirect("/yourpost");
})

app.get("/editpost/:id", (req, res) => {
    const postId = req.params.id;
    const post = userPost[postId];
    res.render("edit.ejs", { post, postId});
})

app.post("/updatepost/:id", (req, res) => {
    const postId = req.params.id;
    const { topicname, subject, content} = req.body;
    userPost[postId] = { topicname, subject, content};
    res.redirect("/yourpost");
})

app.get("/deletepost/:id", (req, res) => {
    const postId = req.params.id;
    userPost.splice(postId, 1);
    res.redirect("/yourpost");
})

app.listen(port, ()=>{
    console.log(`server is runnning in ${port}`);
})