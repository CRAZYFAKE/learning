'use strict';

let LogMO = function () {
    this.kind = '';
    this.action = '';
    this.level = '';
    this.info = '';
}

LogMO.prototype = {
    setAction: function (action) {
        this.action = action;
    },
    setKind: function (kind) {
        this.kind = kind;
    },
    setLevel: function (level) {
        this.level = level;
    },
    setInfo: function (info) {
        this.info = info;
    },
    getInfo: function () {
        return this.info;
    }
}


var match = function (action) {
    return action.replace(/\//g, '');
}

var roleconfigureRoles = function (action, reqBody, res, old) {
    return new Promise((resolve, reject) => {
        resolve({
            action: action, reqBody: reqBody, res: res, old: old
        })
    });
}

let run = function () {
    let log = new LogMO();
    log.setAction('/role/getlist');
    log.setKind(1);
    log.setLevel(1);
    log.setInfo('hey as holl');
    // console.log(log.getInfo());
    let url = match('/role/configureRoles');
    console.log(url);
    let action = 'roleconfigureRoles'
        , reqBody = {
            errorState: 403
        }, res = {
            name: 'yyx',
            age: 15
        }, old = {
            name: 'yyy',
            age: 24
        }
    let promise = eval('roleconfigureRoles' + '(action,reqBody,res,old)');
    promise.then(re => {
        console.log(typeof re['res']['name']);
        console.log(re);
        resolve(re);
    });
}

run();