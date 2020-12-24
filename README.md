# Overview
This is a template project customized exporter for Prometheus. 

##
# Get Started
## Implement your metrics output in app.js
```
...
else if('/metrics' == pathName) {
        // Get request method.
        var method = req.method

        if ("GET" === method) {
            // Implement your metrics output here
        }
    }
...
``` 

## Modify your project name and version in package.json

```
{
  "name": "customized-exporter",
  "version": "0.1.0",
  ...
```

## Build your docker image
```
$ ./build_docker.sh
```

## Run your docker image

```
$ docker run -p 8080:8080 -e DEBUG=true -e PORT=8080 -d heretse/customized-exporter:0.1.0
```

