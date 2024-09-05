const request = require('request');
const fs = require('fs');
var url = "";
var file = fs.createWriteStream("C:\\SWGTest\\nexus_test_00.tre");
request(url).on('error', err => {
    process.send("download error " + err);
    file.close();
    fs.unlink(dest);
    if (cb) cb(err.message);
})
.on('close', e=>console.log('done'))
.pipe(file);
