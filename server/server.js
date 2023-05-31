const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
const app = express();
const xml = require("xml2js");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  axios
    .get("https://www.rotanacareers.com/rss/")
    .then((result) => {
      xml.parseString(result.data, (err, xmlData) => {
        if (err) {
          console.error("Error parsing XML:", err);
          res.status(500).send("Error parsing XML");
          return;
        }
        let jsonData = JSON.stringify(xmlData);
        res.json(jsonData);
      });
    })
    .catch((err) => {
      res.json({ mess: err });
    });
});

app.listen(5000, () => {
  console.log("server is working");
});
