const fetch = require('node-fetch');
const config = require('../mns-config')

module.exports = async function() {
    try {
        return await fetch(`${config.base_url}/device_list/`)
        .then(async res => await res.json())
    } catch (err) {
        throw err
    }
}