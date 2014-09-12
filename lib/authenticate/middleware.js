var User = require('models/user');

var authenticated = function (err, req, res, next) {
  console.log('FOOOOOOODASSE '+ req.isAuthenticated());
  if (req.isAuthenticated()) { return next(); }
  return res.redirect('/login');
}

var current_user = function (req, res, next) {
console.log('FUCK THIS');
  if (null === req.session.passport) {
    return next();
  }

  new User({ id: req.session.passport.user }).fetch()
    .then(function (user) {
    
      if (!user) {
        return next(
        console.log("nouser")
        /*new Error(
          'No user found with `'+ req.session.passport.user +'`'
        )
        */
        );
      }
      res.locals.user = req.user;
      return next();
    })
    .catch(function (err) {
      console.log('help');
      return next(err);
    });
}
/*
if (req.session.passport && req.session.passport.user) {
    new User({ id: req.session.passport.user }).fetch()
      .then(function (user) {        res.render('pages/index', {
          title: res.app.get('title'),
          user: user.toJSON()
        });
      })
  } else {
    res.render('pages/index', {
      title: res.app.get('title')
    });
  }
*/

module.exports = {
  authenticated: authenticated,
  current_user: current_user
};
