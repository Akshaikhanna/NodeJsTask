const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;

//middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(session({ secret: "key", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//mock user
const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Invalid username and password" });
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

//routes
app.get("/", (req, res) => {
  res.send("homepage");
});

app.get("/login", (req, res) => {
  res.send("loginpage");
});

//authentication routes
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.get("/dashboard", isAuthenticated, (req, res) => {
  res.send(`Welcome ${req.user.username}! This is your dashboard`);
});

// logout
app.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// port
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running in ${port}`);
});
