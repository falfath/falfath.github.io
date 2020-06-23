document.addEventListener("DOMContentLoaded", () => {

	const sideNav = document.querySelector(".sidenav");
	M.Sidenav.init(sideNav);

	const loadNav = () => {
		let xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status !== 200) return;

				document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
					elm.innerHTML = xhttp.responseText;
				});

				document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
					elm.addEventListener("click", event => {
						M.Sidenav.getInstance(sideNav).close();
						
						let page = event.target.getAttribute("href").substr(1);
						loadPage(page);
					});
				});
			}
		};
		xhttp.open("GET", "nav.html", true);
		xhttp.send();
	}

	loadNav();

	const loadPage = page => {
		let xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {
			if (this.readyState === 4) {
				let content = document.querySelector("#body-content");

				if (this.status === 200) {
					content.innerHTML = xhttp.responseText;

					switch (page) {
						case "home":
							getHomePageStandings();
							getHomePageMatch();
							setShowMore("#standings-show-more");
							setBanner(
								"Hello, Fahmi Alfath",
								`Check out BundesLiga recent match, upcoming match, 
								league standings, and team informations. <br/>
								You can save upcoming match and your favorite team.`
							);
							break;
						case "standings":
							getStandings();
							setBanner();
							break;
						case "matches":
							getMatches();
							setBanner();
							break;
						case "teams":
							getTeams();
							setBanner();
							break;
						case "favorites":
							getSavedTeams();
							setBanner(
								"Hello, Fahmi Alfath",
								"Check your Favorite Teams here."
							);
							break;
						case "about":
							setBanner(
								"About this App",
								"This App help BundesLiga fans to looking for league standings, matches schedule, and team informations."
							);
							break;
					}
				} else if (this.status === 404) {
					setBanner("Error 404!", "Page Not Found.");
				} else {
					setBanner("Oops, Sorry!", "Page Is Not Accessible.");
				}
			}
		};

		xhttp.open("GET", `pages/${page}.html`, true);
		xhttp.send();
	}

	let page = window.location.hash.substr(1);
	if (page === "") { page = "home" };
	loadPage(page);

	const setShowMore = (btnID) => {
		btn = document.querySelector(btnID);

		btn.addEventListener("click", event => {
			let page = btn.getAttribute("href").substr(1);
			loadPage(page);
		});
	}

});