require("dotenv").config()

const express = require("express")

const path = require("node:path")

const { PORT } = require("./utils/env_vars.js")

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views", "ejs"))

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(PORT, function(){console.log(`Server Running At PORT ${PORT}`)})