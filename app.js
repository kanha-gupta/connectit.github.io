const fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");
const {response} = require("express");
const {contentDisposition} = require("express/lib/utils");

const app = express();
app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));


app.get("/", function (req, res) {
  res.redirect("/Studentlist")
});
app.get("/Studentlist", function (req, res) {
  res.sendFile(__dirname +  "/views/Studentlist.html");
});
app.get("/signin", function (req, res) {
  res.sendFile(__dirname + "/views/signin.html");

});
app.get("/data/recommend.json", function (req,res) {
  res.sendFile(__dirname + "/data/recommend.json")
})
app.post("/", function (req, res) {
  const Studentdata = req.body;     //we can also do req.body.name but that will be lengthy so will get the full bofy og
  const filePath = __dirname+"/data/recommend.json";  //path of the file
  const fileData = fs.readFileSync(filePath);  //reading file path to get existing data
  const StoredData = JSON.parse(fileData);   //parsing the data (because before it's only a text technically)
  StoredData.push(Studentdata)    //adding new data by .push
  fs.writeFileSync(filePath,JSON.stringify(StoredData))  //now writing that data
  res.redirect("/Studentlist")
  console.log(Studentdata);
});
app.listen(3000, function () {
  console.log("server is runnin at port 3000");
});