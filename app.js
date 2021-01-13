// Include http ,url module.
var http = require('http');
var url = require('url');
var imei = require('node-imei');

const config = require('./openstack-config')
const fetchTokens = require('./libs/fetch-tokens')
const fetchStackList = require('./libs/fetch-stack-list')
const fetchDeviceList = require('./libs/fetch-mns-device-list');

const fetchLogin = require('./libs/fetch-adp-login');
const fetchPtuser = require('./libs/fetch-adp-ptuser');
const fetchLogout = require('./libs/fetch-adp-logout');

var IMEI = new imei()

// Create http server.
var httpServer = http.createServer(function (req, res) {

    // Get client request url.
    var reqUrlString = req.url

    // Get client request path name.
    var urlParsed = url.parse(reqUrlString, true, false)
    var pathName = urlParsed.pathname
    var queryData = urlParsed.query

    // If request login action.
    if('/stacksCount' == pathName)
    {
        // Get request method.
        var method = req.method

        // If get.
        if ("GET" === method) {
            console.log(queryData.stack_name);

            (async() => {
                let token = await fetchTokens(config.username, config.password)

                let stacks = await fetchStackList(token)

                var re = new RegExp(queryData.stack_name)

                res.setHeader('Content-Type', 'text/json')
                res.end(JSON.stringify({ name: queryData.stack_name, count: stacks.filter(stack => re.test(stack.stack_name)).length }))
            })();
        }
    } else if('/metrics' == pathName)
    {
        // Get request method.
        var method = req.method

        if ("GET" === method) {
            if (process.env.DEBUG) {
                let stackCount = 1.0

                if (stackCount >= 1) {
                    stackCount += Math.round(Math.random() * 10).toFixed(1) % 2
                }

                let hackedCount = Math.round(Math.random() * 10 + 1).toFixed(0)
                let numberAttacks = Math.round(Math.random() * 1000 + 1).toFixed(1) % 3
                let ipAddr = `10.10.10.${Math.round(Math.random() * 255 + 1).toFixed(0)}`

                let attackTypes = ["TCP Port SYN Scan", "TCP SYN Flood", "Smurf", "Ping of Death", "LAND Attack", "Teardrop"]
                let attackType = attackTypes[Math.round(Math.random() * 1000).toFixed(0) % attackTypes.length]

                res.write("# HELP specificed_stackname_count Specificed stack size\n")

                res.write("# TYPE specificed_stackname_count gauge\n")
                res.write(`openstack_stack_total{name="${config.stackname_filter}"} ${stackCount}\n`)

                res.write("# HELP hacked_ue_count Hacked UE count\n")
                res.write("# TYPE hacked_ue_count gauge\n")
                res.write(`hacked_ue_total{type="mifi"} ${hackedCount}\n`)

                res.write("# HELP ue_under_attack Attacks metrics (Number of attacks)\n")
                res.write("# TYPE ue_under_attack gauge\n")
                res.write(`ue_under_attack{type="${attackType}" imei="${IMEI.random()}" ip="${ipAddr}"} ${numberAttacks}`)
                
                res.end()
            } else {
                (async() => {
                    let token = await fetchTokens(config.username, config.password)

                    let stacks = await fetchStackList(token)

                    var re = new RegExp(config.stackname_filter)

                    res.setHeader('Content-Type', 'text/plain; version=0.0.4; charset=utf-8')

                    stackCount = stacks.filter(stack => re.test(stack.stack_name)).length.toFixed(1)

                    res.write(`# HELP specificed_stackname_count Specificed stack size\n# TYPE specificed_stackname_count gauge\nopenstack_stack_total{name="${config.stackname_filter}"} ${stackCount}\n`)

                    let devices = await fetchDeviceList()

                    // let hackedCount = devices.filter(device => device.hacked_status > 0).length

                    res.write("# HELP hacked_ue_count Hacked UE count\n")
                    res.write("# TYPE hacked_ue_count gauge\n")

                    let session_id = await fetchLogin()
                    let statistic = await fetchPtuser(session_id)
                    let status = await fetchLogout(session_id)

                    let hackedCount = statistic.length
                    res.write(`hacked_ue_total{type="mifi"} ${hackedCount}\n`)

                    let result = []

                    statistic.map(device => {
                        device.layer2.forEach(attack => {
                            attack.ip = device.key
                            let foundObj = devices.find(element => element.ip === device.key)
                            attack.imei = foundObj ? foundObj.imei : ""
                            attack.type = attack.key
                            delete attack["key"]
                        })

                        return device.layer2
                    }).forEach(attacks => {
                        result = result.concat(attacks)
                    })

                    res.write("# HELP ue_under_attack Attacks metrics (Number of attacks)\n")
                    res.write("# TYPE ue_under_attack gauge\n")
                    result.forEach(attack => {    
                        res.write(`ue_under_attack{type="${attack.type}" imei="${attack.imei}" ip="${attack.ip}"} ${attack.count}\n`)
                    })

                    res.end()
                })();
            }
        }
    }
});

// Http server listen on port 3000.
httpServer.listen(process.env.PORT || 3000)

console.log(`Server is started and listening on port ${httpServer.address().port}.`)