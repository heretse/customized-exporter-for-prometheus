const fetch = require('node-fetch')
const config = require('../adp-config')

module.exports = async function () {
    try {
        return await fetch(`${config.base_url}/admin/login`, {
            method: 'post',
            body: "",
            headers: {
                'Authorization': 'ZETA',
                'login': 'admin',
                'passHash': 'd864934644cd577757afa824138ae169fd5ecbed'
            },
        })
        .then(async res => await res.json())
        .then(async res => {
            return await res.sid
        })
    } catch (err) {
        throw err
    }
}