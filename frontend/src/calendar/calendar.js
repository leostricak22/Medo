var monday = -1;
var last_date = -1;

function get_date(date= new Date()) {
	while(date.getDay() !== 1)
		date.setDate(date.getDate() - 1);

	monday = date;
}

function format_date(date) {
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	return day+""+month+""+year
}

get_date(new Date("2023-11-27"))

function set_date() {
	let current_date = monday

	for(let i=0;i<7;i++) {
		let titlecell = document.getElementById("titlecell"+i)
		titlecell.innerText = format_date(monday)
		current_date.setDate(current_date.getDate() + 1);
	}
}

set_date();

function add_rows() {
	let calendar = document.getElementById("calendarbody")

	for(let i=0;i<24;i++) {
		let cal_row = document.createElement("tr")
		cal_row.className = "calrow"

		for(let j=0;j<8;j++) {
			if(j === 0)
				cal_row.innerHTML += "<td class='datacell'>"+i+":00</td>"
			else
				cal_row.innerHTML += "<td class='datacell'></td>"
		}

		calendar.appendChild(cal_row)
	}
}

add_rows()