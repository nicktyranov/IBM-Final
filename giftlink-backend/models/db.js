require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL;
const dbName = 'giftLinkApp';

let dbInstance = null;

async function connectToDatabase() {
	if (dbInstance) {
		return dbInstance;
	}

	const client = new MongoClient(url);
	await client.connect();

	const db = client.db(dbName);
	dbInstance = db;

	console.log('✅ Connected to MongoDB');
	return db;
}

module.exports = connectToDatabase;
