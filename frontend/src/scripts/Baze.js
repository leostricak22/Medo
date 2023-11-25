var DataAdapter = {};

var ucitajBazupatientGrid = async function () {
	let naziv_baze = "patientGrid"
	if(!DataAdapter[naziv_baze]) {
		DataAdapter[naziv_baze] = new $.jqx.dataAdapter({
			type: 'GET',
			datatype: "json",
			url: backend_url + "/patients",
			async: true,
			sortcolumn: 'patient_id',
			sortdirection: 'asc',
			dataFields: [
				{name: 'patient_id', dataType: 'int'},
				{name: 'cancer_id', dataType: 'int'},
				{name: 'dob', dataType: 'date'},
				{name: 'height', dataType: 'int'},
				{name: 'weight', dataType: 'int'},
				{name: 'gender', dataType: 'int'},
				{name: 'treatment_start', dataType: 'date'},
				{name: 'treatment_done', dataType: 'date'},
			]
		})
		DataAdapter[naziv_baze].dataBind()
		data_binding[naziv_baze] = "uncompleted"
	}
}
