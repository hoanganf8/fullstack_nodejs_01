const authController = {
  login: (req, res) => {
    res.render("auth/login", {
      layout: "layouts/layout.auth.ejs",
    });
  },
};

export default authController;
