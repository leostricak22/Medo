function handleLogin(event) {
	event.preventDefault();

	const username = document.getElementById("doc-username").value;
	const password = document.getElementById("doc-password").value;

	fetch("http://10.42.129.183:5000/authentication/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username: username, password: password }), // Convert credentials to JSON
	})
		.then((response) => response.json())
		.then((data) => {
			if (data && data.cookie != "0") {
				var expires = "";

				var date = new Date();
				date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
				expires = "; expires=" + date.toUTCString();

				document.cookie =
					"uuid" + "=" + data.cookie + expires + "; path=/";
				window.location.replace("../dashboard/dashboard.html");
			} else console.log("login neuspjesno");
			//TODO ispisati poruku o greski
		})
		.catch((error) => {
			console.error(
				"There has been a problem with your fetch operation:",
				error
			);
		});
}

function logout(){
	document.cookie = "uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	window.location.replace("../landing/landing.html")
}

document.addEventListener("DOMContentLoaded", function () {
	document.querySelector("form").addEventListener("submit", handleLogin);
});