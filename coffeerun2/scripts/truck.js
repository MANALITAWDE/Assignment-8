(function(window) {
    'use strict';
    var App = window.App || {};
    var Validation = App.Validation;

    function Truck(truckId, db) {
        this.truckId = truckId;
        this.db = db;
    }

    Truck.prototype.createOrder = function(order) {
        console.log('Adding order for ' + order.emailAddress);
        return this.db.add(order.emailAddress, order);
    };

    Truck.prototype.deliverOrder = function(customerId) {
        console.log('Delivering order for ' + customerId);
        return this.db.remove(customerId);
    };

    Truck.prototype.printOrders = function(printFn) {
        return this.db.getAll()
            .then(function(orders) {
                var customerIdArray = Object.keys(orders);
                console.log('Truck #' + this.truckId + ' has pending orders:');
                customerIdArray.forEach(function(id) {
                    console.log(orders[id]);
                    if (printFn) {
                        printFn(orders[id]);
                    }
                }.bind(this));
            }.bind(this));
    };
    Truck.prototype.getAllEmailAddresses = function(formFn) {
        var emailAddressArray = new Array();
        this.db.getAll()
            .then(function(orders) {
                var customerIdArray = Object.keys(orders);
                customerIdArray.forEach(function(id) {
                    emailAddressArray.push(orders[id].emailAddress);
                });
                formFn(Validation.isCompanyEmail, emailAddressArray);
            });

    };

    //Extra functions which returns values to compare in an assert function

    Truck.prototype.createOrderNew = function(order) {
        this.db.add(order.emailAddress, order);
        return this.db.data[order.emailAddress];
    };
    App.Truck = Truck;
    window.App = App;
})(window);
