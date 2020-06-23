const base_url	= "https://api.football-data.org/v2/";
const leagueID	= "2002";
const fetchApi	= (url) => {
	return fetch (url, {
		headers: {
			"X-Auth-Token" : "06e70229defd4011a0cee4474845af8a"		
		}
	});
};

const getHomePageStandings = () => {
	let currentUrl = `${base_url}competitions/${leagueID}/standings?standingType=TOTAL`;

	if ("caches" in window) {
		caches.match(currentUrl).then((response) => {
			if (response) {
				response.json().then((data) => {
					let standingsHome = "";

					for (let index = 0; index < 5; index++) {
						let list = data.standings[0].table[index];
			
						standingsHome += templateStandings(list);
					}
			
					document.querySelector(".responsive-table tbody").innerHTML = standingsHome;
				});
			}
		});
	}

	fetchApi(currentUrl)
	.then(status)
	.then(json)
	.then(data => {
		let standingsHome	= "";

		for (let index = 0; index < 5; index++) {
			let list = data.standings[0].table[index];

			standingsHome += templateStandings(list);
		}

		document.querySelector(".responsive-table tbody").innerHTML = standingsHome;
	})
	.catch(error);
}

const getHomePageMatch = () => {
	let today 		= getDateToday();
	let nextWeek 	= getDateNextWeek();
	let currentUrl 	= `${base_url}competitions/${leagueID}/matches?dateFrom=${today}&dateTo=${nextWeek}`;

	if ("caches" in window) {
		caches.match(currentUrl).then((response) => {
			if (response) {
				response.json().then((data) => {
					let matchHome 	= "";

					for (let index = 0; index < 4; index++) {
						let list = data.matches[index];
			
						matchHome += templateMatches(list);
					}
			
					document.querySelector(".matches").innerHTML = matchHome;
				});
			}
		});
	}

	fetchApi(currentUrl)
	.then(status)
	.then(json)
	.then(data => {
		let matchHome 	= "";

		for (let index = 0; index < 4; index++) {
			let list = data.matches[index];

			matchHome += templateMatches(list);
		}

		document.querySelector(".matches").innerHTML = matchHome;
	});
}


const getStandings = () => {
	let currentUrl = `${base_url}competitions/${leagueID}/standings?standingType=TOTAL`;

	if ("caches" in window) {
		caches.match(currentUrl).then((response) => {
			if (response) {
				response.json().then((data) => {
					let standings 	= "";
			
					data.standings[0].table.forEach(list => {
						standings += templateStandings(list);
					});
			
					document.querySelector(".responsive-table tbody").innerHTML = standings;
				});
			}
		});
	}
			

	fetchApi(currentUrl)
	.then(status)
	.then(json)
	.then(data => {
		let standings 	= "";

		data.standings[0].table.forEach(list => {
			standings += templateStandings(list);
		});

		document.querySelector(".responsive-table tbody").innerHTML = standings;
	});
}

const getMatches = () => {
	let today 		= getDateToday();
	let nextWeek 	= getDateNextWeek();
	let currentUrl	= `${base_url}competitions/${leagueID}/matches?dateFrom=${today}&dateTo=${nextWeek}`;

	if ("caches" in window) {
		caches.match(currentUrl).then((response) => {
			if (response) {
				response.json().then((data) => {
					let match 	= "";

					data.matches.forEach(list => {
						match += templateMatches(list);
					});
			
					document.querySelector(".matches").innerHTML = match;
				});
			}
		});
	}

	fetchApi(currentUrl)
	.then(status)
	.then(json)
	.then(data => {
		let match 	= "";

		data.matches.forEach(list => {
			match += templateMatches(list);
		});

		document.querySelector(".matches").innerHTML = match;
	});
}

const getTeams = () => {	
	let currentUrl = `${base_url}competitions/${leagueID}/teams`;
	
	if ("caches" in window) {
		caches.match(currentUrl).then((response) => {
			if (response) {
				response.json().then((data) => {
					let teams 	= "";

					data.teams.forEach(list => {
						teams += templateTeams(list);
					});
			
					document.querySelector(".team-grid").innerHTML = teams;
				});
			}
		});
	}

	fetchApi(currentUrl)
	.then(status)
	.then(json)
	.then(data => {
		let teams 	= "";

		data.teams.forEach(list => {
			teams += templateTeams(list);
		});

		document.querySelector(".team-grid").innerHTML = teams;
	});
}

const getTeamByID = () => {
	return new Promise((resolve, reject) => {
		let urlParams 	= new URLSearchParams(window.location.search);
		let teamID 		= urlParams.get("teamID");
		let currentUrl	= `${base_url}teams/${teamID}`;

		if ("caches" in window) {
			caches.match(currentUrl).then((response) => {
				if (response) {
					response.json().then((data) => {
						teamDetail = templateTeamDetail(data);

						document.querySelector("#body-content").innerHTML = teamDetail;
			
						let squadList 	= "";
						let number 		= 1;
			
						data.squad.forEach(squad => {
							squadList += templateTeamSquadList(number, squad);
			
							number++;
						});
			
						document.querySelector(".responsive-table tbody").innerHTML = squadList;
			
						resolve(data);
					});
				}
			});
		}
		
		fetchApi(currentUrl)
		.then(status)
		.then(json)
		.then(data => {
			teamDetail = templateTeamDetail(data);

			document.querySelector("#body-content").innerHTML = teamDetail;

			let squadList 	= "";
			let number 		= 1;

			data.squad.forEach(squad => {
				squadList += templateTeamSquadList(number, squad);

				number++;
			});

			document.querySelector(".responsive-table tbody").innerHTML = squadList;

			resolve(data);
		});
	});
}

const getSavedTeams = () => {
	getAll().then((teams) => {
		var teamsGrid = "";
		teams.forEach((list) => {	
			teamsGrid += templateTeams(list, true);
		});

		document.querySelector(".team-grid").innerHTML = teamsGrid;
	});
}

const getSavedTeamByID = () => {
	let urlParams 	= new URLSearchParams(window.location.search);
	let teamID 		= urlParams.get("teamID");

	getByID(teamID).then((data) => {
		teamDetail = templateTeamDetail(data);

		document.querySelector("#body-content").innerHTML = teamDetail;

		let squadList 	= "";
		let number 		= 1;
		data.squad.forEach(squad => {
			squadList += templateTeamSquadList(number, squad);

			number++;
		});

		document.querySelector(".responsive-table tbody").innerHTML = squadList;

	});
}