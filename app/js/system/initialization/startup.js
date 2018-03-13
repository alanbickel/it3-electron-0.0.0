/**SYSTEM INITIALIZATION */

var StartupRoutine = function(parent){
  this.parent = parent;
  var self = this;

  /**verify that administrator profile exists */
  this.checkAdminExists = () => {
    var adminQuery = {accessLevel : "4"};
    parent.dbm.collection('users')
    .fetchEncodedKey(adminQuery, self.parent.adminExists,  self.parent.promptForAdminCreation);
  };

  /*first step of initialization is to load database collections */
  this.initialize = (debugging = false) => {
    try{
      //initialize items database
      parent.dbm.register('items');
      //initialize users database
			parent.dbm.register('users');
			//categories
			parent.dbm.register('itemCategories', 'categories');
    } catch(error){
      this.parent.dbInitializeFailure();
    }
    //configure document constraint for items database
    var success = function(){process.stdout.write('\ncollection: items, constraint:  {label: unique} -> success\n')};
		var failure = function(){self.parent.dbInitializeFailure};
		var constraint = {fieldName: 'label', unique: true};
		
	  parent.dbm.collection('items').ensureIndex(constraint,success, failure);

    //configure document constraint  for users database
    var _success = function(){process.stdout.write('\ncollection: users, constraint:  {username: unique} -> success\n')};
    var _failure = function(){self.parent.dbInitializeFailure};   
    var _constraint = {fieldName: 'username', unique: true};    
		parent.dbm.collection('users').ensureIndex(_constraint,_success, _failure);    
		
		//configure documenet constraint for item category database
		var __success = function(){process.stdout.write('\ncollection: categories, constraint:  {category: unique} -> success\n')};
		var __failure = function(){self.parent.dbInitializeFailure};   
		 var __constraint = {fieldName: 'category', unique: true};  
		parent.dbm.collection('categories').ensureIndex(__constraint,__success, __failure); 

    //turn off dev-inspector if not debugging
    if(!debugging)
      globalShortcut.register('Control+Shift+I', () => {console.log("\nconsole open attempt\n")});
  };
}
module.exports = StartupRoutine;