QUnit.test("datastore test", function(assert) {
    var ds = new App.DataStore();
    assert.equal(ds.add('m@bond.com', 'tea'), undefined, "Passed");
    assert.equal(ds.add('james@bond.com', 'eshpressho'), undefined, "Passed");
    var datastoreResults = ds.getAll();
    assert.deepEqual(datastoreResults, {
        'm@bond.com': 'tea',
        'james@bond.com': 'eshpressho'
    }, "Results added successfully");
    ds.remove('james@bond.com')
    datastoreResults = ds.getAll();
    assert.equal(Object.keys(datastoreResults).length, 1, "Passed");
    assert.deepEqual(datastoreResults, {
        'm@bond.com': 'tea'
    }, "Removed james@bond.com successfully");
    var valueOne = ds.get('m@bond.com');
    assert.equal(valueOne, 'tea', "Retrieved successfully");
    var valueTwo = ds.get('james@bond.com');
    assert.equal(valueTwo, undefined, "Undefined output");
});

QUnit.test("Truck createOrder test", function(assert) {
    var objectFirst = {
        emailAddress: 'me@goldfinger.com',
        coffee: 'double mocha'
    };
    assert.deepEqual(objectFirst, myTruck.createOrderNew({
        emailAddress: 'me@goldfinger.com',
        coffee: 'double mocha'
    }), "createOrder Passed");
    var objectSecond = {
        emailAddress: 'dr@no.com',
        coffee: 'decaf'
    };
    assert.deepEqual(objectSecond, myTruck.createOrderNew({
        emailAddress: 'dr@no.com',
        coffee: 'decaf'
    }), "createOrder Passed");
    var objectThird = {
        emailAddress: 'm@bond.com',
        coffee: 'earl grey'
    };
    assert.deepEqual(objectThird, myTruck.createOrderNew({
        emailAddress: 'm@bond.com',
        coffee: 'earl grey'
    }), "createOrder Passed");
});

QUnit.test("Truck printOrders test", function(assert) {
    myTruck.createOrder({
        emailAddress: 'me@goldfinger.com',
        coffee: 'double mocha'
    });
    myTruck.createOrder({
        emailAddress: 'dr@no.com',
        coffee: 'decaf'
    });
    myTruck.createOrder({
        emailAddress: 'm@bond.com',
        coffee: 'earl grey'
    });
    assert.deepEqual(myTruck.printOrders(), ["me@goldfinger.com", "dr@no.com", "m@bond.com"], "printOrder Passed");
});
QUnit.test("Truck deliverOrder test", function(assert) {
    assert.equal(myTruck.deliverOrder('dr@no.com'), undefined, "deliverOrder Passed");
});
