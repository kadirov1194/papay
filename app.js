console.log("Web serverni boshlash");
const express = require("express");
const app = express();
const router = require("./router.js");
const router_bssr = require("./router_bssr.js");
const cookieParser = require("cookie-parser");

let session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session); //bu class
const Store = new MongoDBStore({
  // va Store objectini hosil qilyapmiz

  uri: process.env.MONGO_URL,
  collection: "sessions",
});

// 1: Kirish code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 2: Session Code
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 30,
    }, //for 30minut coocie ni ichida danniylar turadi
    store: Store,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(function (req, res, next) {
  res.locals.member = req.session.member;
  next();
});

// 3: View Code

app.set("views", "views");
app.set("view engine", "ejs");

// 4: Routing code

app.use("/resto", router_bssr); // ananaviy
app.use("/", router);

module.exports = app;
