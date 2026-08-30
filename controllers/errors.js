exports.pageNotFound = (req, res, next) => {
  res.status(404).render("error", {
    PageTitle: "Page Not Found",
    currentPage: "404",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
    userType: req.session.userType
  });
};
