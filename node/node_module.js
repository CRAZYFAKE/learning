function Module(id, parent) {

    this._id = id;
    this.exports = {};
    this.parent = parent;
    if(parent && parent.children) {
        parent.children.push(this);
    }

    this.filename = null;
    this.loaded = false;
    this.children = [];
}

/**
 * node中一个正常的javascript文件被包装成下面的样式
 */
(function(exports, require, module, __filename, __dirname){
    var math = require('match');
    exports.area = function(radius) {
        return Math.PI * radius * radius;
    }
});