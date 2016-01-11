(function() {
    "use strict";

    angular
        .module('ebikko.node-content')
        .controller('NodeContentController', [ 'nodeContentService', 'nodeService', NodeContentController]);

    function NodeContentController(nodeContentService, nodeService) {
        var self = this;
        self.getContentUrl = getContentUrl;
        self.getDownloadUrl = getDownloadUrl;
        self.useHtmlTags = useHtmlTags;

        function getContentUrl(nodeId) {
            return nodeContentService.getContentUrl(nodeId);
        }

        function getDownloadUrl(nodeId) {
            nodeService.getDownloadUrl(nodeId).then(function(response) {
                var url = response.data.data.contentUrl;
                self.contentUrl = url.substring(url.indexOf('/downloadURL'));
            });
        }

        function useHtmlTags() {
            return true;
        }

        getDownloadUrl(self.nodeId);
    }
})();