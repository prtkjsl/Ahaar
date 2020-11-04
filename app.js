var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("home");
})

app.get("/donate", function(req,res){
    res.render("donate");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Ahaar Server Started");
})