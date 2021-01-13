const fetch = require('node-fetch')
const config = require('../adp-config')

module.exports = async function (session_id) {
    try {
        return await fetch(`${config.base_url}/dashboard/adp/ptuser`, {
            method: 'post',
            body: JSON.stringify({"period": "10", "topN": "10"}),
            headers: {
                'Content-Type': 'application/json',
                'sid': `${session_id}`,
            },
        })
        .then(async res => await res.json())
        .then(async res => {
            
            // return [{"key":"10.10.0.8","count":2594.0,"layer2":[{"key":"TCP Port SYN Scan","count":2000.0},{"key":"TCP SYN Flood","count":594.0}]}]    
            
            return await res.statistic
        })
    } catch (err) {
        throw err
    }
}