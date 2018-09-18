/* const gigya_cred = {
    API_KEY: '3_DUUIeN2KHheyyUza_J2503FdmWdqUDoZCdt17sKYQ7fM45eaS8EYkFl7cmPliRwz',
    SECRET_KEY: 'Nn0TiC9l0nlPPCnFl0Ci6GTsk2bXZeSwtsCLwf2bqg4'
};
//const myGigya = new gigya(gigya_cred.API_KEY, gigya_cred.SECRET_KEY);
const myGigya = new gigya(config.constants.Gigya.API_KEY, config.constants.Gigya.API_KEY.SECRET_KEY); */




const setAccountInfo = (response, callback) => {
    console.log('**************************')
    console.log(response);
    var params = {
        Profile: new Profile(response.profile)
    }
    console.log(params)
    const registRequest = myGigya.accounts.setAccountInfo(params);
    registRequest.then(
        response => {
            //console.log(res)
            callback(null, response)
        },
        err => {
            console.log('error')
            console.log(err)
            callback(null, err)
        }
    );
}


const setSchema = (response, callback) => {
    var params = {
        profileSchema: {
            fields: {
                "firstName": {
                    "writeAccess": "clientModify",
                    "required": true
                },
                "lastName": {
                    "writeAccess": "clientModify",
                    "required": true
                }
            }
        }
    }
    console.log(params)

    const gigyaMethod = config.constants.gigyaEndPoints.accounts.setSchema;
    gigyaEndPointRestAPI(gigyaMethod, params, callback)
}