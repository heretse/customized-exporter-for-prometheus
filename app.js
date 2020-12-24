// Include http ,url module.
var http = require('http');
var url = require('url');
var imei = require('node-imei');

const config = require('./openstack-config')
const fetchTokens = require('./libs/fetch-tokens')
const fetchStackList = require('./libs/fetch-stack-list')
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

                let hackedCount = Math.round(Math.random() * 10).toFixed(1) % 3

                let numberAttacks = Math.round(Math.random() * 5 + 1).toFixed(1) % 3
                let ipAddr = `10.10.10.${Math.round(Math.random() * 255 + 1).toFixed(0)}`
                let attackType = "ddos"

                let text = "# HELP specificed_stackname_count Specificed stack size\n"

                text += "# TYPE specificed_stackname_count gauge\n"
                text += `opentack_stack_total{name="${config.stackname_filter}"} ${stackCount}\n`

                text += "# HELP hacked_ue_count Hacked UE count\n"
                text += "# TYPE hacked_ue_count gauge\n"
                text += `hacked_ue_total{type="mifi"} ${hackedCount}\n`

                text += "# HELP ue_under_attack Attacks metrics (Number of attacks)\n"
                text += "# TYPE ue_under_attack gauge\n"
                text += `ue_under_attack{type="${attackType}" imei="${IMEI.random()}" ip="${ipAddr}"} ${numberAttacks}`
                
                res.end(text)
            } else {
                (async() => {
                    let token = await fetchTokens(config.username, config.password)

                    let stacks = await fetchStackList(token)

                    var re = new RegExp(config.stackname_filter)

                    res.setHeader('Content-Type', 'text/plain; version=0.0.4; charset=utf-8')

                    stackCount = stacks.filter(stack => re.test(stack.stack_name)).length.toFixed(1)

                    res.end(
                        `# HELP specificed_stackname_count Specificed stack size\n# TYPE specificed_stackname_count gauge\nopentack_stack_total{name="${config.stackname_filter}"} ${stackCount}`
                    )
                })();
            }
        }
    }
});

// Http server listen on port 3000.
httpServer.listen(process.env.PORT || 3000)

console.log(`Server is started and listening on port ${httpServer.address().port}.`)