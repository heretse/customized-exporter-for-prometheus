const config = require('../mns-config');
const fetchToken = require('../libs/fetch-mns-token');

(async() => {
    let token = await fetchToken(config.username, config.password)

    console.log(token)
})();
