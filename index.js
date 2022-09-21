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

app.get("/users", async function (req, res) {

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
app.get("/products", async function (req, res) {

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

app.post("/user", async function (req, res) {

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
app.post("/product", async function (req, res) {

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

app.get("/user/:id", async function (req, res) {

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
app.get("/product/:id", async function (req, res) {

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

app.put("/user/:id", async function (req, res) {

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
app.put("/product/:id", async function (req, res) {

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

app.delete("/user/:id", async function (req, res) {

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
app.delete("/product/:id", async function (req, res) {

    try {

        const connection = await mongoClient.connect(URL)

        const db = connection.db(DB)

        let user = await db.collection("products").findOneAndDelete({ _id: mongodb.ObjectId(req.params.id) });

        await connection.close()

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            messege: "Somthig went wrong"
        })
    }

});

// app.post("/register", async function (req, res) {

// });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
// app.listen(process.env.PORT || 3000)