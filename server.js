const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const userRoutes = require("./routes/userRoutes.js")
const path = require("path");


dotenv.config({path: './config.env'});
const PORT = process.env.PORT || 8000;
const app = express();

const corsOptions = {
    origin: 'https://resumewizard-front-1.onrender.com', // Replace with your frontend URL
    
  };

app.use(cors());

app.use(express.json());
app.use('/api/user', userRoutes);

app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
    res.send("Hello from server side. All working good.");
})

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);


const connectDB = async()=>{
    try{
        await mongoose.connect(DB);
        app.listen(PORT, () => console.log(`Server is running on ${PORT}. DB connected.`));
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

connectDB();

mongoose.connection.on("open", () => console.log("connection to DB is good"));
mongoose.connection.on("err", () => console.log(err.message));
