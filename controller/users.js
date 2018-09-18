import async from 'async';
import jwt from 'jsonwebtoken';
import gigya from 'node-gigya';
import config from '../config/constants'
import {
    gigyaEndPointRestAPI
} from '../helper/helper'
import dbCalls from '../db/db-querries';



const gigyaLoginRequest = (logInId, password) => {
    return (callback) => {
        const params = {
            loginID: logInId,
            password: password,
            targetEnv: "mobile"
        }
        const gigyaMethod = config.constants.gigyaEndPoints.accounts.login;
        gigyaEndPointRestAPI(gigyaMethod, params, callback)
    }

}

const gigyaAccountInfo = (response, callback) => {
    console.log('uid-----' + response.UID)
    console.log('regToken-----' + response.regToken)
    const params = {
        uid: response.UID
    }
    const gigyaMethod = config.constants.gigyaEndPoints.accounts.getAccountInfo;
    gigyaEndPointRestAPI(gigyaMethod, params, callback)
}




const initRegistration = (userId, password, profile) => {
    return (callback) => {
        const params = {
            isLite: false,
            format: 'json',
            httpStatusCodes: true
        }

        const gigyaMethod = config.constants.gigyaEndPoints.accounts.initRegistration;
        gigyaEndPointRestAPI(gigyaMethod, params, (err, response) => {
            if (err) callback(err)
            else {
                response.userId = userId;
                response.password = password;
                response.profile = profile;
                callback(null, response)
            }
        })
    }
}
const gigyaRegisterUser = (response, callback) => {
    console.log(response);
    const params = {
        // username: response.userId,
        email: response.userId,
        password: response.password,
        regToken: response.regToken,
        finalizeRegistration: true,
        targetEnv: 'mobile'
    }

    const gigyaMethod = config.constants.gigyaEndPoints.accounts.register;
    gigyaEndPointRestAPI(gigyaMethod, params, callback)
}

const gigyaRegisterUserDetails = (response, callback) => {
    const registRequest = myGigya.accounts.getSchema();
    registRequest.then(
        response => {

            callback(null, response)
        },
        err => {
            console.log('error')
            console.log(err)
            callback(null, err)
        }
    );
}


const gigyaUserAccountLogOut = (uid) => {
    return (callback) => {
        var params = {
            "uid": uid
        }
        console.log(params)
        const gigyaMethod = config.constants.gigyaEndPoints.accounts.logout;
        gigyaEndPointRestAPI(gigyaMethod, params, callback)

    }
}
const resetNewPassword = (response, callback) => {
    console.log(response.UID)
    var params = {
        "passwordResetToken": response.passwordResetToken,
        "newPassword": "R@ptor21"
    }
    console.log(params)
    const gigyaMethod = config.constants.gigyaEndPoints.accounts.resetPassword;
    gigyaEndPointRestAPI(gigyaMethod, params, callback)
}

const passwordResetTokenGen = (userId) => {
    // if (response && response.passwordResetToken) {
    return (callback) => {
        var params = {
            "loginID": userId,
            "sendEmail": false
        }
        console.log(params)
        const gigyaMethod = config.constants.gigyaEndPoints.accounts.resetPassword;
        gigyaEndPointRestAPI(gigyaMethod, params, callback)
    }
    //}
    /*  else{
         var params = {
             "passwordResetToken": response.passwordResetToken,
             "newPassword": "R@ptor21"
         }
         console.log(params)
         const gigyaMethod = config.constants.gigyaEndPoints.accounts.resetPassword;
         gigyaEndPointRestAPI(gigyaMethod, params, callback)
     } */

}



const resetPassword = (userId, cb) => {
    async.waterfall([
        passwordResetTokenGen(userId),
        resetNewPassword
        //gigyaRegisterUserDetails
    ], cb)
}


const registerUser = (userId, password, profile, cb) => {
    async.waterfall([
        initRegistration(userId, password, profile),
        //setSchema,
        gigyaRegisterUser
        //setAccountInfo
        //gigyaRegisterUserDetails
    ], cb)
}

const logOut = (uid, cb) => {
    async.waterfall([
        gigyaUserAccountLogOut(uid),
        gigyaAccountInfo
    ], cb)
}

const userLogIn = (logInId, password, cb) => {
    async.waterfall([
        gigyaLoginRequest(logInId, password),
        // gigyaAccountInfo
        // jwtGeneration
    ], cb)
}

const accountSearch = (userId, callback) => {
    let query = "SELECT * FROM accounts where profile.email='" + userId + "'";
    var params = {
        query: query
    }
    console.log(params)
    const gigyaMethod = config.constants.gigyaEndPoints.accounts.search;
    gigyaEndPointRestAPI(gigyaMethod, params, callback)
}


module.exports = {
    userRegistration: registerUser,
    userLogIn: userLogIn,
    logOut: logOut,
    resetPassword: resetPassword,
    accountSearch: accountSearch
}