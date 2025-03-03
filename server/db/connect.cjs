const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

async function main() {
  const Db = process.env.ATLAS_URI;
  const client = new MongoClient(Db);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    // Get list of collections
    const collections = await client.db("AlphaDB").collections();

    // Log collection names
    collections.forEach((collection) => console.log(collection.collectionName));
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

main();