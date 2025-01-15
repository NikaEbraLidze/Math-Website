import axios from "axios";
import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;
const APIurl = "https://api.math.tools";

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/facts", (req, res) => {
    res.render("numbers.ejs", { heading: "Facts about numbers", answer: "answer" });
});

app.get("/binary", (req, res) => {
    res.render("numbers.ejs", { heading: "Convert to binary", answer: "answer" });
});

app.get("/pi", (req, res) => {
    res.render("numbers.ejs", { heading: "Digits of PI(π)", answer: "answer" });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});