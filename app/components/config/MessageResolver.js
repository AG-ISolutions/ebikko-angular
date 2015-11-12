angular
	.module('ebikko.config')
	.service('messageResolver', [ MessageResolver ]);

function MessageResolver() {
	var messages = [
		{e:'EBW-0-16',message:'Invalid Username or Password',type:'danger'},
		{e:'EBW-0-15',message:'Invalid Username or Password',type:'danger'},
		{e:'EBW-2-10',message:'Username already in use',type:'danger'},
		{e:'EBW-22-20',message:'Login disabled for this User',type:'danger'},
		{e:'Logout successfully',message:'Logout Complete, Please enter Username and Password',type:'success'},	
		{e:'Admin-0',message:'Please enter Username and Password',type:'info'},
		{e:'Admin-1',message:'Profile Setting not valid for this Module',type:'danger'},
		{e:'Tasks-0',message:'Task Assignment Completed',type:'success'},
	];

	this.resolveMessage = function(key) {
		for (var i = 0; i < messages.length; i++) {
			if (messages[i].e === key){
				return messages[i];
			}
		}
		console.log("Warning - unable to resolve message " + key);
		return {
			e: key,
			message: key,
			type: key
		}
	}
}