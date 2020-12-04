const fetch = require('node-fetch')
const config = require('../openstack-config')

module.exports = async function(stack_id, project_token) {
    try {
        return await fetch(`${config.orchestration_url}/${config.tenant_id}/stacks/${stack_id}`, {
            headers: { 'X-Auth-Token': project_token },
        })
        .then(async res => await res.json())
    } catch (err) {
        throw err
    }
}