(function() {
    "use strict";

    angular
        .module('ebikko.email-record')
        .service('emailRecordService', ['$http', 'userRepository', EmailRecordService]);

    function EmailRecordService($http, userRepository) {
        var self = {
            emailRecord: emailRecord
        };

        return self;

        function emailRecord(email) {
            var json = {
                'ebikko_session_id': userRepository.getSessionId(),
                'method': email.email_as_content ? "EMAIL_CONTENT" : "EMAIL_LINK",
                'sender': userRepository.getPrincipalDetails().results[0].email,
                'receiver_list': [email.to],
                'subject': email.subject,
                'cc_list': [],
                'bcc_list': [],
                'attachments': [{
                    "node_id": email.node_id,
                    "title": email.title,
                    "file_name": email.file_name,
                    "version": 0
                }]
            };
            var urlParams = {
                'message': email.message,
                'txt_subject': email.subject,
                'txt_sender': userRepository.getPrincipalDetails().results[0].email,
                'boolean_as_Content': email.email_as_content ? 'on' : 'off'
            };
            var paramsAsString = Object.keys(urlParams).map(function(k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(urlParams[k]);
            }).join('&');

            var stringed = JSON.stringify(json);
            return $http({
                'method': 'POST',
                'url': '/SendEmail?json=' + stringed + '&' + paramsAsString
            });
        }
    }
})();