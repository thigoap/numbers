const express = require("express")
const server = express()

// config public folder
server.use(express.static("public"))

// habilita o uso do req.body
server.use(express.urlencoded({ extended: true }))

// using template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// config app routes
//index
server.get("/", (req, res) => {
    return res.render("index.html")
})

//contact
server.get("/contact", (req, res) => {
    return res.render("page-contact.html", { back: true })
})

//dice
server.get("/dice", (req, res) => {
    return res.render("page-dice.html", { back: true })
})

//timer
server.get("/timer", (req, res) => {
    return res.render("page-timer.html", { back: true })
})

//units
server.get("/units", (req, res) => {
    return res.render("page-units.html", { back: true })
})




// turn on server
server.listen(3000)