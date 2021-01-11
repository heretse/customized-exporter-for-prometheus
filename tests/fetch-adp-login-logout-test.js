const config = require('../mns-config');
const fetchLogin = require('../libs/fetch-adp-login');
const fetchPtuser = require('../libs/fetch-adp-ptuser');
const fetchLogout = require('../libs/fetch-adp-logout');

(async() => {
    let session_id = await fetchLogin()

    console.log(session_id)

    let statistic = await fetchPtuser(session_id)

    console.log(statistic)

    let status = await fetchLogout(session_id)

    console.log(status)
})();
