(function(window) {
    'use strict';
    var App = window.App || {};
    var emailAddressPresent = 'NO';

    var Validation = {
        isCompanyEmail: function(email, remoteDS) {
            if (/.+@bignerdranch\.com$/.test(email)) {
                remoteDS.get(email, function(serverResponse) {
                    if (null != serverResponse && '' != serverResponse) {
                        emailAddressPresent = 'YES';
                    } else {
                        emailAddressPresent = 'NO';
                    }
                });
                return emailAddressPresent;
            } else {
                return false;
            }

        },
        isValidCoffeeOrder: function(text, strengthValue) {
            if (text.includes('decaf') && strengthValue > 20) {
                return false;
            }
            return true;
        }
    };
    App.Validation = Validation;
    window.App = App;
})(window);
