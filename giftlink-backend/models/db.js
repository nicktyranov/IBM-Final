// require('dotenv').config();
// const { readFileSync } = require('fs');
// const { MongoClient } = require('mongodb');

// const url = process.env.MONGO_URL;
// const dbName = 'giftLinkApp';

// let dbInstance = null;

// async function connectToDatabase() {
// 	if (dbInstance) {
// 		return dbInstance;
// 	}

// 	const client = new MongoClient(url);
// 	await client.connect();

// 	const db = client.db(dbName);
// 	dbInstance = db;
// 	if ((await client.db(dbName).collection('gifts').countDocuments()) === 0) {
// 		let data = readFileSync('./util/import-mongo/gifts.json', 'utf8');
// 		await client.db(dbName).collection('gifts').insertMany(data);
// 		console.log('✅ Imported gifts data');
// 	}
// 	console.log('✅ Connected to MongoDB');
// 	return db;
// }

// module.exports = connectToDatabase;

require('dotenv').config();
const { readFileSync } = require('fs');
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
	const giftsCollection = db.collection('gifts');

	const count = await giftsCollection.countDocuments();
	if (count === 0) {
		const data = JSON.parse(readFileSync('./util/import-mongo/gifts.json', 'utf8'));
		await giftsCollection.insertMany(data);
		console.log('✅ Imported gifts data');
	} else {
		console.log('📦 Gifts already exist in DB');
	}

	dbInstance = db;
	console.log('✅ Connected to MongoDB');
	return db;
}

module.exports = connectToDatabase;
