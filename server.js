import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';

const port = 5000;
const app = express();

const posts = [];

const userID = Math.floor(Math.random() * (99999999 - 10000001 + 1)) + 10000001;
const stats = ['healthy','stable','injured','recovering','exhausted','sick','cold'];
const tags = ['💪 Healthy','😎 Stable','🤕 Injured','😮‍💨 Recovering','😵‍💫 Exhausted','🤢 Sick','🥶 Cold'];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get('/', (req,res)=>{
    res.render("index.ejs");
})

app.get('/newPost', (req,res)=>{
    res.render("newPost.ejs");
})

app.get('/logs', (req, res) => {
  res.render('logs', { posts });
});

app.post('/create', (req,res)=>{
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const {title,body} = req.body;
    const statusBefore = req.body.status;
    const postID = crypto.randomUUID();
    let status = null;
    for(let i=0;i<stats.length;i++){
        if(stats[i] === statusBefore){
            status = tags[i];
        }
    }
    const newPost = {
    postID,
    userID,
    date,
    time,
    title,
    body,
    status
  };
  if (!title || !body || !status) {
  return res.status(400).render("error.ejs", {
    message: "All fields must be filled out before submitting."
  });
}
  posts.unshift(newPost); // unshift to show latest at top
  res.redirect('/logs');
})

app.post('/delete', (req,res)=>{
    const id = req.body.postID;
    for(let i=0;i<posts.length;i++){
        if(posts[i].postID === id){
            posts.splice(i,1);
            break;
        }
    }
    res.redirect('/logs');
})
app.post('/edit', (req,res)=>{
    const id = req.body.postID;
    let title,status,body;
    for(let i=0;i<posts.length;i++){
        if(posts[i].postID === id){
            title = posts[i].title;
            status = posts[i].status;
            body = posts[i].body;
            res.render('editPost', {title,status,body});
            break;
        }
    }
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
}); 