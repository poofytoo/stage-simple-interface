/*
 * POST service functions.
 */
 
exports.go = function(req, res) {
  console.log(req.body.cmds);
  res.send("ok");
};
