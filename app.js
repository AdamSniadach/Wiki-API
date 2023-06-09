const mongoose = require("mongoose");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//set up ejs
//mongodb
const uri = "mongodb://0.0.0.0:27017/wikiDB";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB", error));

// create Schema : rools
const fruitSchema = new mongoose.Schema({
  title: String,
  content: String,
});
// create model
const Article = mongoose.model("Article", fruitSchema);

// create object to insert to database
const react = new Article({
  title: "react",
  content: "JS framework",
});

// react.save();

//
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port 3000`);
});
