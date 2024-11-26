require('dotenv').config();  // This loads the .env file and makes environment variables available

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Log the MongoDB URI to check if it's being loaded
console.log('MongoDB URI:', process.env.MONGODB_URI);  // Add this line to see if the URI is being read

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/questions', require('./routes/questionRoutes'));
app.use('/api/appraisals', require('./routes/appraisalRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
