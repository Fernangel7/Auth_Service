require("dotenv").config()

const express = require("express")

const path = require("node:path")

const { PORT } = require("./utils/env_vars.js")
const { title } = require("./utils/site_data.js")

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views", "ejs"))

app.use("/img", express.static(path.join(__dirname, "public", "images")))

app.get("/", function (req, res) {
    res.render("index", {
        title: title
    })
})

app.get("/dashboard", function (req, res) {
    res.render("dashboard", {
        title: title
    })
})

app.listen(PORT, function(){console.log(`Server Running At PORT ${PORT}`)})