// var OSWrap = require('openstack-heat-wrapper');
// var keystone = new OSWrap.Keystone('http://192.168.44.12:5000/v3');
 
const fetch = require('node-fetch');

module.exports = async function(project_token) {
    try {
        return await fetch('http://192.168.44.12:8004/v1/admin/stacks', {
            headers: { 'X-Auth-Token': project_token },
        })
        .then(async res => await res.json())
        .then(async json => json.stacks)
    } catch (err) {
        throw err
    }
}