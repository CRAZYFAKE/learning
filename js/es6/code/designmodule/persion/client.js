var Person = require('./person').Person;
var version = require('./person').Version;
var person = new Person({
    name: 'john'
});

console.log(version);
console.log(person)
console.log(person.getName())
console.log(person.greet());