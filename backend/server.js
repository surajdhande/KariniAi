const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
const shopifyRouter=require("../backend/src/routes/index")
const port = 8001;
let connectionString =
  "mongodb://suraj.dhande:cdsdwthgfgdei@127.0.0.1:46018/KariniAi?authSource=admin";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB!");
});
app.use('/', shopifyRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log("------------------------------------------");
});
