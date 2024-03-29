const fetch = require('node-fetch');
const config = require('../openstack-config')

module.exports = async function(project_token) {
    try {
        return await fetch(`${config.server_url}/${config.tenant_id}/servers`, {
            headers: { 'X-Auth-Token': project_token },
        })
        .then(async res => await res.json())
        .then(async json => json.servers)
    } catch (err) {
        throw err
    }
}