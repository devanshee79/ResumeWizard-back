const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes.js")
const path = require("path");


dotenv.config({path: './config.env'});
const PORT = 8000;
const app = express();
app.use(express.json());
// app.use((req, res, next) => {
//     console.log(req.url, req.body._id, req.body);
//     next();
// })
app.use('/api/user', userRoutes);

app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
    res.send("Hello from server side");
})

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);


const connectDB = async()=>{
    try{
        await mongoose.connect(DB);
        app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
    }catch(err){
        console.log(err.message);
    }
}

connectDB();

mongoose.connection.on("open", () => console.log("connection to DB is good"));
mongoose.connection.on("err", () => console.log(err.message));
