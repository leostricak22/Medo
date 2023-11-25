var machine_type = [];
var machinedata = [];

$(document).ready(async function () {
	var appointments = new Array();

	var appointment1 = {
		id: "id1",
		description: "George brings projector for presentations.",
		location: "",
		subject: "Fashion Expo",
		calendar: "East Coast Events",
		start: new Date(2023, 11, 25, 9, 0, 0),
		end: new Date(2023, 11, 25, 16, 0, 0),
		patient:"123"
	}

	var appointment2 = {
		id: "id2",
		description: "",
		location: "",
		subject: "Cloud Data Expo",
		calendar: "Middle West Events",
		start: new Date(2015, 10, 20, 10, 0, 0),
		end: new Date(2015, 10, 22, 15, 0, 0),
		patient:"123"
	}

	var appointment3 = {
		id: "id3",
		description: "",
		location: "",
		subject: "Digital Media Conference",
		calendar: "West Coast Events",
		start: new Date(2015, 10, 23, 11, 0, 0),
		end: new Date(2015, 10, 28, 13, 0, 0),
		patient:"123"
	}

	var appointment4 = {
		id: "id4",
		description: "",
		location: "",
		subject: "Modern Software Development Conference",
		calendar: "West Coast Events",
		start: new Date(2015, 10, 10, 16, 0, 0),
		end: new Date(2015, 10, 12, 18, 0, 0),
		patient:"123"
	}

	var appointment5 = {
		id: "id5",
		description: "",
		location: "",
		subject: "Marketing Future Expo",
		calendar: "Middle West Events",
		start: new Date(2015, 10, 5, 15, 0, 0),
		end: new Date(2015, 10, 6, 17, 0, 0),
		patient:"123"
	}

	var appointment6 = {
		id: "id6",
		description: "",
		location: "",
		subject: "Future Computing",
		calendar: "East Coast Events",
		start: new Date(2015, 10, 13, 14, 0, 0),
		end: new Date(2015, 10, 20, 16, 0, 0),
		patient:"123"
	}
	appointments.push(appointment1);
	appointments.push(appointment2);
	appointments.push(appointment3);
	appointments.push(appointment4);
	appointments.push(appointment5);
	appointments.push(appointment6);

	var source =
		{
			dataType: "array",
			dataFields: [
				{ name: 'id', type: 'string' },
				{ name: 'description', type: 'string' },
				{ name: 'location', type: 'string' },
				{ name: 'subject', type: 'string' },
				{ name: 'calendar', type: 'string' },
				{ name: 'start', type: 'date' },
				{ name: 'end', type: 'date' },
				{ name: 'patient', type: 'string' }
			],
			id: 'id',
			localData: appointments
		};
	var adapter = new $.jqx.dataAdapter(source);

	var printButton = null;

	$("#scheduler").jqxScheduler({
		date: new $.jqx.date(2015,11,28),
		width: $(window).width - 5,
		height: $(window).height - 5,
		source: adapter,
		showLegend: true,
		editDialogCreate: function (dialog, fields, editAppointment) {
			fields.repeatContainer.hide();
			fields.statusContainer.hide();
			fields.timeZoneContainer.hide();

			fields.subjectLabel.html("Title");
			fields.locationLabel.html("Where");
			fields.fromLabel.html("Start");
			fields.toLabel.html("End");
			fields.resourceLabel.html("Calendar");

			fields.colorContainer.html("Patient");

		},
		editDialogOpen: function (dialog, fields, editAppointment) {
			if (!editAppointment && printButton) {
				printButton.jqxButton({ disabled: true });
			}
			else if (editAppointment && printButton) {
				printButton.jqxButton({ disabled: false });
			}
		},
		editDialogClose: function (dialog, fields, editAppointment) {
		},
		editDialogKeyDown: function (dialog, fields, editAppointment, event) {

		},
		resources:
			{
				colorScheme: "scheme01",
				dataField: "calendar",
				source: new $.jqx.dataAdapter(source)
			},
		appointmentDataFields:
			{
				from: "start",
				to: "end",
				id: "id",
				description: "description",
				location: "place",
				subject: "subject",
				resourceId: "calendar",
				patient: "patient"
			},
		view: "weekView",
		views:
			[
				'dayView',
				'weekView',
				'monthView'
			]
	});

	// DOBIVANJE POLJA ŠIFRARNIKA
	let polja_trenutnog_sifrarnika = []
	$("#calendarWindow").find('[id*="UrediLxVParametarLxV"]').each(function() {
		polja_trenutnog_sifrarnika.push($(this).attr("id").split("UrediLxVParametarLxV")[1]);
	});

	sifrarnici_polja["Calendar"] = polja_trenutnog_sifrarnika
	if(!sifrarnici_odabir["Calendar"])
		sifrarnici_odabir["Calendar"] = {}


	// JQXWINDOW - START
	for(let i=0;i<sifrarnici_polja["Calendar"].length;i++) {
		$('#jqxgridCalendarUrediLxVParametarLxVschedule_datetime').jqxDateTimeInput({
			theme: "arctic",
			formatString: "dd.MM.yyyy",
			width: '300px',
			height: '18px',
			culture: 'hr-HR'
		});

		let durationdata = [
			10,
			15,
			20,
			25,
			30
		];

		const response = await fetch(backend_url+"/patients");
		let patientsall = await response.json();

		let patients = [];

		for(let i=0;i<patientsall.length;i++) {
			patients.push(patientsall[i].user_fname);
		}

		$('#jqxgridCalendarUrediLxVParametarLxVpatient_id').jqxDropDownList({
			source: patients
		});
		$('#jqxgridCalendarUrediLxVParametarLxVmachine_id').jqxDropDownList({
			source: machinedata
		});

		$("#jqxgridCalendarUrediLxVParametarLxVmachine_id").on("open", async function (event) {
			const response = await fetch(backend_url+"/schedule/machines/"+patients[$('#jqxgridCalendarUrediLxVParametarLxVpatient_id').jqxDropDownList("selectedIndex")].user_id);
			let machinedataall = await response.json();


			for(let i=0;i<machinedataall.length;i++) {
				machinedata.push(machinedataall[i].machine_name);
			}

			console.log(backend_url+"/schedule/machines/"+patientsall[$('#jqxgridCalendarUrediLxVParametarLxVpatient_id').jqxDropDownList("selectedIndex")].cancer_id)
			console.log(machinedata)

			$('#jqxgridCalendarUrediLxVParametarLxVmachine_id').jqxDropDownList({
				source: machinedata
			});
		})

		$('#jqxgridCalendarUrediLxVParametarLxVduration').jqxDropDownList({
			source: durationdata
		});
	}

	for(let i=0;i<$(".LimexSifrarnik").length;i++) {
		let naziv_baze = $(".LimexSifrarnik")[i].onclick.toString().split("sifrarnik_prozor_dodaj('")[1].split("'")[0]
	}

	$("#jqxgridCalendarUredivanjeCancel").jqxButton();
	$("#jqxgridCalendarUredivanjeSave").jqxButton();
	$("#jqxgridCalendarpopupUredivanje").jqxWindow({
		width: 500,
		height: 300,
		resizable: true,
		isModal: true,
		autoOpen: false,
		cancelButton: $("#jqxgridCalendarUredivanjeCancel"),
		modalOpacity: 0.1
	});
	// UREDIVANJE / NOVO - PODEŠAVANJE POLJA - END

	// UREĐIVANJE / NOVO - OTVORI PROZOR - START
	async function prozorUredivanjeOtvori(rowindex) {
		//sakrij_podatke_label();

		otvoreni_sifrarnici.push("Calendar")

		sifrarnici_mod_uredivanja_novo["Calendar"] = false;
		$("#jqxgridCalendarpopupUredivanjeNaslov").html("Uređivanje");
		let editrow = rowindex;
		let dataRecord = $("#jqxgridCalendar").jqxGrid('getrowdata', editrow);
		oldrow = dataRecord
		for(let i=0;i<sifrarnici_polja["Calendar"].length;i++) {
			let input_type = $('#jqxgridCalendarUrediLxVTekstLxV' + sifrarnici_polja["Calendar"][i]).attr("input-type")

			$("#jqxgridCalendarUrediLxVParametarLxV" + sifrarnici_polja[sifrarnik_id][i]).val(dataRecord[sifrarnici_polja["Calendar"][i]]);

			/*if((input_type == "date" || input_type == "datetime") && dataRecord[sifrarnici_polja[sifrarnik_id][i]] !== "") {
				$("#jqxgridCalendarUrediLxVParametarLxV" + sifrarnici_polja[sifrarnik_id][i]).jqxDateTimeInput('setDate', LimexDatumParseHRV(dataRecord[sifrarnici_polja[sifrarnik_id][i]]));
			}*/
		}

		// show the popup window.
		$("#jqxgridCalendarpopupUredivanje").jqxWindow('open');
	}

	async function prozorDodajOtvori() {
		//sakrij_podatke_label();

		otvoreni_sifrarnici.push("Calendar")

		sifrarnici_mod_uredivanja_novo["Calendar"] = true;
		$("#jqxgridCalendarpopupUredivanjeNaslov").html("Novi unos");
		editrow = -1;

		for(let i=0;i<sifrarnici_polja["Calendar"].length;i++) {
			$('#jqxgridCalendarUrediLxVParametarLxV' + sifrarnici_polja["Calendar"][i]).val("");
		}

		$("#jqxgridCalendarpopupUredivanje").jqxWindow('open');
	}

	// JQXWINDOW - END

	$('#scheduler').on('cellClick', function (event) {
		// Event triggered when a cell is clicked
		var args = event.args;
		prozorDodajOtvori();
	});
});