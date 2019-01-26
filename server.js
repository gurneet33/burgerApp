var express = require("express");
var mysql = require("mysql");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3300;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "burger_db"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});

app.get("/", function (req, res) {
    connection.query("SELECT * FROM burgers", function (err, data) {
        if (err) throw err;

        res.render("index", {
            burgers: data
        });
    });
});

app.post("/", function (req, res) {
    connection.query("INSERT INTO burgers (burger_name) VALUES(?)", [req.body.burg], function (err, result) {
        if (err) throw err;
        res.redirect("/")
    });
});
app.listen(PORT, function () {
    console.log("Server listening on localhost:" + PORT)
})