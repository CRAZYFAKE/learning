var Shipping = function () {
    this.company = "";
}

Shipping.prototype = {
    setStrategy: function (company) {
        this.company = company;
    },
    calculate: function (package) {
        return this.company.calculate(package);
    }
}

var UPS = function () {
    this.calculate = function (package) {
        //calculatings.........
        return '$' + (package['from'] - package['to']).toString();
    }
}

var USPS = function () {
    this.calculate = function (package) {
        //calculatings.........
        return '$39.50';
    }
}

var Fedex = function () {
    this.calculate = function (package) {
        //calculatings.........
        return '$43.20';
    }
}

var log = (function () {
    var log = '';
    return {
        add: function (msg) {
            log += msg + '\n';
        },
        show: function () {
            console.log(log);
            log = '';
        }
    }
})();


function run() {
    var package = {
        from: '76712',
        to: '10012',
        weight: '1kg'
    };

    var ups = new UPS();
    var usps = new USPS();
    var fedex = new Fedex();

    var shipping = new Shipping();

    shipping.setStrategy(ups);
    log.add('UPS Strategy : ' + shipping.calculate(package));

    shipping.setStrategy(usps);
    log.add('USPS Strategy : ' + shipping.calculate(package));

    shipping.setStrategy(fedex);
    log.add('Fedex Strategy : ' + shipping.calculate(package));

    log.show();
}

run();