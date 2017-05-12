var fs = require('fs');
var path = require('path');

function readdirPromisify(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, list) => {
            if (err) {
                reject(err);
            }
            resolve(list);
        });
    });
}

function statPromisify(dir) {
    return new Promise((resolve, reject) => {
        fs.stat(dir, (err, stats) => {
            if (err) {
                reject(err);
            }
//            console.log(stats);
            resolve(stats);
        });
    });
}

function listDir(dir) {
    return statPromisify(dir).then(
        function (stats) {
//                console.log(stats.length);
            if (stats.isDirectory()) {
                return readdirPromisify(dir).then(list =>
                    Promise.all(list.map(item =>
                        listDir(path.resolve(dir, item))
                    ))
                ).then(subtree => [].concat(subtree));
            } else {
		console.log(dir);
                return [dir];
            }
        });
}

console.log(listDir('/mnt/www/nrj_app/views'));
