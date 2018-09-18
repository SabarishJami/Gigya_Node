const config = {};

config.constants = {
    Gigya: {
        API_KEY: '',
        SECRET_KEY: ''
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