const fetch = require('node-fetch')
const config = require('../openstack-config')

module.exports = async function (username, password) {
    try {
        return await fetch(`${config.keystone_url}/auth/tokens`, {
            method: 'post',
            body: JSON.stringify({
                "auth": {
                    "identity": {
                        "methods": [
                            "password"
                        ],
                        "password": {
                            "user": {
                                "name": username,
                                "domain": {
                                    "name": "Default"
                                },
                                "password": password
                            }
                        }
                    },
                    "scope": {
                        "project": {
                            "domain": {
                                "id": "default"
                            },
                            "name": "admin"
                        }
                    }
                }
            }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(async res => {
            return await res.headers.get('x-subject-token')
        })
    } catch (err) {
        throw err
    }
}