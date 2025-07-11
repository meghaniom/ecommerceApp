require('dotenv').config();
const express = require('express');
const dbConnect = require('./config/dbConnect');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT ;


dbConnect()
  .then(() => console.log("✅ Connected to database"))
  .catch((err) => {
    console.error(" DB connection error:", err.message);
    process.exit(1);
  });


app.use(express.json());


app.use("/api/v1/auth", userRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
