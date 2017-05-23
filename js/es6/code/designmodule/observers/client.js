var MyFancyObservable = require('./MyFancyObservable.js');  

var observable = new MyFancyObservable.OB();

observable.on('hello', function (name) {  
  console.log(name);
});

observable.hello('john');  