const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vcouptk.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        client.connect();
        const productCollection = client.db('emaJohnDB').collection('products');


        // product releted api
        app.get('/products', async (req, res) => {
            const result = await productCollection.find().toArray();
            res.send(result);
        })
        app.get("/porductscount" , async(req,res)=>{
            const count = await productCollection.estimatedDocumentCount();
            res.send({count})
        })



        // Send a ping to confirm a successful connection
        client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('ema john server .....................')
})

app.listen(port, () => {
    console.log(`ema john server is running on port: ${port}`);
})
