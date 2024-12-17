const routes = require("express").Router();
const passport = require("passport");

routes.use("/", require("./swagger"));

// routes.get('/', (req, res) => {
//   // #swagger.tags=["Hello World"]
//     res.send("Home Page ...");
//   });

routes.use("/users", require("./users"));
routes.use("/stocks", require("./stocks"));

// Route to start GitHub authentication
routes.get('/login', passport.authenticate('github', (req, res) => {})
);

routes.get('/logout',function(req, res, next){
  req.logout(function(err) {
    if(err){return next(err);}
    res.redirect('/');
    }
  )
});

module.exports = routes;