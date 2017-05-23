function MyClass(options) {
    this.options = options;
}

function create(options) {
    // modify the options here if you want
    return new MyClass(options);
}
var name = 'Facroty Design Module';
var version = 'v1.0.0';
module.exports = {
    name: name,
    create: create,
    version: version
};