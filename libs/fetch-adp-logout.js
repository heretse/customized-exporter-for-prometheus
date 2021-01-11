const fetch = require('node-fetch')
const config = require('../adp-config')

module.exports = async function (session_id) {
    try {
        return await fetch(`${config.base_url}/admin/logout`, {
            method: 'post',
            body: "",
            headers: {
                'sid': `${session_id}`,
            },
        })
        .then(async res => await res.status)
    } catch (err) {
        throw err
    }
}