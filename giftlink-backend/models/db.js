// // db.js
// require('dotenv').config();
// const MongoClient = require('mongodb').MongoClient;

// // MongoDB connection URL with authentication options
// let url = `${process.env.MONGO_URL}`;
// console.log('Mongo URL:', process.env.MONGO_URL);

// let dbInstance = null;
// const dbName = 'giftdb';

// async function connectToDatabase() {
// 	if (dbInstance) {
// 		return dbInstance;
// 	}

// 	const client = new MongoClient(url);
// 	await client.connect();

// 	const db = client.db(dbName);
// 	const collection = db.collection('gifts');
// 	dbInstance = collection;
// 	const data = await collection.find({}).toArray();
// 	return db;
// }

// module.exports = connectToDatabase;
require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL;
const dbName = 'giftdb';

let dbInstance = null;

async function connectToDatabase() {
	if (dbInstance) {
		return dbInstance;
	}

	const client = new MongoClient(url);
	await client.connect();

	const db = client.db(dbName);
	dbInstance = db; // ✅ Кэшируем и возвращаем саму БД, не коллекцию

	console.log('✅ Connected to MongoDB');
	return db;
}

module.exports = connectToDatabase;
