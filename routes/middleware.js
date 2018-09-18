import {
    jwtTokenDecode,
    authMailAndUID
} from "../helper/helper";


const authCredential = [
    jwtTokenDecode,
    authMailAndUID
]




module.exports = {
    apiAuth: authCredential
}