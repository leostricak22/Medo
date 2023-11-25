var machine_type = [];
var machinedata = [];
var machinedataall;
var patientsall;

$(document).ready(async function () {
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
			localData: {}
		};
	var adapter = new $.jqx.dataAdapter(source);

	let scheduler = $("#scheduler").jqxScheduler({
		date: new $.jqx.date(),
		width: $(window).width - 5,
		height: $(window).height - 5,
		source: adapter,
		ready: function () {
			// Disable double-click on time cells
			$(".jqx-scheduler-time-cell, .jqx-scheduler-date-cell").off('dblclick');
		},
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
		patientsall = await response.json();

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

		$("#jqxgridCalendarUrediLxVParametarLxVpatient_id").on("select", async function (event) {
			const response = await fetch(backend_url+"/schedule/machines/"+patientsall[$('#jqxgridCalendarUrediLxVParametarLxVpatient_id').jqxDropDownList("selectedIndex")].cancer_id);
			machinedataall = await response.json();

			machinedata = [];
			for(let i=0;i<machinedataall.length;i++) {
				machinedata.push(machinedataall[i].machine_name);
			}

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

	$("#jqxgridCalendarUredivanjeSave").on("click", async function (){
		let data_to_send = {}
		data_to_send["schedule_datetime"] = new Date($("#jqxgridCalendarUrediLxVParametarLxVschedule_datetime").val()).getTime()
		data_to_send["patient_id"] = patientsall[$('#jqxgridCalendarUrediLxVParametarLxVpatient_id').jqxDropDownList("selectedIndex")].patient_id
		data_to_send["machine_id"] = machinedataall[$('#jqxgridCalendarUrediLxVParametarLxVmachine_id').jqxDropDownList("selectedIndex")].machine_id
		data_to_send["duration"] = 1

		const response = await fetch(backend_url+"/schedule", {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			redirect: "follow",
			referrerPolicy: "no-referrer",
			body: JSON.stringify(data_to_send),
		});

		let obj = await response.json();
		
	})
	// UREDIVANJE / NOVO - PODEŠAVANJE POLJA - END

	// UREĐIVANJE / NOVO - OTVORI PROZOR - START
	async function prozorUredivanjeOtvori(rowindex) {
		otvoreni_sifrarnici.push("Calendar")

		sifrarnici_mod_uredivanja_novo["Calendar"] = false;
		$("#jqxgridCalendarpopupUredivanjeNaslov").html("Uređivanje");
		let editrow = rowindex;
		let dataRecord = $("#jqxgridCalendar").jqxGrid('getrowdata', editrow);
		oldrow = dataRecord
		for(let i=0;i<sifrarnici_polja["Calendar"].length;i++) {
			let input_type = $('#jqxgridCalendarUrediLxVTekstLxV' + sifrarnici_polja["Calendar"][i]).attr("input-type")

			$("#jqxgridCalendarUrediLxVParametarLxV" + sifrarnici_polja["Calendar"][i]).val(dataRecord[sifrarnici_polja["Calendar"][i]]);
		}

		$("#jqxgridCalendarpopupUredivanje").jqxWindow('open');
	}

	async function prozorDodajOtvori() {
		//sakrij_podatke_label();

		otvoreni_sifrarnici.push("Calendar")

		sifrarnici_mod_uredivanja_novo["Calendar"] = true;
		$("#jqxgridCalendarpopupUredivanjeNaslov").html("New entry");
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

var newAppointment = {
	id: "id123",
	description: "Discuss project milestones",
	location: "Conference Room",
	subject: "Project Meeting",
	calendar: "Work",
	start: new Date(2023, 11, 25, 9, 0, 0),
	end: new Date(2023, 11, 25, 10, 0, 0)
};

$("#scheduler").jqxScheduler('addAppointment', newAppointment);
