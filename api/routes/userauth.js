module.exports = function(app, passport) {
    app.post("/api/userauth", passport.authenticate('local-login'), function(req, res) {
          res.status(200);
          res.json(req.user);
    });
}    