(function(window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var SERVER_URL = 'http://localhost:3002/coffeeorders';
    var App = window.App;
    var Truck = App.Truck;

    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var remoteDS = new RemoteDataStore(SERVER_URL);
    var CheckList = App.CheckList;
    var Validation = App.Validation;
    var myTruck = new Truck('ncc-1701', remoteDS);
    window.myTruck = myTruck;
    var formHandler = new FormHandler(FORM_SELECTOR);
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    formHandler.addSubmitHandler(function(data) {
        return myTruck.createOrder(data)
            .then(function() {
                checkList.addRow(data);
            });
    });

    formHandler.addInputHandler(Validation.isCompanyEmail,remoteDS);
    formHandler.addInputCoffeeOrderHandler(Validation.isValidCoffeeOrder);
    formHandler.addInputCoffeeStrenthHandler(Validation.isValidCoffeeOrder);
    myTruck.printOrders(checkList.addRow.bind(checkList));

})(window);
