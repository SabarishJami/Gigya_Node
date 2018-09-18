const config = {};

config.constants = {
    Gigya: {
        API_KEY: '3_DUUIeN2KHheyyUza_J2503FdmWdqUDoZCdt17sKYQ7fM45eaS8EYkFl7cmPliRwz',
        SECRET_KEY: 'Nn0TiC9l0nlPPCnFl0Ci6GTsk2bXZeSwtsCLwf2bqg4'
    },
    gigyaEndPoints: {
        accounts: {
            login: 'accounts.login',
            getAccountInfo: 'accounts.getAccountInfo',
            initRegistration: 'accounts.initRegistration',
            register: 'accounts.register',
            setSchema: 'accounts.setSchema',
            logout: 'accounts.logout',
            resetPassword: 'accounts.resetPassword',
            search: 'accounts.search'
        }
    }
}

module.exports = config;