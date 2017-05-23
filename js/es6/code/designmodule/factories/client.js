var factory = require('./factory');
var createFa = factory.create({
    company: 'eisoo',
    size: 1000,
    kind: '传统'
});
console.log(createFa.options)
console.log(factory.name);
console.log(factory.version);