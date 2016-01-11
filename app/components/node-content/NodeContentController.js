(function() {
    "use strict";

    angular
        .module('ebikko.node-content')
        .controller('NodeContentController', [ 'nodeContentService', 'nodeService', 'userRepository', NodeContentController]);

    function NodeContentController(nodeContentService, nodeService, userRepository) {
        var self = this;
        self.getContentUrl = getContentUrl;
        self.getDownloadUrl = getDownloadUrl;
        self.useHtml5Viewer = useHtml5Viewer;

        function getContentUrl(nodeId) {
            return nodeContentService.getContentUrl(nodeId);
        }

        function getDownloadUrl(nodeId) {
            nodeService.getDownloadUrl(nodeId).then(function(response) {
                var url = response.data.data.contentUrl;
                self.contentUrl = url.substring(url.indexOf('/downloadURL'));
            });
        }

        function useHtml5Viewer() {
            return userRepository.getUserPreferences().preferences[0].useHtml5Viewer;
        }

        getDownloadUrl(self.nodeId);
    }
})();