(function() {
    'use strict';

    angular
        .module('ebikko.config')
        .service('messageResolver', [MessageResolver]);

    if (!String.format) {
        String.format = function(format) {
            var args = Array.prototype.slice.call(arguments, 1);
            return format.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] != 'undefined' ? args[number] : match;
            });
        };
    }

    function MessageResolver() {
        var messages = [{
            e: 'EBW-0-16',
            message: 'Invalid Username or Password',
            type: 'danger'
        }, {
            e: 'EBW-0-15',
            message: 'Invalid Username or Password',
            type: 'danger'
        }, {
            e: 'EBW-2-10',
            message: 'Username already in use',
            type: 'danger'
        }, {
            e: 'EBW-18-19',
            message: 'Please specify at least one recipient\'s email.',
            type: 'danger'
        }, {
            e: 'EBW-22-10',
            message: 'Invalid value for [{0}]'
        }, {
            e: 'EBW-22-11',
            message: 'Password must contain at least {0} characters long.'
        }, {
            e: 'EBW-22-12',
            message: 'Password must contain at least 1 alphabet, 1 numeric and {0} characters long.'
        }, {
            e: 'EBW-22-13',
            message: 'Password must contain at least 1 alphabet, 1 numeric, 1 special character and {0} characters long.'
        }, {
            e: 'EBW-22-14',
            message: 'Password exceeds the limit of repeating characters allowed. Maximum allowed: {0}'
        }, {
            e: 'EBW-22-15',
            message: 'Password exceeds the limit of sequential numbers allowed. Maximum allowed: {0}'
        }, {
            e: 'EBW-22-16',
            message: 'Password exceeds the limit of sequential alphabets allowed. Maximum allowed: {0}'
        }, {
            e: 'EBW-22-17',
            message: 'Password is similar to username.'
        }, {
            e: 'EBW-22-18',
            message: 'This password has been used previously. Please use a different password.'
        }, {
            e: 'EBW-22-19',
            message: 'Authentication Failure: Your account has been temporarily locked.'
        }, {
            e: 'EBW-22-20',
            message: 'Authentication Failure: Account has been locked - Please contact Administrator.'
        }, {
            e: 'EBW-22-21',
            message: 'You can\'t use the same previous password.Please use a different password.'
        }, {
            e: 'EBW-23-13',
            message: 'Username or email mismatch. Either the username doesn\'t exist or you\'ve entered invalid email address.'
        }, {
            e: 'EBW-23-14',
            message: 'This user doesn\'t have email saved in the system. Please contact our administrator for manual Password Recovery.'
        }, {
            e: 'Logout successfully',
            message: 'Logout Complete, Please enter Username and Password',
            type: 'success'
        }, {
            e: 'Admin-0',
            message: 'Please enter Username and Password',
            type: 'info'
        }, {
            e: 'Admin-1',
            message: 'Profile Setting not valid for this Module',
            type: 'danger'
        }, {
            e: 'Tasks-0',
            message: 'Task Assignment Completed',
            type: 'success'
        }, ];

        this.resolveMessage = function(key, params) {
            for (var i = 0; i < messages.length; i++) {
                if (messages[i].e === key) {
                    return (params && params.length > 0) ? String.format(messages[i].message, params) : messages[i].message;
                }
            }
            console.log("Warning - unable to resolve message " + key);
            return "An unknown error occured, please try again";
        };
    }
})();