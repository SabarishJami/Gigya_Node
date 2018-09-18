import config from '../config/constants';
import gigya from 'node-gigya';
import jwt from 'jsonwebtoken';


const myGigya = new gigya(config.constants.Gigya.API_KEY, config.constants.Gigya.SECRET_KEY);

let tokenList = {};

exports.gigyaEndPointRestAPI = (gigyaMethod, params, callback) => {
    let gigyaMethodRequest = myGigya.request(gigyaMethod, params);
    gigyaMethodRequest.then(
        response => {
            console.log(response)
            callback(null, response)
        },
        err => {
            console.log(err);
            callback(err)
        }
    );
}


exports.jwtGeneration = (req, res, next) => {
    let uidObj = {
        UID: req.body.UID
    }
    const token = jwt.sign(uidObj, 'secreatKey', {
        expiresIn: 60
    })

    let response = {
        UID: req.body.UID,
        token: token,
        refToken: refreshToken
    }
    req.body.resp = response;
    next();
}



exports.jwtTokenDecode = (req, res, next) => {
    if (req.url !== '/login' && req.url !== '/resetPassword') {
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        console.log(token);
        if (token) {
            jwt.verify(token, 'secreatKey', function (err, decoded) {
                if (err && err.name == 'TokenExpiredError') {
                    const payload = jwt.verify(token, 'secreatKey', {
                        ignoreExpiration: true
                    });
                    req.body.UID = payload.UID;
                    module.exports.jwtGeneration(req, res, () => {
                        next();
                    })

                } else if (err) {
                    err.stat = 'Failed to authenticate token.'
                    return res.json(err);
                } else {
                    console.log(decoded)
                    req.body.UID = decoded.UID;
                    next();
                }
            });

        } else {
            res.send({
                message: 'No Token Generated'
            })
        }
    } else {
        next();
    }
}

exports.authMailAndUID = (req, res, next) => {
    let uid = req.body.UID;
    let userId = req.body.userId;

    const params = {
        uid: req.body.UID
    }
    const gigyaMethod = config.constants.gigyaEndPoints.accounts.getAccountInfo;
    module.exports.gigyaEndPointRestAPI(gigyaMethod, params, (err, response) => {
        if (err)
            res.send(err)
        else if (response && response.UID == uid && response.profile.email == userId) {
            console.log('Login Validated');
            if (req.url == '/login') {
                module.exports.jwtGeneration(req, response, () => {
                    if (err)
                        res.send(err)
                    else {
                        let loginResp = req.body.resp;
                        res.send(loginResp);
                    }
                })
                // res.send(response);
            } else
                next()
        } else {
            res.send({
                message: 'invalid credentials'
            })
        }
    })
}