function redirect_to_landing() {
  let url = location.protocol + '//' + location.host + location.pathname

  if (!(url.endsWith("/landing.html") || url.endsWith("/login.html")))
    window.location.replace("../landing/landing.html")
}

function redirect_to_dashboard() {
  let url = location.protocol + '//' + location.host + location.pathname

  if (url.endsWith("/landing.html") || url.endsWith("/login.html"))
    window.location.replace("../dashboard/dashboard.html")
}

function getCookie(name) {
  var cookieArr = document.cookie.split(';');

  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split('=');

    if (name == cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }

  return null;
}

function checkCookie() {
  var userCookie = getCookie('uuid');

  if (userCookie) {
    console.log('Cookie found! Value is: ' + userCookie);
    redirect_to_dashboard()
  } else {
    redirect_to_landing();
  }
}

checkCookie();


function validateCookie(cookieValue) {
  fetch(backend_url+'/authentication/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({cookie: cookieValue}),
  })
      .then(response => response.json())
      .then(data => {
        if (data.access === "granted") {
          console.log('Cookie is valid');
          redirect_to_dashboard()
        } else {
          logout();
        }
      })
      .catch(error => {
        console.error('Error validating cookie:', error);
      });
}

var userCookie = getCookie('uuid');
if (userCookie) {
  validateCookie(userCookie);
}

