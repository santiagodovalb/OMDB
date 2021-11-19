
const express = require("express");
const app = express();

const path = require('path');
// BODY PARSER
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//CORS
var cors = require("cors");
app.use(cors());

//DB
const db = require("./models/db");
const User = require("../api/models/User");

//LOGGER
const volleyball = require("volleyball");
app.use(volleyball);

//SESSION
const session = require("express-session");
app.use(session({ secret: "bootcamp" }));

// STATICS
app.use(express.static(path.join(__dirname, "../build")));

//PASSPORT
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    function (username, password, done) {
      User.findOne({ where: { username } })

        .then((user) => {
          if (!user) return done(null, false);

          user.hash(password, user.salt).then((hashed) => {
            if (hashed !== user.password) return done(null, false);
            return done(null, user);
          });
        })
        .catch(done);
    }
  )
);

//SERIALIZE
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then((user) => done(null, user))
    .catch(done);
});

//ROUTER
const router = require("./routes");

//redirigimos todos los pedidos con /api
app.use("/api", router);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

//SERVER UP
db.sync({ force: false })
  .then(function () {
    app.listen(process.env.PORT || 3001, function () {
      console.log("Server is listening on port 3001!");
      console.log("DB connected");
    });
  })
  .catch(console.error);
