const express = require('express')
const cors = require("cors")
const app = express()
const mongodb = require("mongodb")
const mongoClient = mongodb.MongoClient;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const URL = process.env.DB
const DB = "batch_37_wd_Tamil"
const dotenv = require("dotenv").config()



app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));

let authenticate = (req, res, next) => {
    if (req.headers.authorization) {
        try {
            let decode = jwt.verify(req.headers.authorization,123456789);
            if (decode) {
                next()
            }
        } catch (error) {
            res.status(401).json({ messege: "Unathorized" });
        }
    } else {
        res.status(401).json({ messege: "Unathorized" })
    }
}

app.get("/users", authenticate, async function (req, res) {

    try {
        // step 1:
        const connection = await mongoClient.connect(URL)
        // step 2:
        const db = connection.db(DB);
        // step 3:
        // step 4:
        let reUser = await db.collection("users").find().toArray();
        // step 5:
        await connection.close();
        // error :
        res.json(reUser);
    } catch (error) {
        res.status(500).json({
            messege: "Somthig went wrong"
        });
    }
});
app.get("/products", authenticate, async function (req, res) {

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
            messege: "Somthig went wrong"
        });
    }

});

app.post("/user", authenticate, async function (req, res) {

    try {

        const connection = await mongoClient.connect(URL)

        const db = connection.db(DB)

        await db.collection("users").insertOne(req.body)

        await connection.close()

        res.status(200).json({ messege: "Done" })
    } catch (error) {
        res.status(500).json({
            messege: "Somthig went wrong"
        })
    }
});
app.post("/product", authenticate, async function (req, res) {

    try {

        const connection = await mongoClient.connect(URL)

        const db = connection.db(DB)

        await db.collection("products").insertOne(req.body)

        await connection.close()

        res.status(200).json({ messege: "Done" })
    } catch (error) {
        res.status(500).json({
            messege: "Somthig went wrong"
        })
    }

});

app.get("/user/:id", authenticate, async function (req, res) {

    try {

        const connection = await mongoClient.connect(URL)

        const db = connection.db(DB)

        let user = await db.collection("users").findOne({ _id: mongodb.ObjectId(req.params.id) });

        await connection.close()

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            messege: "Somthig went wrong"
        })
    }
});
app.get("/product/:id", authenticate, async function (req, res) {

    try {

        const connection = await mongoClient.connect(URL)

        const db = connection.db(DB)

        let user = await db.collection("products").findOne({ _id: mongodb.ObjectId(req.params.id) });

        await connection.close()

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            messege: "Somthig went wrong"
        })
    }

});

app.put("/user/:id", authenticate, async function (req, res) {

    try {

        const connection = await mongoClient.connect(URL)

        const db = connection.db(DB)

        let user = await db.collection("users").findOneAndUpdate({ _id: mongodb.ObjectId(req.params.id) }, { $set: req.body })

        await connection.close()

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            messege: "Somthig went wrong"
        })
    }
});
app.put("/product/:id", authenticate, async function (req, res) {

    try {

        const connection = await mongoClient.connect(URL)

        const db = connection.db(DB)

        let user = await db.collection("products").findOneAndUpdate({ _id: mongodb.ObjectId(req.params.id) }, { $set: req.body })

        await connection.close()

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            messege: "Somthig went wrong"
        })
    }

});

app.delete("/user/:id", authenticate, async function (req, res) {

    try {

        const connection = await mongoClient.connect(URL)

        const db = connection.db(DB)

        let user = await db.collection("users").findOneAndDelete({ _id: mongodb.ObjectId(req.params.id) });

        await connection.close()

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            messege: "Somthig went wrong"
        })
    }
});
app.delete("/product/:id", authenticate, async function (req, res) {

    try {

        const connection = await mongoClient.connect(URL);

        const db = connection.db(DB);

        let user = await db.collection("products").findOneAndDelete({ _id: mongodb.ObjectId(req.params.id) });

        await connection.close()

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            messege: "Somthig went wrong"
        })
    }

});

app.post("/register", async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db(DB)

        let salt = await bcrypt.genSalt(10);
        console.log(salt)
        let hash = await bcrypt.hash(req.body.password, salt);
        console.log(hash)

        req.body.password = hash

        await db.collection("user").insertOne(req.body);

        await connection.close()
        res.json({ messege: "user registered" })
    } catch (error) {
        console.log(error)
        res.json(error)
    }
});


app.post("/login", async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db(DB);

        let user = await db.collection("user").findOne({ email: req.body.email })
        if (user) {
            let compare = await bcrypt.compare(req.body.password, user.password)
            if (compare) {
                let token = jwt.sign({_id : user._id},123456789,{expiresIn : "24h"});
                res.json({token}) 
            } else {
                res.json({ messege: "user name/password is wrong" })
            }
        } else {
            res.status(401).json({ messege: "user name/password is wrong" })
        }
    } catch (error) {
           console.log(error);
           res.status(600).json({messege : "somthing went wrong"})
    }
});


// app.post("/login", async function (req, res) {
//     try {
//         let connection = await mongoClient.connect(URL);
//         let db = connection.db(DB);

//         let user = await db.collection("user").findOne({ email: req.body.email });
//         if (user) {
//             let compare = await bcrypt.compare(req.body.password, user.password);
//             if (compare) {
//                 let token = jwt.sign({ _id: user._id }, process.env.SECRAT, { expiresIn: "60m" });
//                 res.json({ token })
//             }
//             else {
//                 res.json({ messege: "user name/password is wrong" })
//             }
//         } else {
//             res.status(401).json({ messege: "user name/password is wrong" });
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(600).json({ messege: "somthig went wrong" })
//     }
// });

app.get("/", (req, res) =>
    res.send(`Server Running`)
);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
// app.listen(process.env.PORT || 3000)