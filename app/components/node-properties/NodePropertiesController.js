(function() {
    "use strict";

    angular
        .module('ebikko.node-properties')
        .controller('NodePropertiesController', ['$q', 'nodePropertiesService', 'nodeTypeService', 'nodePropertiesResultsProcessor', NodePropertiesController]);

    function NodePropertiesController($q, nodePropertiesService, nodeTypeService, nodePropertiesResultsProcessor) {
        var self = this;
        self.activate = activate;

        activate();

        function activate() {
            if (self.nodeId) {
                var nodeDetailsPromise = nodePropertiesService.getNodeDetails(self.nodeId);
                var nodeTypeDetailsPromise = nodeTypeService.getNodeTypeDetails(self.nodeId.split('-')[0]);

                $q.all([nodeDetailsPromise, nodeTypeDetailsPromise]).then(function(results) {
                    self.data = nodePropertiesResultsProcessor.enrichWithValues(results[0].data.results[0], results[1].data.results[0]);
                });
            }
        }
    }
})();