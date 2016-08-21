/* Logout user and end current session */
module.exports.logout = function( req, res) {
  req.session.reset();
  res.redirect('/');
};