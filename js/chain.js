/**
 * 随着链式调用的普及，实现的方案也越来越多。
 * 最常见的，
 * 1.jQuery直接返回this的方式
 * 2.underscore的可选式的方式
 * 3.lodash惰性求值的方式
 */

/**
 * 第一种方式：直接返回this
 */
function chain(num) {
    this.value = num || 0;
}

chain.prototype.add = function (a) {
    this.value += a;
    return this;
}
chain.prototype.reduce = function (a) {
    this.value -= a;
    return this;
}
chain.prototype.valueOf = function () {
    return this.value;
}
chain.prototype.toString = function () {
    return this.value + '';
}

var example1 = new chain(100);
console.log(example1.add(100).reduce(50).value)


/**
 * 第三种方式：惰性求值的方式
 */
function Task() {
    this.queen = [];
    this.queenIndex = 0;
    this.loopCount = 0;
    this.loopIndex = 0;
    this.loopStart = 0;
}
var _task_proto = {
    loop: function (num) {
        this.loopStart = this.queenIndex;
        this.loopCount = num;
    },
    job: function (str) {
        console.log(str);
    },
    end: function () {
        this.loopIndex++;
        if (this.loopIndex < this.loopCount) {
            this.queenIndex = this.loopStart;
        } else {
            this.loopIndex = 0;
        }
    },
    done: function () {
        console.log('done');
    }
}

Task.prototype.__proto__ = _task_proto;

Task.prototype.next = function () {
    var task = this.queen[this.queenIndex];
    task.fn.apply(this, task.args);
    if (task.name !== 'done') {
        this.queenIndex++;
        this.next();
    } else {
        this.queen = [];
        this.queenIndex = 0;
    }
}

for (var i in _task_proto) {
    (function (i) {
        var raw = Task.prototype[i];
        Task.prototype[i] = function () {
            this.queen.push({
                name: i,
                fn: raw,
                args: arguments
            }); //保存具体的实现方法、名字和参数到任务队列
            if (i === 'done') {
                this.next();
            }
            return this;
        };
    })(i);
}

var t = new Task();
// t.job('job1').job('hello').end().loop(3).job('world').end().job('!').done();
// t.job('job2').loop(3).job('world').job('!').end().done();
t.job('job3').loop(3).job('world').job('!').end().job('!').done();

function show(str) {
    console.log(str);
    return show;
}