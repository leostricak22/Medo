function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(';');

  // Loop through the array elements
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split('=');

    /* Removing whitespace at the beginning of the cookie name
    and compare it with the given string */
    if (name == cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }

  // Return null if not found
  return null;
}

function checkCookie() {
  // Get the cookie using the function above
  var userCookie = getCookie('uuid');

  if (userCookie) {
    // If the cookie exists, you might want to validate its value with the
    // server
    console.log('Cookie found! Value is: ' + userCookie);
  } else {
    // No cookie found
    console.log('Cookie not found!');
  }
}

// Run the checkCookie function to check for the cookie
checkCookie();


function validateCookie(cookieValue) {
  fetch('http://10.42.129.183:5000/authentication/auth', {
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
        } else {
          console.log('Cookie is not valid');
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

