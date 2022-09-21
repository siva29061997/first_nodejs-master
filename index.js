const express = require('express')
const cors = require("cors")
const app = express()
const mongodb = require("mongodb")
const mongoClient = mongodb.MongoClient
const URL = process.env.DB
const DB = "batch_37_wd_Tamil"
const dotenv = require("dotenv").config()



app.use(express.json());
app.use(cors({
    origin: "http://localhost:3001"
}));

app.get("/users",async function (req, res) {

    try {
    // step 1:
    const connection = await mongoClient.connect(URL)
    // step 2:
    const db = connection.db(DB);
    // step 3:
    // step 4:
    let reUser = await db.collection("products").find().toArray();
    // step 5:
    await connection.close();
    // error :
    res.json(reUser);
    } catch (error) {
        res.status(500).json({
            messege:"Somthig went wrong"
        });
    }
    // let qParms = req.query
    // console.log(qParms)

    // let resUser = []

    // for (let index = parseInt(req.query.offset); 
    // index < parseInt(req.query.offset) + parseInt(req.query.limit); index++) {
    //     if(users[index]){
    //         resUser.push(users[index])
    //     }
    // }
});

app.post("/user",async function (req, res) {
    
    try {
        
    const connection = await mongoClient.connect(URL)
    
    const db = connection.db(DB)
    
    await db.collection("products").insertOne(req.body)
    
    await connection.close()
   
    res.status(200).json({messege:"Done"})
    } catch (error) {
        res.status(500).json({
            messege:"Somthig went wrong"
        })
    }

    // req.body.id = users.length + 1;
    // users.push(req.body)
    // res.json({ messege: "user created" });
});

app.get("/user/:id",async function (req, res) {

    try {
        
    const connection = await mongoClient.connect(URL)
    
    const db = connection.db(DB)
    
    let user = await db.collection("products").findOne({_id: mongodb.ObjectId(req.params.id)});
   
    await connection.close()
    
    res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            messege:"Somthig went wrong"
        })
    }

    // let userId = req.params.id;
    // let user = users.find((item) => item.id == userId);
    // if (user) {
    //     res.json(user)
    // } else {
    //     res.json({ messege: "User not found" });
    // }
})

app.put("/user/:id",async function (req, res) {

    try {
        
    const connection = await mongoClient.connect(URL)
   
    const db = connection.db(DB)
    
    let user = await db.collection("products").findOneAndUpdate({_id: mongodb.ObjectId(req.params.id)},{$set:req.body})
    
    await connection.close()
    
    res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            messege:"Somthig went wrong"
        })
    }
    // let userId = req.params.id;
    // let userIndex = users.findIndex((item) => item.id == userId);

    // if (userIndex != -1) {
    //     Object.keys(req.body).forEach((item) => {
    //         users[userIndex][item] = req.body[item]
    //     });
    //     res.json({
    //         messege: "Done"
    //     });
    // } else {
    //     res.json({
    //         messege: "User not found"
    //     });
    // }
});

app.delete("/user/:id",async function (req, res) {

    try {
       
    const connection = await mongoClient.connect(URL)
    
    const db = connection.db(DB)
    
    let user = await db.collection("products").findOneAndDelete({_id: mongodb.ObjectId(req.params.id)});
    
    await connection.close()
    
    res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            messege:"Somthig went wrong"
        })
    }

    // let userId = req.params.id;
    // let userIndex = users.findIndex((item) => item.id == userId);

    // if (userIndex != -1) {
    //     users.splice(userIndex, 1);
    //     res.json({
    //         messege: "User deleted"
    //     });
    // } else {
    //     res.json({
    //         messege: "User not found"
    //     });
    // }
});

app.post("/register",async function(req,res){

});


app.listen(process.env.PORT || 3000);