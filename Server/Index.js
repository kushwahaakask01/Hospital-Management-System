// index.js
const express = require('express');
const cors = require('cors');
const { Connection } = require('./Connection');
const PatientRouter = require('./Router/Patient');

const app = express();

// Connect to MongoDB
Connection('mongodb://localhost:27017/hospitalDB');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public'));

// Routes
app.use('/', PatientRouter);

// Server start
app.listen(5000, () => console.log('Server is running at port 5000'));
