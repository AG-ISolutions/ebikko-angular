(function() {
    "use strict";

    angular
        .module('ebikko.node-properties')
        .controller('NodePropertiesController', ['$q', 'nodePropertiesService', 'nodePropertiesResultsProcessor', NodePropertiesController]);

    function NodePropertiesController($q, nodePropertiesService, nodePropertiesResultsProcessor) {
        var self = this;
        self.activate = activate;

        activate();

        function activate() {
            if (self.nodeId) {
                var nodeDetailsPromise = nodePropertiesService.getNodeDetails(self.nodeId);
                var nodeTypeDetailsPromise = nodePropertiesService.getNodeTypeDetails(self.nodeId.split('-')[0]);

                $q.all([nodeDetailsPromise, nodeTypeDetailsPromise]).then(function(results) {
                    self.data = nodePropertiesResultsProcessor.processResults(results[0].data.results[0], results[1].data.results[0]);
                });
            }
        }
    }
})();