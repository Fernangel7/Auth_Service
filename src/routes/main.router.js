const express = require('express')
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const { JWT_SECRET_KEY } = require("../utils/env.utils.js")

const { title } = require("../utils/data.utils.js")

const { Logged, Unlogged } = require('../middlewares/auth-login.middleware.js')

const app = express.Router()

app.get("/", function (req, res) {
    res.set({
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        'Pragma': 'no-cache',
        'Expires': '0'
    });

    res.redirect("/dashboard")
})

app.get("/dashboard", Unlogged, function (req, res) {
    res.set({
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        'Pragma': 'no-cache',
        'Expires': '0'
    });

    res.render("dashboard", {
        title: title
    })
})

app.get("/auth", Logged, function (req, res) {
    res.set({
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        'Pragma': 'no-cache',
        'Expires': '0'
    });

    res.render("auth", {
        title: title
    })
})

app.get("/rem", function (req, res) {
    res.clearCookie("refeshToken", {
        signed: true,
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
    })
    
    res.redirect("/")
})

/*
app.post("/crypt", async function (req, res) {
    try {
        const token = jwt.sign(
            { ...req.body },
            JWT_SECRET_KEY,
            { expiresIn: "5m" }
        )

        res.cookie("token", token, {
            signed: true,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 5 * 60 * 1000
        })

    } catch (err) {
        return res.status(400).json({
            response: {
                status: 400,
                error: "❌ Error encrypting token!"
            }
        })
    }

    res.status(200).json({
        response: {
            status: 200
        }
    })
})

app.post("/del-crypt", function (req, res) {
    const token = req.cookies.token

    let decrypt_token

    if (!token) {
        return res.status(400).json({
            response: {
                status: 400,
                error: "❌ The token doesn't exist!"
            }
        })
    }

    try {
        res.clearCookie("token", {
            signed: true,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/"
        })
    } catch (err) {
        return res.status(400).json({
            response: {
                status: 400,
                error: "❌ Error decrypting token!"
            }
        })
    }

    res.status(200).json({
        response: {
            status: 200
        }
    })
})
*/

module.exports = {
    main_router: app
}