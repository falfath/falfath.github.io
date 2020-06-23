document.addEventListener("DOMContentLoaded", () => {
	let urlParams 	= new URLSearchParams(window.location.search);
	let teamID 		= urlParams.get("teamID");
	let isFromSaved = urlParams.get("saved");

	let btnSave		= document.querySelector("#save");
	let btnDelete	= document.querySelector("#delete");

	if (isFromSaved) {
		btnSave.style.display 	= 'none';
		
		getSavedTeamByID();
	} else {
		btnDelete.style.display = 'none';

		item = getTeamByID();
	}

	btnSave.onclick = () => {
		item.then((team) => {
			saveTeam(team);
		});

		btnSave.style.display 	= 'none';
		btnDelete.style.display = 'block';
	};

	
	btnDelete.addEventListener("click", () => {
		deleteSaved(teamID);

		btnSave.style.display 	= 'block';
		btnDelete.style.display = 'none';
	});
});