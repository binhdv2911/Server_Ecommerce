require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//Khai báo ROUTE
const userRoutes = require("./routes/userRoute");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// connect mongooes
mongoose.connect(process.env.URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

app.use("/user", userRoutes);
