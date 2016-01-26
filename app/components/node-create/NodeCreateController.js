(function() {
    "use strict";

    angular
        .module('ebikko.node-create')
        .controller('NodeCreateController', ['nodeTypeService', 'nodeCreateService', 'nodeCreateValidator', '$timeout', NodeCreateController]);

    function NodeCreateController(nodeTypeService, nodeCreateService, nodeCreateValidator, $timeout) {
        var self = this;
        self.activate = activate;
        self.accessControlPrincipals = [];
        self.dateValues = {};
        self.ignoreReadOnlyProperties = ignoreReadOnlyProperties;
        self.loadContainers = loadContainers;
        self.loadLookup = loadLookup;
        self.loading = false;
        self.lookups = {};
        self.principalSearches = {};
        self.retentionSearch = retentionSearch;
        self.save = save;
        self.saving = false;
        self.updateAccessControlPrincipals = updateAccessControlPrincipals;

        activate();

        function activate() {
            self.node = defaultNode();
            self.times = generateTimes();
            self.loading = true;
            nodeTypeService.getNodeTypeDetails(self.nodeTypeId).then(function(response) {
                var details = nodeTypeService.processNodeTypeDetails(response.data.results[0]);
                details = nodeCreateService.enrichWithModelNames(details);
                self.nodeTypeProperties = details;
                self.loading = false;
            });
        }

        function formatDates() {
            angular.forEach(self.node.data, function(value, key) {
                if (value instanceof Date) {
                    self.node.data[key] = value.getFullYear() + "-" + (value.getMonth() + 1) + "-" + value.getDate();
                }
            });
        }

        function ignoreReadOnlyProperties(value, index, array) {
            return !value.properties || !value.properties.is_readonly;
        }

        function loadContainers() {
            return nodeCreateService.loadContainers(self.nodeTypeId).then(function(response) {
                self.containers = response.data.results;
            });
        }

        function loadLookup(lookupId) {
            return nodeCreateService.loadLookup(lookupId).then(function(response) {
                self.lookups[lookupId] = response.data.results;
            });
        }

        function generateTimes() {
            var times = [];
            for (var h = 0; h <= 23; h++) {
                for (var m = 0; m <= 3; m++) {
                    var hourFormatted = ("00" + h).slice(-2);
                    var minuteFormatted = ("00" + (m * 15)).slice(-2);
                    times.push(hourFormatted + ':' + (minuteFormatted) + ':00');
                }
            }
            return times;
        }

        function retentionSearch(value) {
            return nodeCreateService.retentionSearch(value).then(function(response) {
                return response.data.results;
            });
        }

        function save() {
            setPrincipalIdsOnNode();
            setAccessControlPrincipalsOnNode();
            formatDates();
            setRetentionScheduleOnNode();
            self.errors = nodeCreateValidator.validate(self.node, self.nodeTypeProperties).errors;
            if (self.errors.length === 0) {
                self.saving = true;
                nodeCreateService.saveNode(self.node).then(function(response) {
                    self.saving = false;
                }, function(response) {
                    self.saving = false;
                });
            }
        }

        function setAccessControlPrincipalsOnNode() {
            angular.forEach(self.accessControlPrincipals, function(principal, key) {
                var aclList = {
                    "principal_id": principal.principal_id,
                    "permission_sets": []
                };

                angular.forEach(principal.permissions, function(value, key) {
                    aclList.permission_sets.push({
                        "permission_id": key,
                        "is_allow": value || value === "true"
                    });
                });

                self.node.acl_list.push(aclList);
            });
        }

        function setPrincipalIdsOnNode() {
            angular.forEach(self.principalSearches, function(value, key) {
                if (value instanceof Array) {
                    self.node.data[key] = value.length === 0 ? [] : [value[0].principal_id];
                } else if (value !== null) {
                    self.node.data[key] = value.principal_id;
                }
            });
        }

        function setRetentionScheduleOnNode() {
            if (self.retentionSchedule && self.retentionSchedule.retention_id !== null && self.retentionSchedule.retention_id !== undefined) {
                self.node.retention_schedule_id = self.retentionSchedule.retention_id;
            }
        }

        function updateAccessControlPrincipals() {
            // This is an awful hack to make sure the principal has been set on the model before this code runs
            window.setTimeout(function() {
                var principal = self.accessControlPrincipal;
                if (principal !== null && self.accessControlPrincipals.indexOf(principal) === -1) {
                    principal.permissions = defaultPermissionSet();
                    self.accessControlPrincipals.push(principal);
                    self.accessControlPrincipal = "";
                }
            }, 150);

        }

        function defaultNode() {
            return {
                "node_type_id": self.nodeTypeId,
                "node_id": "",
                "title": "",
                "date_closed": "",
                "enclosure_number": "0",
                "client_id": "",
                "bypass_referenced_acls": false,
                "security_based_on_container": false,
                "description": "",
                "barcode": "",
                "classification": "",
                "secondary_classification": "",
                "tertiary_classification": "",
                "container_id": "",
                "current_assignee": "00000000000000000000000000000000",
                "disposition_status": "0",
                "external_barcode": "",
                "external_id": "",
                "finalized": false,
                "is_hybrid": false,
                "is_declassify": false,
                "home": "",
                "integrity_check": "",
                "owner_id": "00000000000000000000000000000000",
                "record_number": "",
                "retention_schedule_id": "",
                "master_document_link": "",
                "notes": "",
                "AppededNotes": "",
                "date_registered": "",
                "date_created": "",
                "date_archived": "",
                "date_made_inactive": "",
                "record_class": 0,
                "author": "",
                "batch_id": "",
                "is_auto_update_security_level": false,
                "is_update_security_level_on_particular_date": false,
                "security_level_trigger_date": null,
                "is_update_security_level_on_triggered_event": false,
                "security_level_triggered_event_duration": 1,
                "security_level_triggered_event_type": 0,
                "security_level_triggered_event": null,
                "security_level_triggered_event_property": null,
                "auto_update_security_level_id": "",
                "acl_id": "",
                "txtCatatan": "",
                "hybrid_remarks": "",
                "appended_hybrid_remarks": "",
                "security_level_id": "",
                "acl_list": [],
                "creator_name": "",
                "master": "",
                "creator_username": "",
                "is_container_removed_on_ret_trig": false,
                "is_set_home_on_container_ret_trig": false,
                "retention_schedule_new_home_uid": "",
                "data": {},
                "unsavedNodeProperties": {}
            };
        }

        function defaultPermissionSet() {
            return {
                1: true,
                2: true,
                3: true,
                4: true,
                5: true,
                6: true,
                7: true
            };
        }
    }

})();