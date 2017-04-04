(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var coffee;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }
    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });

            fn(data).then(function() {
                this.reset();
                this.elements[0].focus();
            }.bind(this));

        });

    };

    FormHandler.prototype.addInputHandler = function(fn, remoteDS) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';
            var response = fn(emailAddress, remoteDS);
            event.target.setCustomValidity('');
            if (!(response)) {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            } else if (response == 'YES') {
                message = emailAddress + ' is already presnt on the server!';
                event.target.setCustomValidity(message);
            }
        });
    };

    FormHandler.prototype.addInputCoffeeOrderHandler = function(fn) {
        this.$formElement.on('input', '[name="coffee"]', function(event) {
            var coffeeTextValue = $('#coffeeOrder').val();
            var strengthValue = $('#strengthLevel').val();
            var message = '';
            coffee = event.target;
            event.target.setCustomValidity('');
            if (!(fn(coffeeTextValue, strengthValue))) {
                message = coffeeTextValue + ' is not a valid coffee Order and has high caffeine strength.';
                event.target.setCustomValidity(message);
            }
        });
    };
    FormHandler.prototype.addInputCoffeeStrenthHandler = function(fn) {
        this.$formElement.on('input', '[name="strength"]', function(event) {
            var coffeeTextValue = $('#coffeeOrder').val();
            var strengthValue = $('#strengthLevel').val();
            var message = '';
            event.target.setCustomValidity('');
            coffee.setCustomValidity('');
            if (!(fn(coffeeTextValue, strengthValue))) {
                message = ' High caffeine strength.';
                event.target.setCustomValidity(message);
            }
        });
    };
    App.FormHandler = FormHandler;
    window.App = App;
})(window);
