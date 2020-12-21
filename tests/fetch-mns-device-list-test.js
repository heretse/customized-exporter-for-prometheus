const fetchDeviceList = require('../libs/fetch-mns-device-list');

(async() => {
    let devices = await fetchDeviceList()

    devices.map(device => device.imei).forEach(element => console.log(element))
})();