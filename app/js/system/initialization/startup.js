function StartupRoutine (parent){
		this.parent = parent;
		this.dbm = parent.DbManager;
		this.usersDb = this.dbm.collection('users');
		
		this.promprForAdminCreation = (dbError)=> {
			if(dbError == "document empty"){
				parent.promptForAdminCreation();
			}
		}

		var adminQuery = {accessLevel : "4"} 
		this.usersDb.fetchEncodedKey(adminQuery, ()=>{console.log('success')}, this.promprForAdminCreation);
};

module.exports = StartupRoutine;