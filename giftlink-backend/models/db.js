// db.js
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;
console.log('Mongo URL:', process.env.MONGO_URL);

let dbInstance = null;
const dbName = 'giftdb';

async function connectToDatabase() {
	if (dbInstance){
		return dbInstance;
	}

	const client = new MongoClient(url);      
	await client.connect(); 

	const db = client.db(dbName);
	const collection = db.collection('gifts');
	dbInstance = collection;
	const data = await collection.find({}).toArray();
	console.log('Documents:', data);
	return dbInstance;
}
connectToDatabase();

module.exports = connectToDatabase;
