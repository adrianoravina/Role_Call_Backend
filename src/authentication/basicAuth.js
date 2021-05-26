const authUser = (req, res, next) => {
  if (!req.session.userTypeId) {
    res.redirect("/loginForm");
  }


  next() 
};

const loggedInUser = (req, res, next) => {
  if (req.session.userTypeId) {
    switch (req.session.userType) {
      case "student":
        res.render("/studentPage");
        break;
      case "teacher":
        res.redirect("/teacherPage");
        break;
      case "admin":
        res.redirect("/userForm");
        break;
    }
  }

  next();
};

module.exports = {
  authUser,
  loggedInUser,
};
