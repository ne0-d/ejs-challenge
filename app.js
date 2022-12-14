//jshint esversion:6 

// LOADING THE REQUIRED MODULES
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Starting the server
mongoose.connect("mongodb://localhost:27017/blogwebsiteDB", {useNewUrlParser: true});

const blogSchema ={
  name: String,
  content: String
};

Blog = mongoose.model("Blog", blogSchema);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const homwStartingBlog = new Blog({
  name: "Home",
  content: homeStartingContent
});



// DECLATING GLOBAL VARIABLES
const posts =[];

// GET REQUESTS
app.get("/", (req, res)=>{
  Blog.find({}, function(err, foundBlogs){
    if(!err){
      res.render("home", {contentHome: homeStartingContent, posts: foundBlogs});
    }
    else{
      console.log("There was some porblme fetching the data from database.");
    }
  })
});

app.get("/about", (req, res)=>{
  res.render("about", {contentAbout: aboutContent});
});

app.get("/contact", (req, res)=>{
  res.render("contact", {contentContact: contactContent});
});

app.get("/compose", (req, res)=>{
  res.render("compose");
});

app.get("/posts/:blogName", (req, res)=>{
  let blogId = req.params.blogName;
  console.log(blogId);
  Blog.findById(blogId, function(err, foundBlog){
    if(!err){
      console.log(foundBlog.name);
      res.render("post", {post: foundBlog});
    }
  });
  // const index = posts.findIndex((post)=>post.title == blogName);
  // const storedTitle = posts[index].title;
  // console.log(storedTitle);
  // console.log(blogName);
  // if(blogName === storedTitle)
  //   res.render("post", {post: posts[index]});
  

});

// POST REQUESTS
app.post("/compose", (req, res)=>{
  const post = new Blog({
    name: req.body.newBlogTitle,
    content: req.body.newBlogBody
  });
  post.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });

});

// PORT DECLARATION
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
