const express = require("express");

const bodyParser = require("body-parser");

const session = require("express-session");
const app = express();
const sequelize = require("./utils/database");

const authMiddleware =  require('./middlewares/is-auth');

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set("view engine", "ejs");

app.use(
    session({
      secret: "thisIsSecretForEncryption", //for signing hash which secretl stores our id to session
      resave: false,
      saveUninitialized: true,
      cookie: { /* secure: true  */ }
    })
  );
  const homeRoutes = require("./routes/home");
  const authRoutes = require("./routes/auth");

  app.use(authMiddleware, homeRoutes);
  app.use('/auth', authRoutes);
  

  sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync();

app.listen(8080, function() {
    console.log(`Server listening on port 8080`);
});