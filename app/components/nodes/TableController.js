angular
	.module('ebikko.nodes')
	.controller('tableController', [TableController]);

function TableController(){
    var self = this;

	self.table_options = {
    	emptyMessage: 'Loading...',
        rowHeight: 500,
        headerHeight: 50,
        footerHeight: false,
        scrollbarV: false,
        selectable: false,
        columns: [{
        	name: "Date last modified",
        	prop: "date_last_modified"
        },{
    		name: "Assignee",
    		prop: "assignee"
        },{
            name: "Title",
            width: 300,
            prop: "title"
        },{
        	name: "Record Number",
        	prop: "record_number"
        },{
        	name: "Date Registered",
        	prop: "date_registered"
        }, {
            name: "Record Type",
            prop: "node_type_name"
        }]
    };
}