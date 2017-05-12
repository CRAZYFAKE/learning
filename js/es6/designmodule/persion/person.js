//"一个文件一个类"
function Person(opts) {
    this.name = opts['name'];
    this.age = opts['age'];
    this.school = opts['school'];
}

Person.prototype.getName = function () {
    return this.name;
}

Person.prototype.getAge = function () {
    return this.age;
}

Person.prototype.getSchool = function () {
    return this.school;
}

Person.prototype.greet = function () {
    return "Hi, I'm " + this.name;
};

module.exports = {
    Person: Person,
    Version: 'v1.0.0'
} 