

const mongoose = require('mongoose');
// Replace with your actual connection string from Atlas
const uri = process.env

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected!'))
.catch(err => console.log(err));

/*  */


async function ConnectDB() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas!");

    const database = client.db("PAQ"); // Replace with your database name
    const collection = database.collection("users"); // Replace with your collection name

    // Retrieve data from the collection
    const documents = await collection.find({}).toArray();
    console.log("Retrieved data:", documents);

  } finally {
    await client.close();
    console.log("Connection closed.");
  }
}



function GetData(){
    /* ConnectDB().catch(err=>err) */
    console.log("BADBOY");
    
}
 
module.exports = GetData();

