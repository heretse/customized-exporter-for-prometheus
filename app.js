// Include http ,url module.
var http = require('http');
var url = require('url');

const config = require('./openstack-config')
const fetchTokens = require('./libs/fetch-tokens')
const fetchStackList = require('./libs/fetch-stack-list')

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
            (async() => {
                let token = await fetchTokens(config.username, config.password)

                let stacks = await fetchStackList(token)

                var re = new RegExp(config.stackname_filter)

                res.setHeader('Content-Type', 'text/plain; version=0.0.4; charset=utf-8')

                // {cloud="mycloud",hypervisor_hostname="controller-0",nova_service_status="enabled"} 33.0
                
                let stackCount = stacks.filter(stack => re.test(stack.stack_name)).length

                res.end(
                    `opentack_stack_total{filter="${config.stackname_filter}"} ${stackCount}`
                )
                //res.end(JSON.stringify({ name: queryData.stack_name, count:  }))
            })();
        }
    }
});

// Http server listen on port 3000.
httpServer.listen(process.env.PORT || 3000)

console.log(`Server is started and listening on port ${httpServer.address().port}.`)