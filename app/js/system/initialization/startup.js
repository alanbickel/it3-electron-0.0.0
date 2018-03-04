var app = require('electron');

function StartupRoutine (parent){
		this.parent = parent;
    var self = this;

    this.checkAdminExists = ()=>{
      var adminQuery = {accessLevel : "4"} 
      parent.DbManager.collection('users').fetchEncodedKey(adminQuery, 
                                                            self.parent.adminExists, 
                                                            self.parent.promptForAdminCreation);
    };

    /*first step of initialization is to load database collections */
    this.initialize = ()=> {
      try{
        //initialize items database
        parent.DbManager.register('items');
        //initialize users database
	      parent.DbManager.register('users');
      } catch(err){
        this.parent.dbInitializeFailure();
      }
    	//configure document constraint  for items database
	    parent.DbManager.collection('items').ensureIndex({fieldName: 'label', unique: true}, 
                                                        ()=>{process.stdout.write('\ncollection: items, constraint:  {label: unique} -> success\n')}, 
                                                        self.parent.dbInitializeFailure);
	    //configure document constraint  for users database
	    parent.DbManager.collection('users').ensureIndex({fieldName: 'username', unique: true}, 
                                                        ()=>{ process.stdout.write('\ncollection: users, constraint:  {username: unique} -> success\n')},
                                                        self.parent.dbInitializeFailure);
    };

    //callback to parent once all collections are initialized
    this.tellParentThatCollectionsAreInitialized = () =>{
      if(this.allParentCollectionsInitialized())
        this.parent.dbInitializeSuccess();
    }
    //check to see if all parent db collections have been initialized
    this.allParentCollectionsInitialized = ()=>{
      var init = true;
      for(var i in this.parent.DbManager.dataStores){
        var collection = this.parent.DbManager.dataStores[i];
        if(! collection.isInitialized)
          init = false;
        process.stdout.write("\ncollection: " + i + " init? " + collection.isInitialized + "\n");
      }
      return init;
    }
};
module.exports = StartupRoutine;