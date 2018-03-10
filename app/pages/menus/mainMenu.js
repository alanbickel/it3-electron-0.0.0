var mainMenu = {
	file: {
		name: "System",
		id: "file-main",
		classList:  ['menu-option', 'main-menu-option'],
		emit: null,
		options : [
			{
				name: "Administration",
				id: "sys-admin", 
				classList: ['menu-option', 'main-menu-option'],
				options : [
					{
						name : "Enable Admin Mode", 
						id: "admin-enable", 
						emit: 'create-modal',
						modalFile: "adminLogin.html",
						modalType: "multi-input",
						classList: ['menu-option', 'nested-menu-option', 'system-option'],
						options: [], 
						enabled: true
					},
					{
						name : "Add User", 
						id: "create-user", 				
						classList: ['menu-option', 'nested-menu-option', 'system-option'],
						options: [], 
						enabled: false
					}
				], 
				enabled: true

			}, 
			{
			name : "Preferences",
			id: "file-preferences",
			classList: ['menu-option', 'sub-menu-option', 'file-menu-option'],
			options: [],
			enabled: true
		}, {
			name: "Quit",
			id: "file-menu-quit",
			classList: ['menu-option', 'sub-menu-option', 'file-menu-option'], 
			options: [],
			enabled: true
		}
		],
		enabled: true
	}, 
	view : {
		name: "View",
		id: "view-main",
		classList:  ['menu-option', 'main-menu-option'],
		options : [{
			name : "Display Item List",
			id: "view-display-all",
			classList: ['menu-option', 'sub-menu-option', 'view-menu-option'],
			options: [],
			enabled: true
		}
		],
		enabled: true
	}, 
	tracking : {
		name : "Tracking",
		id: "tracking-main",
		classList : ['menu-option' ,'main-menu-option'],
		options : [
			{
				name: "New Tracking Session",
				id : "new-tracking-session",
				classList: ['menu-option', 'sub-menu-option', 'tracking-menu-option'],
				options: [],
				enabled : true
			},
			{
				name: "Show Tracked Items",
				id : "active-tracking-display",
				classList: ['menu-option', 'sub-menu-option', 'tracking-menu-option'],
				options: [],
				enabled : true
			}, 
			{
				name: "Reports",
				id : "reports-display-menu",
				classList: ['menu-option', 'main-menu-option', 'tracking-menu-option'],
				options: [
					{
						name: "Report By Date",
						id : "track-by-date-reports",
						classList: ['menu-option', 'nested-menu-option', 'tracking-report-option'],
						options: [],
						enabled : true
					}, 
					{
						name: "Search By Item",
						id : "search-items",
						classList: ['menu-option', 'nested-menu-option', 'tracking-report-option'],
						options: [],
						enabled : true
					}
				],
				enabled : true
			}
		], 
		enabled: true
	}, 
	help : {
		name : "Items", 
		id : "items-main",
		classList: ['menu-option' ,'main-menu-option'],
		options: [
			{
				name: "Add Item",
				id : "add-item",
				classList : ['menu-option', 'sub-menu-option', 'item-menu-option'],
				options: [],
				enabled: false
			}, 
			{
				name: "Edit Item",
				id : "edit-item",
				classList : ['menu-option', 'sub-menu-option', 'item-menu-option'],
				options: [],
				enabled: false
			}, {
				name: "Delete Item",
				id : "remove-item",
				classList : ['menu-option', 'sub-menu-option', 'item-menu-option'],
				options: [],
				enabled: false
			}
		], 
		enabled : true
	}
}

module.exports = mainMenu;