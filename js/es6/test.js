var fs = require('fs');
var json = [{
    'a': 2,
    'b': 3
}, {
    'a': 2,
    'b': 3
}];
var root = '/var/log/nrj';
var file = '/output.json';
if (!fs.existsSync(root)) {
    if (fs.mkdirSync(root)) {
        console.log('sss');
    }
}
fs.writeFileSync(root + file, JSON.stringify(json));
var JsonObj = JSON.parse(json);
console.log(JsonObj);