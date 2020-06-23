let dbPromised = idb.open("bundesliga", 1, (upgradeDb) => {
	let teamsObjectStore = upgradeDb.createObjectStore("teams", {
		keyPath: "id"
	});
	teamsObjectStore.createIndex("team_name", "team_name", { unique: false });
});

const saveTeam = (team) => {
	dbPromised
		.then((db) => {
		let tx		= db.transaction("teams", "readwrite");
		let store	= tx.objectStore("teams");

		store.put(team);

		return tx.complete;
		})
		.then(() => {
			setToast("Team successfully saved.");
		});
}

const getByID = (id) => {
	return new Promise((resolve, reject) => {
		dbPromised
		.then((db) => {
			let tx 		= db.transaction("teams", "readonly");
			let store 	= tx.objectStore("teams");

			return store.get(parseInt(id));
		})
		.then((team) => {
			resolve(team);
		});
	});
}

const getAll = () => {
	return new Promise((resolve, reject) => {
		dbPromised
		.then((db) => {
			let tx 		= db.transaction("teams", "readonly");
			let store 	= tx.objectStore("teams");

			return store.getAll();
		})
		.then((teams) => {
			resolve(teams);
		});
	});
}

const deleteSaved = (id) => {
	return new Promise((resolve, reject) => {
		dbPromised
		.then((db) => {
			let tx 		= db.transaction("teams", "readwrite");
			let store 	= tx.objectStore("teams");

			store.delete(parseInt(id));

			return tx.complete;
		})
		.then(() => {
			setToast("Team successfully deleted.");
		});
	});
}

const checkSaved = (id) => {
	return new Promise((resolve, reject) => {
		dbPromised
		.then((db) => {
			let tx 		= db.transaction("teams", "readonly");
			let store 	= tx.objectStore("teams");

			return store.get(parseInt(id));
		})
		.then(() => {
			setToast("Team already saved.");
		});
	});
}