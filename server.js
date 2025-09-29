const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const shortid = require("shortid");
const cors = require("cors");

const app = express();
const PORT = 3000;

// middleware
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

// simple json "database"
let dbFile = "./urls.json";
let urls = fs.existsSync(dbFile) ? JSON.parse(fs.readFileSync(dbFile)) : {};

// save helper
function saveDB() {
    fs.writeFileSync(dbFile, JSON.stringify(urls, null, 2));
}

// ROUTES

// create short url
app.post("/shorten", (req, res) => {
    let {originalUrl, customAlias} = req.body;
    if (!originalUrl) {
        return res.status(400).json({error: "Original URL required"});
    }

    let alias = customAlias || shortid.generate();
    if (urls[alias]) {
        return res.status(400).json({error: "Alias already in use"});
    }

    urls[alias] = {originalUrl, clicks: 0};

    saveDB();
    res.json({shortUrl: `http://localhost:${PORT}/${alias}`, alias});
});

// export csv route
app.get("/export", (req, res) => {
    let csv = "Alias,Short URL,Original URL,Clicks\n";
    for (let alias in urls) {
        csv += `${alias},http://localhost:${PORT}/${alias},${urls[alias].originalUrl},${urls[alias].clicks}\n`;
    }

    res.setHeader("Content-Disposition", "attachment; filename=urls.csv");
    res.setHeader("Content-Type", "text/csv");
    res.send(csv);
});

// redirect + count
app.get("/:alias", (req, res) => {
    const alias = req.params.alias;
    if (urls[alias]) {
        urls[alias].clicks++;

        saveDB();
        res.redirect(urls[alias].originalUrl);
    } else {
        res.status(404).send("URL not found");
    }
});

// start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));