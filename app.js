const mongoose = require("mongoose");

const express = require("express");
const bodyParser = require("body-parser");
const { title } = require("process");
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
const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});
// create model
const Article = mongoose.model("Article", articleSchema);
/////////////////////////// request all articles
app
  .route("/articles")
  .get((req, res) => {
    Article.find()
      .then((docs) => {
        // Handle the result here
        res.send(docs);
      })
      .catch((error) => {
        // Handle any errors that occurred
        console.error(error);
      });
  })
  .post(function (req, res) {
    const jack = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    jack.save();
  })
  .delete(function (req, res) {
    Article.deleteMany()
      .then((result) => {
        console.log("Deletion successful");
        // Handle success
      })
      .catch((error) => {
        console.log("Deletion failed");
        // Handle error
      });
  });

/////////////////////////// request a specific articles

app.route("/articles/:articleTitle").get((req, res) => {
  Article.findOne({ title: req.params.articleTitle })
    .then((docs) => {
      // Handle the result here
      res.send(docs);
    })
    .catch((error) => {
      // Handle any errors that occurred
      console.error(error);
    });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port 3000`);
});
