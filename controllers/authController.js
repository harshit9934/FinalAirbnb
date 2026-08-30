const { check, validationResult } = require("express-validator");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    PageTitle: "Login",
    currentPage: "login",
    isLoggedIn: req.session.isLoggedIn || false,
    errors: [],
    oldInput: { email: "" },
    user: req.session.user,
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).render("auth/login", {
      PageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["User does not exist"],
      oldInput: { email },
      user: {},
    });
  }

  // to match password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(422).render("auth/login", {
      PageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["Invalid Password"],
      oldInput: { email },
      user: {},
    });
  }

  req.session.isLoggedIn = true;
  req.session.user = {
    _id: user._id.toString(),
    FirstName: user.FirstName,
    LastName: user.LastName,
    email: user.email,
    userType: user.userType,
  };
  console.log("Session user data:", req.session.user);
  console.log("UserType from DB:", user.userType);
  await req.session.save();
  res.redirect("/");
};

// logout
exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

//getsignup
exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    PageTitle: "signup",
    currentPage: "signup",
    isLoggedIn: req.session.isLoggedIn || false,
    errors: [],
    user: {},
    oldInput: {
      FirstName: "",
      LastName: "",
      email: "",
      password: "",
      userType: "",
    },
  });
};

exports.postSignup = [
  check("FirstName")
    .notEmpty()
    .withMessage("first name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First name should contain only alphabets"),

  check("LastName")
    .matches(/^[A-Za-z\s]*$/)
    .withMessage("Last name should contain only alphabets"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valide email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 character ")
    .matches(/[a-z]/)
    .withMessage("Password must contain one  lower case")
    .matches(/[A-Z]/)
    .withMessage("Password must contain one  upper case")
    .matches(/[0-9]/)
    .withMessage("Password must contain one  number"),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password do not match");
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("Please select a User Type")
    .isIn(["guest", "host"])
    .withMessage("Invalid user Type "),

  check("terms")
    .notEmpty()
    .withMessage("Please accept the term and condition")
    .custom((value, { req }) => {
      if (value !== "on") {
        throw new Error("Please accept the term and condition");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        PageTitle: "Signup",
        currentPage: "Signup",
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        oldInput: {
          FirstName: req.body.FirstName,
          LastName: req.body.LastName,
          email: req.body.email,
          password: req.body.password,
          userType: req.body.userType,
          user: {},
        },
      });
    }
    console.log(req.body);
    //req.session.isLoggedIn = true; // using session

    const { FirstName, LastName, email, password, userType } = req.body;

    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          FirstName,
          LastName,
          email,
          password: hashedPassword,
          userType,
        });
        return user.save();
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        return res.status(422).render("auth/signup", {
          PageTitle: "Signup",
          currentPage: "Signup",
          isLoggedIn: false,
          errors: [err.message],
          oldInput: {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            email: req.body.email,
            password: req.body.password,
            userType: req.body.userType,
          },
        });
      });

    //making a new user and saving it to the database
    //   const user = new User({
    //     FirstName: req.body.FirstName,
    //     LastName: req.body.LastName,
    //     email: req.body.email,
    //     password: req.body.password,
    //     userType: req.body.userType,
    //   });
    //   user
    //     .save()
    //     .then(() => {
    //       res.redirect("/login");
    //     })
    //     .catch((error) => {
    //       console.log("Error saving user:", error);
    //       return res.status(422).render("auth/signup", {
    //         PageTitle: "Signup",
    //         currentPage: "Signup",
    //         isLoggedIn: false,
    //         errors: [error.message],
    //         oldInput: {
    //           FirstName: req.body.FirstName,
    //           LastName: req.body.LastName,
    //           email: req.body.email,
    //           password: req.body.password,
    //           userType: req.body.userType,
    //         },
    //       });
    //     });
  },
];
