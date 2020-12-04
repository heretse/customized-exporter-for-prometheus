const fetch = require('node-fetch')

module.exports = async function(tenant_id, stack_id, project_token) {
    try {
        return await fetch(`http://192.168.44.12:8004/v1/${tenant_id}/stacks/${stack_id}`, {
            headers: { 'X-Auth-Token': project_token },
        })
        .then(async res => await res.json())
    } catch (err) {
        throw err
    }
}