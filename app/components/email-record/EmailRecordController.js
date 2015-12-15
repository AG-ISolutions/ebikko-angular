(function() {
    "use strict";

    angular
        .module('ebikko.email-record')
        .controller('EmailRecordController', ['$mdDialog', '$mdToast', 'emailRecordService', 'emailValidator', EmailRecordController]);

    function EmailRecordController($mdDialog, $mdToast, emailRecordService, emailValidator) {
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
            self.errors = emailValidator.validate(self.email).errors;
            if (self.errors.length === 0) {
                self.saving = true;

                // The copy prevents the user seeing the '<br/>'s in the text box
                var emailCopy = angular.copy(self.email);
                emailCopy.message = emailCopy.message.replace("\n", "<br/>");
                emailRecordService.emailRecord(emailCopy).then(function(response) {
                    $mdDialog.hide();
                    $mdToast.show(
                        $mdToast.simple()
                        .content('Email sent successfully')
                        .position('top left')
                        .hideDelay(3000)
                    );
                    self.saving = false;
                }, function(response) {
                    self.saving = false;
                    self.errors = [response.data.data.responsemsg];
                });
            }
        }
    }
})();