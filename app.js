const fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/confirm", function (req, res) {
  res.sendFile(__dirname + "/views/confirm.html");
});
app.get("/about", function (req, res) {
  res.sendFile(__dirname + "/views/about.html");
});
app.get("/recommend", function (req, res) {
  res.sendFile(__dirname + "/views/recommend.html");
});
app.post("/recommend", function (req, res) {
  const restaurantData = req.body;     //we can also do req.body.name but that will be lengthy so will get the full bofy og recommend.html 
  const filePath = __dirname+"/data/recommend.json";  //path of the file
  const fileData = fs.readFileSync(filePath);  //reading file path to get existing data
  const storedResaturants = JSON.parse(fileData);   //parsing the data (because before it's only a text technically)
  storedResaturants.push(restaurantData)    //adding new data by .push
  fs.writeFileSync(filePath,JSON.stringify(storedResaturants))  //now writing that data 

  res.redirect("/confirm")
  console.log(restaurantData);
});
app.get("/restaurants", function (req, res) {
  res.sendFile(__dirname + "/views/restaurants.html");
});

app.listen(3000, function () {
  console.log("server is runnin at port 3000");
});
