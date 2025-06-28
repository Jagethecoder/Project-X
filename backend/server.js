const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const { setupSocket } = require('./socket');
const app = express();
dotenv.config();

connectDB(); // connect MongoDB

app.use(cors());
app.use(express.json()); // JSON parsing
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/posts', require('./routes/posts'));

const server = http.createServer(app);
setupSocket(server); // Initialize Socket.IO

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
