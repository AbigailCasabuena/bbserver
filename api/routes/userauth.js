module.exports = function(app, passport) {
    app.post("/userauth", passport.authenticate('local-login'), function(req, res) {
          res.status(200);
          res.json(req.user);
          //console.log("ok")
    });

    /*app.get('/',(req,res,next)=>{
        res.status(200).json({
            message: 'user auth get'
        });
        console.log('ok');
    });*/
}