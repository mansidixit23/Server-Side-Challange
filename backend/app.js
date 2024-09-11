const express = require('express');
const app = express();
const cors  = require('cors');
const methodeOverride = require("method-override");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(methodeOverride("_method"));
app.use(express.static("public"));

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE,PUT,OPTION"
    );
    next();
})

const port = process.env.PORT || 3000;
const appUrl = process.env.APP_URL

app.get("/", (req, res) => {
    res.json({ message: "WELcome to server" });
});

app.listen(port, () => {
    console.log(`Backend app listening at http://localhost:${port}`);
});