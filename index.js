import axios from "axios";
import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;
const APIurl = "https://api.math.tools";//This is the server link.

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));//That's what I wanted to do to save the data entered by the user. (I could have used express)

app.get("/", (req, res) => {
    res.render("home.ejs");
});//homepage

app.get("/fact", (req, res) => {
        res.render("numbers.ejs", { heading: "Facts about numbers", answer: "answer" , formAction: "/answerf" });//I'm very lazy and was looking for an easy way to make the request and response buttons for all three sections in one file, so I created formAction.
});//This is to access each page.

app.get("/binary", (req, res) => {
    res.render("numbers.ejs", { heading: "Convert to binary", answer: "answer" , formAction: "/answerb" });
});

app.get("/pi", (req, res) => {
    res.render("numbers.ejs", { heading: "Digits of PI(π)", answer: "answer" , formAction: "/answerp" });
});

app.post("/answerf", async (req, res) => {//Facts about numbers doesn't work because it's paid.
    try {
        const number = req.body.num;
        const response = await axios.get(`${APIurl}/numbers/fact?number=${number}`);
        const result = response.data;

        res.render("numbers.ejs", { heading: "Facts about numbers", answer: `${result.contents.fact}` , formAction: "/answerf" });
    } catch (error) {
        res.status(404).send(error.message);
        console.log(error.response?.data || "No response data");
    }
});//I made a separate post request for each section where I could store the number entered by the user and also return the answer. I easily accessed the server with the following link and we got to the answer.

app.post("/answerb", async (req, res) => {
    try {
        const number = req.body.num;
        const response = await axios.get(`${APIurl}/numbers/base?number=${number}&from=10&to=2`);
        const result = response.data;

        res.render("numbers.ejs", { heading: "Convert to binary", answer: `${result.contents.answer}` , formAction: "/answerb" });
    } catch (error) {
        res.status(404).send(error.message);
        console.log(error.response?.data || "No response data");
    }
});

app.post("/answerp", async (req, res) => {
    try {
        const number = req.body.num;
        const response = await axios.get(`${APIurl}/numbers/pi?from=0&to=${number}&number=pi`);
        const result = response.data;

        res.render("numbers.ejs", { heading: "Digits of PI(π)", answer: `${result.cotents.result}` , formAction: "/answerp" });
    } catch (error) {
        res.status(404).send(error.message);
        console.log(error.response?.data || "No response data");
    }
});
        

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});//This is to find out which port the server is running on.