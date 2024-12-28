const express = require('express')

const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const kudosRoutes = require('./routes/kudosRoutes');
const badgeRouter = require('./routes/badgeRouter');
const errorHandler = require('./middlewares/errorHandler');


// Load environment variables
require('./config/env');
connectDB(); // Connect to database

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/kudos', kudosRoutes);
app.use('/api/badge', badgeRouter);


app.use(errorHandler); // Global error handler

app.get("/test",(req,res)=>{
    res.status(201).json({
        message:"Server is running",
        success:true
    })


})
module.exports = app;
