const fetch = require('node-fetch')
const config = require('../mns-config')

module.exports = async function (username, password) {
    try {
        return await fetch(`${config.base_url}/login/`, {
            method: 'post',
            body: JSON.stringify({
                "username": username,
                "password": password
            }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(async res => await res.json())
        .then(async res => {
            return await res.auth_token
        })
    } catch (err) {
        throw err
    }
}