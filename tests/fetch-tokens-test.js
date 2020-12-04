const config = require('../openstack-config');
const fetchTokens = require('../libs/fetch-tokens');

(async() => {
    let token = await fetchTokens(config.username, config.password)

    console.log(token)
})();
