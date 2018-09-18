module.exports = {
  usersRouter: require('./users.js'),
  sampleRouter: require('./sample.js')
}




/*router.use('/user', function (req, res, next) {
  //console.log(req.params.name)
  // res.send('hello - ' + req.params.name);

  next()
});

router.use('/user', function (req, res, next) {
  console.log(req.params.name)
  req.params.name = 'sabarish';
  res.send('hello - ' + req.params.name);
});*/