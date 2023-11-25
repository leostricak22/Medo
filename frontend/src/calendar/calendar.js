$(document).ready(function () {
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
		width: 850,
		height: 600,
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
});