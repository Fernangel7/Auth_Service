//imports enviroment vars
require("dotenv").config()

//import node libs
const express = require("express")

//import native node libs
const path = require("node:path")

//import data files (JS)
const { PORT } = require("./utils/env.utils.js")
const { title } = require("./utils/data.utils.js")

//import mongodb connection method
const { connectMongo } = require("./db/mongo.db.js")

//import middlewares
const { corsMiddleware } = require('./middlewares/cors.middleware.js')

//import routers
const { user_router } = require("./routes/users.router.js")

const app = express()

//configurating of views engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views", "ejs"))

//express static images
app.use("/img", express.static(path.join(__dirname, "public", "images")))

//mongodb connection
connectMongo()

//setting middlewares
app.use(corsMiddleware())

//setting express routers
app.use("/user", user_router)

//set main access routes (GET)
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

// app.get("/db/in", async (req, res) => await UsersModel.createEmptyColeccionUsers(req, res))

app.listen(PORT, function () { console.log(`Server Running At PORT ${PORT}`) })