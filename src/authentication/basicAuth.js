

const authUser = (req, res, next) => {
    if(!req.session.userTypeId) {
        res.redirect("/loginForm")
    }

    next()
};

const loggedInUser = (req, res, next) => {
    if(req.session.userTypeId) {

        switch(req.session.userType){
            case "student":
                res.redirect("/studentPage")
                break;
            case "teacher":
                res.redirect("/teacherPage")
                break;
            case "admin":
                res.redirect("/userForm")
                break;
        }
       
    }

    

    
};

module.exports = {
    authUser,
    loggedInUser
}