(function() {
    "use strict";

    angular
        .module('ebikko.email-record')
        .controller('EmailRecordController', ['$mdDialog', 'emailRecordService', 'emailValidator', EmailRecordController]);

    function EmailRecordController($mdDialog, emailRecordService, emailValidator) {
        var self = this;

        self.cancel = cancel;
        self.email = {
            email_as_content: true,
            node_id: this.nodeId,
            title: this.title,
            file_name: this.file_name
        };
        self.send = send;

        function cancel() {
            $mdDialog.cancel();
        }

        function send() {
            var validationResponse = emailValidator.validate(self.email);
            if (validationResponse.hasErrors) {
                self.errors = validationResponse.errors;
            } else {
                self.saving = true;
                emailRecordService.emailRecord(self.email).then(function(response) {
                    $mdDialog.hide();
                    self.saving = false;
                }, function(response) {
                    self.saving = false;
                    self.errors = [response.data.data.responsemsg];
                });
            }
        }
    }
})();