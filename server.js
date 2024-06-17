const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const userRoutes = require("./routes/userRoutes.js");
const path = require("path");

dotenv.config({ path: './config.env' });
const PORT = process.env.PORT || 8000;
const app = express();

const corsOptions = {
  origin: 'https://resumewizard-front.onrender.com', // Remove trailing slash
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/user', userRoutes);
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.send("Hello from server side. Server all working good");

});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    app.listen(PORT, () => console.log(`Server is running on ${PORT}. DB Connected.`));
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
}

connectDB();

mongoose.connection.on("open", () => console.log("Connection to DB is good"));
mongoose.connection.on("error", (err) => console.error(err.message));
