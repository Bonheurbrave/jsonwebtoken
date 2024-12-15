const express = require('express')
require("dotenv").config();

const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json())

app.get("/posts", authorizeToken , (req,res)=>{
    res.json(posts);
})


app.post("/login" ,  (req,res)=>{
    //auth user 
const username = req.body.username;
const user = {user:username};

const accessToken = jwt.sign(user,process.env.SECRET_KEY_TOKEN)
res.json({accessToken:accessToken});

})



function authorizeToken(req,res , nex){

    const authHeaders = req.headers("authorization");
    const token = authHeaders && authHeaders.split(" ")[1]

    if (token == null) return res.sendStatus(401);

    jwt.verify(token , process.env.SECRET_KEY_TOKEN ,(err , user)=>{
        if (err) return res.sendStatus (403);
        
    })

}

app.listen(3000);