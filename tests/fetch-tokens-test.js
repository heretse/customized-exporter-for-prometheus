var fetchTokens = require('../libs/fetch-tokens');

(async() => {
    let token = await fetchTokens('admin', 'admin')

    console.log(token)
})();
