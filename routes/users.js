var router = require('express').Router();
var usersController = require('../controller/users.js');
//var redis = require('redis');
import {
  apiAuth
} from "./middleware";



router.post('/register', (req, res) => {
  //let userId = req.body.uid;
  //let password = req.body.password;
  console.log('hi');
  console.log(req.body.userObj)
  let {
    userId,
    password,
    Profile
  } = req.body.userObj;
  console.log(Profile);
  usersController.userRegistration(userId, password, Profile, (err, data) => {
    if (err)
      res.send(err)
    else
      res.send(data)
  })

});

router.post('/logout', apiAuth, (req, res) => {
  //let userId = req.body.uid;
  //let password = req.body.password;
  console.log('hi');
  console.log(req.body.UID)
  let uid = req.body.UID;
  usersController.logOut(uid, (err, data) => {
    if (err)
      res.send(err)
    else {
      data.token = req.body.resp.token;
      res.send(data)
    }
  })

});




router.post('/login', (req, res, next) => {
  let logInId = req.body.userId;
  let password = req.body.password;
  usersController.userLogIn(logInId, password, (err, data) => {
    if (err) {
      console.log(err)
      res.send(err)
    } else {
      //res.send(data);
      req.body.UID = data.UID;
      next();
    }
  });
}, apiAuth);


router.post('/resetPassword',
  (req, res) => {
    let userId = req.body.userId;
    usersController.resetPassword(userId, (err, data) => {
      if (err)
        res.send(err)
      else
        res.send(data)
    })

  });


module.exports = router;