
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const router = express.Router();
// const methodOverride = require("method-override");
mongoose.connect("mongodb://localhost/socialdb",(err)=>{
    if(err){
        console.log(err.message);
    }else{

        console.log("connected succesfully");
    }
})

const postSchema = new mongoose.Schema({
    username : String,
    posttitle : String,
    postdesc : String
});
const Post = new mongoose.model("Post" , postSchema);






const app = express();
app.set('view engine' , 'ejs');
// app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    //  res.render('home' ,{username:temp, posttitle :temp , postdesc : temp} );
     
    Post.find((err,found)=>{
        if(err){
            console.log(err);
        }else{
            res.render('home' ,{username:found , posttitle : found , postdesc : found} )
        }
    }).sort({$natural:-1});

     
        
    })


app.get("/addpost",(req,res)=>{
    res.render('addpost');
})

app.get("/about",(req,res)=>{
    res.render('about');
})

app.post("/addpost",(req,res)=>{
    let uname = req.body.username;
    let ptitle = req.body.posttitle;
    let pdesc = req.body.postdesc;
  
   const post = new Post({
    username : uname,
    posttitle : ptitle,
    postdesc : pdesc

   });
   post.save((err)=>{
    if(err){
        console.log(err);
    }else{
        res.redirect("/");
    }
   })
   
   
})

// router.delete("/:id", async(req,res)=>{
//  await Post.findByIdAndDelete(req.params.id);
//  res.redirect("/");
// })


app.listen(5000,()=>{
    console.log("server started on port 5000");
})

