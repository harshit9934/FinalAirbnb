const Home = require("../models/home");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    PageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res, next) => {
  console.log(req.body);
  req.session.isLoggedIn = true; // using session
  //res.cookie("isLoggedIn", true); // using  cookie

  // setting in one req  or current request
  //req.isLoggedIn = true; // and in everwhere we want to use this we can use isLoggedIn : req.isLoggedIn

  res.redirect("/");
};

// logout
exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
