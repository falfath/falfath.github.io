const templateStandings = (data) => {
	let result = `
		<tr>
			<td>${data.position}</td>
			<td><a class="red-text text-darken-4" href="./team-detail.html?teamID=${data.team.id}">${data.team.name}</a></td>
			<td>${data.points}</td>
			<td>${data.playedGames}</td>
			<td>${data.won}</td>
			<td>${data.draw}</td>
			<td>${data.lost}</td>
			<td>${data.goalsFor}</td>
			<td>${data.goalsAgainst}</td>
			<td>${data.goalDifference}</td>
		</tr>
	`;

	return result;
}

const templateMatches = (data) => {
	let result = `
		<div class="col s12 m6">
			<div class="card">
				<div class="card-content">
					<span class="card-title"><a href="./team-detail.html?teamID=${data.homeTeam.id}" class="red-text text-darken-4">${data.homeTeam.name}</a> vs.</span>
					<span class="card-title"><a href="./team-detail.html?teamID=${data.awayTeam.id}" class="red-text text-darken-4">${data.awayTeam.name}</a></span>
					<p>${changeDate(data.utcDate)}</p>
				</div>
			</div>
		</div>
	`;

	return result;
}

const templateTeams = (data, saved = false) => {
	let url = `?teamID=${data.id}`;

	if (saved === true) {
		url = `?teamID=${data.id}&saved=true`;
	}
	
	let result = `	
		<div class="col s12 m4">
			<div class="card">
				<div class="card-image card-image-custom">
					<a href="./team-detail.html${url}">
						<img src="${data.crestUrl}">
					</a>
				</div>
				<div class="card-action card-action-custom">
					<a href="./team-detail.html${url}" class="red-text text-darken-4">
						<i class="material-icons right">arrow_right</i> ${data.name}
					</a>
				</div>
			</div>
		</div>
		`;

	return result;
}

const templateTeamDetail = (data) => {
	let result = `
		<div class="row">
			<div class="col s12">

				<nav>
					<div class="nav-wrapper red darken-4">
						<div class="col s12">
							<a class="breadcrumb"><i class="material-icons left">info</i>Team Detail</a>
						</div>
					</div>
				</nav>

				<div class="row team-detail">

					<div class="col s12 m4">
						<div class="card head">
							<div class="card-image card-image-custom">
								<img src="${data.crestUrl}">
							</div>
						</div>
					</div>

					<div class="col s12 m8">
						<div class="card head">
							<div class="card-content">

								<table class="striped">								
									<tbody>
										<tr>
											<th>Team Name</th>
											<td>${data.name}</td>
										</tr>

										<tr>
											<th>Address</th>
											<td>${data.address}</td>
										</tr>

										<tr>
											<th>Website</th>
											<td>${data.website}</td>
										</tr>

										<tr>
											<th>Founded</th>
											<td>${data.founded}</td>
										</tr>

										<tr>
											<th>Venue</th>
											<td>${data.venue}</td>
										</tr>
									</tbody>
								</table>

							</div>
						</div>
					</div>

				</div>

				<nav>
					<div class="nav-wrapper red darken-4">
						<div class="col s12">
							<a class="breadcrumb"><i class="material-icons left">info</i>Players and Staff</a>
						</div>
					</div>
				</nav>

				<div class="row">

					<div class="col s12">
						<div class="card">
							<div class="card-content">


								<table class="responsive-table striped">
									<thead>
										<tr>
											<th>No.</th>
											<th>Player Name</th>
											<th>Role</th>
											<th>Position</th>
											<th>Nationality</th>
										</tr>
									</thead>
							
									<tbody></tbody>
								</table>

							</div>
						</div>
					</div>

				</div>

			</div>

		</div>
	`;

	return result;
}

const templateTeamSquadList = (number, data) => {
	let result = `
		<tr>
			<td>${number}</td>
			<td>${data.name}</td>
			<td>${data.role}</td>
			<td>${data.position}</td>
			<td>${data.nationality}</td>
		</tr>
	`;

	return result;
}

// ----------------------------------------------------------------------- //

const status = response => {
	if (response.status !== 200) {
		return Promise.reject(new Error(response.statusText));
	} else {
		return Promise.resolve(response);
	}
}

const json = response => {
	return response.json();
}

const error = error => {
	console.log("Error : " + error);
}

const getDateToday = () => {
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let yyyy = today.getFullYear();

	today = `${yyyy}-${mm}-${dd}`;

	return today;
}

const getDateNextWeek = () => {
	let today = new Date();
	let dd = String(today.getDate() + 7).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let yyyy = today.getFullYear();

	today = `${yyyy}-${mm}-${dd}`;

	return today;
}

const changeDate = date => {
	let localDate = new Date(date);

	return localDate;
}

const setToast = (text) => {
	M.toast({html: text});
}

const setBanner = (title, text) => {
	let widget = "";

	if ((title !== undefined) && (text !== undefined)) {
		widget = `
			<div class="row">
				<div class="col s12">
					<div class="card white">
						<div class="card-content">
							<span class="card-title">${title}</span>
							<p>
								${text}
							</p>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	document.querySelector("#banner").innerHTML = widget;
}

const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}