function novi_datum(datum) {
	datum = new Date(datum)
	return  datum.getHours() + ":" + datum.getMinutes() + ", "+ datum.toDateString();
}

function OibValidiraj(oib) {
	err = [];
	HR = oib.substring(0, 2);
	if (HR.toUpperCase() == "HR") oib = oib.substring(2, oib.length);
	oiblen = oib.length;
	if ((oib.length > 0) && isNaN(oib)) err.push("Unijeli ste nedozvoljene znakove!");
	if ((HR.toUpperCase() == "HR") && (HR != "HR")) err.push("HR mora biti napisano velikim slovima!");
	if ((oiblen == 11) && !isNaN(oib)) {
		var b = parseInt(oib, 10);
		var a = 10;
		for (var i = 0; i < 10; i++) {
			a = a + parseInt(oib.substr(i, 1), 10);
			a = a % 10;
			if (a == 0) a = 10;
			a *= 2;
			a = a % 11;
		}
		var kontrolni = 11 - a;
		if (kontrolni == 10) kontrolni = 0;
		if (kontrolni != parseInt(oib.substr(10, 1))) err.push("Kontrolni broj ne odgovara!");
	}
	//else if ((oiblen == 0) && (HR != "HR")) err.push("Nema ničeg...")
	else if (((oiblen > 0) && (oiblen < 11)) || ((oiblen == 0) && (HR == "HR"))) err.push("Broj je prekratak!");
	else if (oiblen > 11) err.push("Broj je predugačak!")

	errLen = err.length;

	if (errLen == 0) {
		return true;
	}
	else {

		return false;
	}
}

function LimexKreirajTrenutniDatumParametarVrijeme(sat,minuta,sekunda,milisekunda)
{
	let tmpdatum = new Date();
	tmpdatum.setHours(sat);
	tmpdatum.setMinutes(minuta);
	tmpdatum.setSeconds(sekunda);
	tmpdatum.setMilliseconds(milisekunda);
	return(tmpdatum);
}

function LimexDatumParametarVrijeme(datum,sat, minuta, sekunda, milisekunda) {
	let tmpdatum = datum;
	tmpdatum.setHours(sat);
	tmpdatum.setMinutes(minuta);
	tmpdatum.setSeconds(sekunda);
	tmpdatum.setMilliseconds(milisekunda);
	return (tmpdatum);
}

function LimexDateUMySqlTimestamp(datum) {

	let godina = datum.getFullYear();
	let tmp = '00' + (datum.getMonth() + 1);
	let mjesec = tmp.substring(tmp.length - 2, 4);
	tmp = '00' + datum.getDate();
	let dan = tmp.substring(tmp.length - 2, 4);
	tmp = '00' + datum.getHours();
	let sat = tmp.substring(tmp.length - 2, 4);
	tmp = '00' + datum.getMinutes();
	let minute = tmp.substring(tmp.length - 2, 4);
	tmp = '00' + datum.getSeconds();
	let sekunde = tmp.substring(tmp.length - 2, 4);
	tmp = '000' + datum.getMilliseconds();
	let milisekunde = tmp.substring(tmp.length - 3, 6);

	return godina + '-' + mjesec + '-' + dan + ' ' + sat + ':' + minute + ':' + sekunde;
};

function LimexTimestampUjsDate(timestamp) //2023-02-14T21:19:39
{
	const limexdatum = new Date(timestamp);
	let godina = limexdatum.getFullYear();
	let tmp = '00' + (limexdatum.getMonth() + 1);
	let mjesec = tmp.substring(tmp.length - 2, 4);
	tmp = '00' + limexdatum.getDate();
	let dan = tmp.substring(tmp.length - 2, 4);
	tmp = '00' + limexdatum.getHours();
	let sat = tmp.substring(tmp.length - 2, 4);
	tmp = '00' + limexdatum.getMinutes();
	let minuta = tmp.substring(tmp.length - 2, 4);
	tmp = '00' + limexdatum.getSeconds();
	let sekunda = tmp.substring(tmp.length - 2, 4);
	tmp = '000' + limexdatum.getMilliseconds();
	let milisekunde = tmp.substring(tmp.length - 3, 6);

	return godina + '-' + mjesec + '-' + dan + ' ' + sat + ':' + minuta + ':' + sekunda;
};

function LimexTimestampUHrDatum(timestamp) {

	let godina = timestamp.substring(0, 4);
	let mjesec = timestamp.substring(5, 7);
	let dan = timestamp.substring(8, 10);
	let sat = timestamp.substring(11, 13);
	let minuta = timestamp.substring(14, 16);
	let sekunda = timestamp.substring(17, 19);

	return dan + '.' + mjesec + '.' + godina + ' ' + sat + ':' + minuta + ':' + sekunda;
};

function Limex_full_date_and_time (unparsed_date) {
	const date = new Date(unparsed_date);

	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const seconds = date.getSeconds().toString().padStart(2, '0');

	return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
}

function LimexDatumParseHRV(datum_string_hrv) {
	let sat = "0"
	let minuta = "0"
	let sekunda = "0"

	let [datum_string, vrijeme_string] = datum_string_hrv.split(' ')
	let [dan, mjesec, godina] = datum_string.split('.')
	try {
		[sat, minuta, sekunda] = vrijeme_string.split(':')
	} catch {}

	return new Date(+godina, +mjesec - 1, +dan, +sat, +minuta, +sekunda)
}

function LimexRazdvojiDelimiter(tekst, kojipodatak, delimiter) {
	let myArray = tekst.split(delimiter);
	return (myArray[kojipodatak-1]);
}

function LimexCookieSet(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function LimexCookieGet(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function LimexCookieCheck() {
	var user = getCookie("username");
	if (user != "") {
		alert("Welcome again " + user);
	} else {
		user = prompt("Please enter your name:", "");
		if (user != "" && user != null) {
			setCookie("username", user, 365);
		}
	}
}