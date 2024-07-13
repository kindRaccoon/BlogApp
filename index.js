const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const database = require('./config/db');
const userRoutes = require('./routes/userRoute');
const blogRoutes = require('./routes/blogRoute');

dotenv.config();
const app = express();

//Database connetion

database();


//Middleware

app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

//Routes

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);

//PORT

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server listen on port ${PORT}`);
})