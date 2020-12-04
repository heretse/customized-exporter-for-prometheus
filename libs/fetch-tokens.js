const fetch = require('node-fetch')

module.exports = async function (username, password) {
    try {
        return await fetch('http://192.168.44.12:5000/v3/auth/tokens', {
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