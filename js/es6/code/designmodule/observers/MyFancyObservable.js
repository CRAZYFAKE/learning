var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Observable() {
    EventEmitter.call(this);
}
util.inherits(Observable, EventEmitter);

Observable.prototype.hello = function (name) {
    this.emit('hello', name);
};

module.exports.OB = Observable;