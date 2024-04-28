const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

const artworks = require('./artworks.json')

const app = express()
const port = process.env.PORT || 5000

// middleware----------------- 
app.use(cors())
app.use(express.json())

// artnest
// Ka12nuyPKOA9V0Zc


// mongodb-----------------------



// const uri = "mongodb+srv://artnest:Ka12nuyPKOA9V0Zc@cluster0.cczhmev.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = `mongodb+srv://${process.env.ARTNEST_USER}:${process.env.ARTNEST_KEY}@cluster0.cczhmev.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // await client.connect();

    const craftsCollection = client.db('craftsDB').collection('crafts')



    app.post('/crafts', async(req, res)=>{
        const newCraft = req.body
        console.log(newCraft);
        const result = await craftsCollection.insertOne(newCraft)
        res.send(result)
    })


    app.get('/crafts', async(req, res) =>{
        const cursor = craftsCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })

    app.get('/singleAllCraft/:id', async (req, res) =>{
        const result = await craftsCollection.findOne({_id: new ObjectId(req.params.id)})
        res.send(result)
    })

    app.get('/updateCraft/:id', async (req, res) =>{
        const result = await craftsCollection.findOne({_id: new ObjectId(req.params.id)})
        res.send(result)
    })

    app.get('/mycrafts/:email', async (req, res) =>{
        const result = await craftsCollection.find({email:req.params.email}).toArray()
        res.send(result)
    })

    app.put('/updateCrafts/:id', async (req, res) =>{
        // console.log(req.params.id);
        const query = {_id: new ObjectId(req.params.id)}
        
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('ArtNest server is running!')
})

app.get('/artworks', (req, res) => {
    res.send(artworks)
})
app.get('/artworks/:id', (req, res) => {
    const id = parseInt(req.params.id)
    // console.log(id);
    const artwork = artworks.find(item => item.id === id) || {}
    res.send(artwork)
})

app.listen(port, () => {
  console.log(`ArtNest app listening on port ${port}`)
})