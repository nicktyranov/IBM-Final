/* jshint esversion: 8 */
const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const connectToDatabase = require('../models/db');
const router = express.Router();
const dotenv = require('dotenv');
const pino = require('pino');

dotenv.config();
const logger = pino();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
	try {
		const db = await connectToDatabase();
		const collection = db.collection('users');

		const existingEmail = await collection.findOne({ email: req.body.email });
		if (existingEmail) {
			return res.status(400).send('Email already registered');
		}

		const salt = await bcryptjs.genSalt(10);
		const hash = await bcryptjs.hash(req.body.password, salt);
		const email = req.body.email;

		const newUser = await collection.insertOne({
			email: email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			password: hash,
			createdAt: new Date()
		});

		const payload = {
			user: {
				id: newUser.insertedId
			}
		};

		const authtoken = jwt.sign(payload, JWT_SECRET);

		logger.info('User registered successfully');
		res.json({ authtoken, email });
	} catch (e) {
		logger.error(e);
		return res.status(500).send('Internal server error');
	}
});

router.post('/login', async (req, res) => {
	try {
		const db = await connectToDatabase();
		const collection = db.collection('users');
		const user = await collection.findOne({ email: req.body.email });
		if (!user) {
			return res.status(404).send('User not found');
		}
		const isValidCredentials = await bcryptjs.compare(req.body.password, user.password);
		if (!user || !isValidCredentials) {
			logger.error('Invalid email or password');
			return res.status(400).send('Invalid email or password');
		}

		const userName = user.firstName;
		const userEmail = user.email;

		const payload = {
			user: {
				id: user._id.toString()
			}
		};
		const authtoken = jwt.sign(payload, JWT_SECRET);
		res.status(200).json({ authtoken, userName, userEmail });
	} catch (e) {
		logger.error(e);
		return res.status(500).send('Internal server error');
	}
});

router.put('/update', async (req, res) => {
	const emailerrors = validationResult(req);
	if (!emailerrors.isEmpty()) {
		logger.error('Validation errors in update request', emailerrors.array());
		return res.status(400).json({ errors: emailerrors.array() });
	}
	try {
		const email = req.headers.email;
		if (!email) {
			logger.error('Email not found in the request headers');
			return res.status(400).json({ error: 'Email not found in the request headers' });
		}
		const connect = await connectToDatabase();
		const db = connect.collection('users');

		const existingUser = await db.findOne({ email: email });
		if (!existingUser) {
			logger.error('User not found with the provided email');
			return res.status(404).json({ error: 'User not found with the provided email' });
		}
		existingUser.firstName = req.body.name;
		existingUser.updatedAt = new Date();

		const updatedUser = await db.findOneAndUpdate(
			{ email },
			{ $set: existingUser },
			{ returnDocument: 'after' }
		);
		logger.info('User updated successfully');

		const payload = {
			user: {
				id: updatedUser._id.toString()
			}
		};
		const authtoken = jwt.sign(payload, JWT_SECRET);
		res.json({ authtoken });
	} catch (e) {
		logger.error(e);
		return res.status(500).send('Internal server error');
	}
});

module.exports = router;
