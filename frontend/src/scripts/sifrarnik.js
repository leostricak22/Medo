function prikazi_loader() {
	let loader_container = "<div class='loadercontainer'></div>"
	let loader = "<div class='loader'></div>"

	$("html").append(loader_container)
	$(".loadercontainer").append(loader)
}

function sakrij_loader() {
	$(".loadercontainer").hide()
}

prikazi_loader();

function get_sirina_gumba(novasirina, limit ) {
	if(novasirina <= limit)
		return 0
	return 100
}

var sirina_gumba = get_sirina_gumba($(this).outerWidth(), 600)

function provjeri_podatke_sifrarnika(sifrarnik_id) {
	let svi_sifrarnici = $(".LimexSifrarnik");

	if(svi_sifrarnici.length > 0) {
		for (let i = 0; i < svi_sifrarnici.length; i++) {
			if (svi_sifrarnici[i].id.includes("jqxgrid" + sifrarnik_id)) {
				let naziv_tablice = svi_sifrarnici[i].onclick.toString().split("sifrarnik_prozor_dodaj('")[1].split("'")[0]

				let label_id = $("#" + svi_sifrarnici[i].id).parent().find("label")[0].id
				let input_id = $("#" + svi_sifrarnici[i].id).parent().find("input")[0].id
				let polje_tekst = $("#" + input_id.replace("ParametarLxV", "TekstLxV")).text()

				let polje_za_dodati = label_id.split(sifrarnik_id + "UrediLxV")[1].split("LabelaLxV")[1].split("ParametarLxV")[0]
				let odabrani_redak = (DataAdapter[naziv_tablice].records.find(function (item, i) {
					return item[polje_za_dodati].toString() === $('#' + input_id).val().toString()
				}))

				if (odabrani_redak === undefined) {
					$(".errorlabel").css("display", "")
					$(".errorlabel").text("Odabrana je kriva šifra kod polja: " + polje_tekst + "!")
					return 0
				}
			}
		}
	}

	// Sve su šifre ispravne
	$(".errorlabel").css("display", "none")
	return 1;
}

function sakrij_podatke_label() {
	$(".sifrarniklabela").text("")
	$(".errorlabel").css("display", "none")
}

async function prikazi_podatak_label(element, sifrarnik_id) {
	let label_id
	let naziv_tablice

	try {
		label_id = $("#" + element).parent().parent().find("label")[0].id
		naziv_tablice = $("#" + element).parent().parent().find(".LimexSifrarnik")[0].onclick.toString().split("sifrarnik_prozor_dodaj('")[1].split("'")[0]
	} catch {
		// NE POSTOJI LABELA
		return;
	}

	let polje_za_urediti = label_id.split(sifrarnik_id+"UrediLxV")[1].split("LabelaLxV")[0]
	let polje_za_dodati = label_id.split(sifrarnik_id+"UrediLxV")[1].split("LabelaLxV")[1].split("ParametarLxV")[0]
	let polje_za_prikazati = label_id.split(sifrarnik_id+"UrediLxV")[1].split("LabelaLxV")[1].split("ParametarLxV")[1]

	let odabrani_redak = (DataAdapter[naziv_tablice].records.find(function(item, i){
		return item[polje_za_dodati].toString() === $('#'+element).val().toString()
	}))

	try {
		odabrani_redak["odabir"] = false
		sifrarnici_odabir[naziv_tablice] = odabrani_redak
		sifrarnici_odabir[naziv_tablice].polje_za_urediti = polje_za_urediti
		sifrarnici_odabir[naziv_tablice].polje_za_dodati = polje_za_dodati

		let parent_sifrarnik_naziv = $("#"+sifrarnik_id).attr("class")

		console.log(sifrarnici_odabir[naziv_tablice][polje_za_urediti], sifrarnici_odabir[$("#"+sifrarnik_id).attr("class")][polje_za_dodati])
		console.log(!sifrarnici_mod_uredivanja_novo[sifrarnik_id])
		if (sifrarnici_odabir[naziv_tablice][polje_za_urediti] !== sifrarnici_odabir[$("#"+sifrarnik_id).attr("class")][polje_za_dodati] || sifrarnici_mod_uredivanja_novo[sifrarnik_id] === true) {
			try {
				window["data_forward_to_other_input_" + parent_sifrarnik_naziv](sifrarnik_id, naziv_tablice);
			} catch {
			}
		}

		$(".errorlabel").css("display", "none")

		$("#"+label_id).html(odabrani_redak[polje_za_prikazati])
	} catch {
		if($('#'+element).val().toString() !== "") {
			$('body').focus()
			await sifrarnik_prozor_dodaj(naziv_tablice)
		}
	}
}

// UČITAVANJE I KONFIGURACIJA ŠIFRARNIKA - START
async function load_sifrarnik(sifrarnik_id, sifrarnik_naziv) {
	// PODEŠAVANJE VISINE PROZORA - START
	let novasirina = $("#"+sifrarnik_id).parent().outerWidth();
	let novavisina = $("#"+sifrarnik_id).parent().outerHeight() * 0.97; // navbar zauzima 3vh (3%)

	let orientation = "horizontal"
	let width = novavisina - 45;
	let height = novavisina

	if(sifrarnik_id === "Gornji" || sifrarnik_id === "master") {
		height = novavisina + 400
	} else if(sifrarnik_id === "Donji" || sifrarnik_id === "slave") {
		orientation = "vertical"
		width = novasirina - 125
	}

	try {
		$('#Splitter' + sifrarnik_id + 'Glavni').jqxSplitter({
			width: (novasirina - 2) + "px",
			height: height + "px",
			orientation: orientation,
			panels: [{
				size: width.toString() + 'px',
				collapsible: true
			}]
		});
	} catch {
		return
	}
	// PODEŠAVANJE VISINE PROZORA - END

	// GLOBALNE VARIJABLE ZA SVAKI GRID POSEBNO - START
	sifrarnici_mod_uredivanja_novo[sifrarnik_id] = false;
	let oldrow = {}
	// GLOBALNE VARIJABLE ZA SVAKI GRID POSEBNO - END

	// ODABIR BAZE ŠIFRARNIKA - START
	try {
		window[sifrarnici_dinamicke_funkcije[sifrarnik_id]]();
	} catch {

	}
	// ODABIR BAZE ŠIFRARNIKA - END

	let polja_za_maknuti = []
	try {
		polja_za_maknuti = window[sifrarnik_naziv+"_MakniPoljaGrid"](sifrarnici_polja[sifrarnik_id]);
	} catch {}

	// PODEŠAVANJE NAZIVA STUPACA SA HTML-a - START
	let sifrarnik_stupci = []
	for(let i=0;i<sifrarnici_polja[sifrarnik_id].length;i++) {
		let sifrarnik_stupac = {}
		let polje_text = document.getElementById("jqxgrid" + sifrarnik_id + "UrediLxVTekstLxV" + sifrarnici_polja[sifrarnik_id][i]).innerHTML
		sifrarnik_stupac["text"] = polje_text.substring(0,polje_text.length)
		sifrarnik_stupac["dataField"] = sifrarnici_polja[sifrarnik_id][i]
		//sifrarnik_stupac["width"] = "0"

		if(sifrarnik_stupac["dataField"] === "date") {
			sifrarnik_stupac["cellsformat"] = 'dd.MM.yyyy'
			sifrarnik_stupac["filtertype"] = "date"
		} else if(sifrarnik_stupac["dataField"] === "datetime") {
			sifrarnik_stupac["cellsformat"] = 'dd.MM.yyyy HH:mm:ss'
			sifrarnik_stupac["filtertype"] = "date"
		}


		sifrarnik_stupac["rendered"] = tooltiprenderer

		if(!polja_za_maknuti.includes(sifrarnici_polja[sifrarnik_id][i]))
			sifrarnik_stupci.push(sifrarnik_stupac)
	}
	// PODEŠAVANJE NAZIVA STUPACA SA HTML-a - END

	// KREIRANJE GRIDA - START
	$("#jqxgrid"+sifrarnik_id).jqxGrid({
		theme: 'default',
		sortable: true,
		filterable: true,
		autoshowfiltericon: false,
		showfilterbar: true,
		filterbarmode: 'simple',
		width: "100%",
		height: '100%',
		//showstatusbar: true,
		//statusbarheight: 22,
		//showaggregates: true,
		altrows: true,
		columnsresize: true,
		columnsreorder: true,
		groupable: true,
		groupsexpandedbydefault: true,
		//localization: getLocalization("hr"),
		enabletooltips: true,
		editable: false,
		source: DataAdapter[sifrarnik_naziv],
		columns: sifrarnik_stupci
	});
	// KREIRANJE GRIDA - END


	// UREDIVANJE / NOVO - START
	// UREDIVANJE / NOVO - PODEŠAVANJE POLJA - START
	for(let i=0;i<sifrarnici_polja[sifrarnik_id].length;i++) {
		let input_type = $('#jqxgrid' + sifrarnik_id + 'UrediLxVTekstLxV' + sifrarnici_polja[sifrarnik_id][i]).attr("input-type")

		if(input_type === "datetime") {
			$('#jqxgrid' + sifrarnik_id + 'UrediLxVParametarLxV' + sifrarnici_polja[sifrarnik_id][i]).jqxDateTimeInput({
				theme: "arctic",
				formatString: "dd.MM.yyyy HH:mm:ss",
				showTimeButton: true,
				width: '300px',
				height: '18px',
				culture: 'hr-HR'
			});
		} else if(input_type == "date") {
			$('#jqxgrid' + sifrarnik_id + 'UrediLxVParametarLxV' + sifrarnici_polja[sifrarnik_id][i]).jqxDateTimeInput({
				theme: "arctic",
				formatString: "dd.MM.yyyy",
				width: '300px',
				height: '18px',
				culture: 'hr-HR'
			});
		} else
			$('#jqxgrid' + sifrarnik_id + 'UrediLxVParametarLxV' + sifrarnici_polja[sifrarnik_id][i]).jqxInput();

		$('#jqxgrid' + sifrarnik_id + 'UrediLxVParametarLxV' + sifrarnici_polja[sifrarnik_id][i]).on("focusout", async function () {
			await prikazi_podatak_label('jqxgrid' + sifrarnik_id + 'UrediLxVParametarLxV' + sifrarnici_polja[sifrarnik_id][i], sifrarnik_id);
		})
	}

	for(let i=0;i<$(".LimexSifrarnik").length;i++) {
		let naziv_baze = $(".LimexSifrarnik")[i].onclick.toString().split("sifrarnik_prozor_dodaj('")[1].split("'")[0]
		window["ucitajBazu" + naziv_baze]();
	}

	$("#jqxgrid"+sifrarnik_id+"UredivanjeCancel").jqxButton();
	$("#jqxgrid"+sifrarnik_id+"UredivanjeSave").jqxButton();
	$("#jqxgrid"+sifrarnik_id+"popupUredivanje").jqxWindow({
		width: novasirina-20,
		height: 300,
		resizable: true,
		isModal: true,
		autoOpen: false,
		cancelButton: $("#jqxgrid"+sifrarnik_id+"UredivanjeCancel"),
		modalOpacity: 0.1
	});
	// UREDIVANJE / NOVO - PODEŠAVANJE POLJA - END

	// UREĐIVANJE / NOVO - OTVORI PROZOR - START
	async function prozorUredivanjeOtvori(rowindex) {
		sakrij_podatke_label();

		otvoreni_sifrarnici.push(sifrarnik_id)

		sifrarnici_mod_uredivanja_novo[sifrarnik_id] = false;
		$("#jqxgrid"+sifrarnik_id+"popupUredivanjeNaslov").html("Uređivanje");
		let editrow = rowindex;
		let dataRecord = $("#jqxgrid"+sifrarnik_id).jqxGrid('getrowdata', editrow);
		oldrow = dataRecord
		for(let i=0;i<sifrarnici_polja[sifrarnik_id].length;i++) {
			let input_type = $('#jqxgrid' + sifrarnik_id + 'UrediLxVTekstLxV' + sifrarnici_polja[sifrarnik_id][i]).attr("input-type")

			$("#jqxgrid" + sifrarnik_id + "UrediLxVParametarLxV" + sifrarnici_polja[sifrarnik_id][i]).val(dataRecord[sifrarnici_polja[sifrarnik_id][i]]);

			if((input_type == "date" || input_type == "datetime") && dataRecord[sifrarnici_polja[sifrarnik_id][i]] !== "") {
				$("#jqxgrid" + sifrarnik_id + "UrediLxVParametarLxV" + sifrarnici_polja[sifrarnik_id][i]).jqxDateTimeInput('setDate', LimexDatumParseHRV(dataRecord[sifrarnici_polja[sifrarnik_id][i]]));
			}
		}

		// show the popup window.
		$("#jqxgrid"+sifrarnik_id+"popupUredivanje").jqxWindow('open');
	}

	async function prozorDodajOtvori() {
		sakrij_podatke_label();

		otvoreni_sifrarnici.push(sifrarnik_id)

		sifrarnici_mod_uredivanja_novo[sifrarnik_id] = true;
		$("#jqxgrid"+sifrarnik_id+"popupUredivanjeNaslov").html("Novi unos");
		editrow = -1;

		for(let i=0;i<sifrarnici_polja[sifrarnik_id].length;i++) {
			$('#jqxgrid' + sifrarnik_id + 'UrediLxVParametarLxV' + sifrarnici_polja[sifrarnik_id][i]).val("");
		}

		try {
			window["novo_postavi_pocetnu_vrijednost"+sifrarnik_naziv]('#jqxgrid'+sifrarnik_id+'UrediLxVParametarLxV');
		} catch {
		}

		$("#jqxgrid"+sifrarnik_id+"popupUredivanje").jqxWindow('open');
	}

	$('#jqxgrid'+sifrarnik_id+'popupUredivanje').on('open', function () {
		fokus_na_prvi_input(sifrarnik_id);
	});

	// UREĐIVANJE / NOVO - OTVORI PROZOR - END

	// UREDIVANJE / NOVO - ZATVARANJE PROZORA - START
	$('#jqxgrid'+sifrarnik_id+'popupUredivanje').on('close', function () {
		setTimeout(function () {
			$('#jqxgrid'+sifrarnik_id+'popupUredivanjeForma').jqxValidator('hide');
		}, 300);
		otvoreni_sifrarnici.pop()
		console.log(sifrarnik_id)

		jqxGridFokusKontrole("jqxgrid"+sifrarnik_id)

		$("#jqxgrid" + sifrarnik_id).jqxGrid('selectrow', sifrarnici_odabir[sifrarnik_naziv].boundindex);
		$("#jqxgrid" + sifrarnik_id).jqxGrid('ensurerowvisible', sifrarnici_odabir[sifrarnik_naziv].boundindex);

		try {
			window[sifrarnik_naziv + "_rowselect"]();
		} catch {}
	});
	// UREDIVANJE / NOVO - ZATVARANJE PROZORA - END

	// UREDIVANJE / NOVO - KLIK NA SPREMI - START
	$("#jqxgrid"+sifrarnik_id+"UredivanjeSave").click(function () {
		if ($('#jqxgrid'+sifrarnik_id+'popupUredivanjeForma').jqxValidator('validate') && provjeri_podatke_sifrarnika(sifrarnik_id)) {
			// UREDIVANJE / NOVO - UPISANI PODACI SA POPUP PROZORA
			let newrow = {}
			for(let i=0;i<sifrarnici_polja[sifrarnik_id].length;i++)
				newrow[sifrarnici_polja[sifrarnik_id][i]] = $("#jqxgrid" + sifrarnik_id + "UrediLxVParametarLxV" + sifrarnici_polja[sifrarnik_id][i]).val()

			// MOD DODAVANJA
			if (sifrarnici_mod_uredivanja_novo[sifrarnik_id]) {
				//NOVI ZAPIS U BAZU
				sifrarnici_mod_uredivanja_novo[sifrarnik_id] = false;
				let data_to_send = {}
				for(let i=0;i<sifrarnici_polja[sifrarnik_id].length;i++)
					data_to_send[sifrarnici_polja[sifrarnik_id][i]] = newrow[sifrarnici_polja[sifrarnik_id][i]]

				let parametar_dodatak = ""

				try {
					data_to_send = Object.assign(data_to_send, window[sifrarnik_naziv + "_AddDataToSend"]());
				} catch {}

				try {
					parametar_dodatak = window[sifrarnik_naziv+"_Posalji_Parametar_URL"]();
				} catch {}

				$.ajax({
					url: backend_url+"/"+sifrarnik_naziv.toLowerCase()+"/insert"+parametar_dodatak,
					type: "POST",
					data: data_to_send
				}).done(function (data) {
					if (data === '0')
						alert("Došlo je do greške!");
					else {
						$("#jqxgrid"+sifrarnik_id).jqxGrid('addrow', null, data);
						jqxGridFokusKontrole("jqxgrid" + sifrarnik_id);
					}
				});
			}
			else {
				// MOD UREĐIVANJA
				let data_to_send = {}
				for(let i=0;i<sifrarnici_polja[sifrarnik_id].length;i++)
					data_to_send[sifrarnici_polja[sifrarnik_id][i]] = newrow[sifrarnici_polja[sifrarnik_id][i]]

				data_to_send[sifrarnici_polja[sifrarnik_id][0]+"Old"] = oldrow[sifrarnici_polja[sifrarnik_id][0]]

				let parametar_dodatak = ""

				try {
					data_to_send = Object.assign(data_to_send, window[sifrarnik_naziv + "_AddDataToSend"]());
				} catch {}

				try {
					parametar_dodatak = window[sifrarnik_naziv+"_Posalji_Parametar_URL"]();
				} catch {}

				$.ajax({
					url: backend_url+"/"+sifrarnik_naziv.toLowerCase()+"/update"+parametar_dodatak,
					type: "POST",
					data: data_to_send
				}).done(function (data) {
					if (data === '0')
						alert("Došlo je do greške!");
					else {
						$('#jqxgrid' + sifrarnik_id).jqxGrid('updaterow', oldrow.uid, newrow);
					}
				});
			}
			$("#jqxgrid"+sifrarnik_id+"popupUredivanje").jqxWindow('hide');
		}
	});
	// UREDIVANJE / NOVO - KLIK NA SPREMI - END
	// UREDIVANJE / NOVO - END

	// DESNI KLIK - START
	let contextMenu = $("#jqxgrid"+sifrarnik_id+"popupMenu").jqxMenu({ width: 200, autoOpenPopup: false, mode: 'popup' });
	$("#jqxgrid"+sifrarnik_id).on('contextmenu', function() {
		return false;
	});

	$("#jqxgrid"+sifrarnik_id+"popupMenuUredi").jqxButton();
	$("#jqxgrid"+sifrarnik_id+"popupMenuObrisi").jqxButton();

	$("#jqxgrid"+sifrarnik_id+"popupMenuUredi").click(async function() {
		let selectedrowindex = $("#jqxgrid"+sifrarnik_id).jqxGrid('getselectedrowindex');
		contextMenu.jqxMenu('close');
		await prozorUredivanjeOtvori(selectedrowindex);
	});
	$("#jqxgrid"+sifrarnik_id+"popupMenuObrisi").click(function() {

		let selectedrowindex = $("#jqxgrid"+sifrarnik_id).jqxGrid('getselectedrowindex');
		contextMenu.jqxMenu('close');
		obrisiRed(selectedrowindex);
		window[sifrarnici_dinamicke_funkcije[sifrarnik_id]]();
	});

	$("#jqxgrid"+sifrarnik_id).on('rowclick', function (event) {
		if (event.args.rightclick) {
			$("#jqxgrid"+sifrarnik_id).jqxGrid('selectrow', event.args.rowindex);
			let scrollTop = $(window).scrollTop();
			let scrollLeft = $(window).scrollLeft();
			contextMenu.jqxMenu('open', parseInt(event.args.originalEvent.clientX) + 5 + scrollLeft, parseInt(event.args.originalEvent.clientY) + 5 + scrollTop);

			return false;
		}
	});
	// DESNI KLIK - END

	// DUPLI KLIK - START
	$("#jqxgrid"+sifrarnik_id).on('celldoubleclick', async function () {
		let selectedrowindex = $("#jqxgrid"+sifrarnik_id).jqxGrid('getselectedrowindex');

		if ($("#jqxgrid"+sifrarnik_id+"gumbOdaberi").css("display") == "none")
			await prozorUredivanjeOtvori(selectedrowindex);
		else {
			$("#jqxgrid" + sifrarnik_id + "gumbOdaberi").click()
		}
	});
	// DUPLI KLIK - END

	// GUMBOVI ISPOD GRIDA - START

	$("#jqxgrid"+sifrarnik_id+"gumbDodaj").jqxButton({ width: sirina_gumba, height: 20});
	$("#jqxgrid"+sifrarnik_id+"gumbUredi").jqxButton({ width: sirina_gumba, height: 20 });
	$("#jqxgrid"+sifrarnik_id+"gumbObrisi").jqxButton({ width: sirina_gumba, height: 20 });
	$("#jqxgrid"+sifrarnik_id+"gumbIspisi").jqxButton({ width: sirina_gumba, height: 20 });
	$("#jqxgrid"+sifrarnik_id+"gumbOdaberi").jqxButton({ width: sirina_gumba, height: 20 });


	if(sifrarnik_id !== "Donji") {
		$("#jqxgrid"+sifrarnik_id+"gumbDodaj").find("span").append(" (f1)")
		$("#jqxgrid"+sifrarnik_id+"gumbUredi").find("span").append(" (f2)")
		$("#jqxgrid"+sifrarnik_id+"gumbIspisi").find("span").append(" (f7)")
	} else {
		$("#jqxgrid"+sifrarnik_id+"gumbDodaj").find("span").append(" (f3)")
		$("#jqxgrid"+sifrarnik_id+"gumbUredi").find("span").append(" (f4)")
	}

	if(["Gornji", "Donji", "slave", "master"].includes(sifrarnik_id) || sifrarnici_id[0] == sifrarnik_id)
		$("#jqxgrid"+sifrarnik_id+"gumbOdaberi").css("display", "none")

	// DODAVANJE NOVOG REDKA
	$("#jqxgrid"+sifrarnik_id+"gumbDodaj").click(async function() {
		await prozorDodajOtvori();
	});

	// UREĐIVANJE REDKA
	$("#jqxgrid"+sifrarnik_id+"gumbUredi").click(async function() {
		let selectedrowindex = $("#jqxgrid"+sifrarnik_id).jqxGrid('getselectedrowindex');
		await prozorUredivanjeOtvori(selectedrowindex);
	});

	// BRISANJE REDKA
	$("#jqxgrid"+sifrarnik_id+"gumbObrisi").click(function() {
		let selectedrowindex = $("#jqxgrid"+sifrarnik_id).jqxGrid('getselectedrowindex');
		obrisiRed(selectedrowindex);
	});

	// PRINTANJE
	$("#jqxgrid"+sifrarnik_id+"gumbIspisi").click(function() {
		window[sifrarnik_naziv + "_ispis"](sifrarnici_odabir[sifrarnik_naziv]);
	});

	// ODABIR REDKA - START
	$("#jqxgrid"+sifrarnik_id+"gumbOdaberi").click(function () {
		sifrarnici_odabir[sifrarnik_naziv].odabir = true

		let window_container_id = document.getElementById(sifrarnik_id).parentNode.parentNode.parentNode.id
		$("#"+window_container_id).jqxWindow("close")

		let parent_sifrarnik = window_container_id.substring(6, window_container_id.indexOf("SifrarnikLxV"));

		$('#jqxgrid'+parent_sifrarnik+'UrediLxVParametarLxV'+sifrarnici_odabir[sifrarnik_naziv].polje_za_urediti).val(sifrarnici_odabir[sifrarnik_naziv][sifrarnici_odabir[sifrarnik_naziv].polje_za_dodati])

		let parent_sifrarnik_naziv = $("#"+parent_sifrarnik).attr("class")

		try {
			window["data_forward_to_other_input_"+parent_sifrarnik_naziv](parent_sifrarnik, sifrarnik_naziv);
		} catch {
		}

		let sve_labele = $('[id^="jqxgrid'+parent_sifrarnik+'UrediLxV'+sifrarnici_odabir[sifrarnik_naziv].polje_za_urediti+'LabelaLxV'+sifrarnici_odabir[sifrarnik_naziv].polje_za_dodati+'ParametarLxV"]');
		for(let i=0;i<sve_labele.length;i++) {
			$('#' + sve_labele[i].id).text(sifrarnici_odabir[sifrarnik_naziv][sve_labele[i].id.split('jqxgrid' + parent_sifrarnik + 'UrediLxV'+sifrarnici_odabir[sifrarnik_naziv].polje_za_urediti+'LabelaLxV'+sifrarnici_odabir[sifrarnik_naziv].polje_za_dodati+'ParametarLxV')[1]])
		}

		console.log("FOCUSED::::")
		console.log('#jqxgrid' + parent_sifrarnik + 'UrediLxVParametarLxV' + sifrarnici_odabir[sifrarnik_naziv].polje_za_urediti)
		$('#jqxgrid' + parent_sifrarnik + 'UrediLxVParametarLxV' + sifrarnici_odabir[sifrarnik_naziv].polje_za_urediti).jqxInput("focus");
		$('#jqxgrid' + parent_sifrarnik + 'UrediLxVParametarLxV' + sifrarnici_odabir[sifrarnik_naziv].polje_za_urediti).jqxInput("selectAll");
	});
	// ODABIR REDKA - END

	// ZATVARANJE SIFRARNIKA - START
	try {
		$('#'+document.getElementById(sifrarnik_id).parentNode.parentNode.parentNode.id).on('close', function (event) {
			sifrarnici_id.pop();
			otvoreni_sifrarnici.pop()

			let window_container_id = document.getElementById(sifrarnik_id).parentNode.parentNode.parentNode.id
			console.log(window_container_id)
			let parent_sifrarnik = window_container_id.substring(6, window_container_id.indexOf("SifrarnikLxV"));

			console.log('#jqxgrid' + window_container_id.substring(6, window_container_id.indexOf("SifrarnikLxV")) + 'UrediLxVParametarLxV' + sifrarnici_odabir[sifrarnik_naziv].polje_za_urediti)

			$('#jqxgrid' + parent_sifrarnik + 'UrediLxVParametarLxV' + sifrarnici_odabir[sifrarnik_naziv].polje_za_urediti).jqxInput("focus");
			$('#jqxgrid' + parent_sifrarnik + 'UrediLxVParametarLxV' + sifrarnici_odabir[sifrarnik_naziv].polje_za_urediti).jqxInput("selectAll");

			$("#jqxgrid"+sifrarnici_id[sifrarnici_id.length-1]).jqxGrid("updatebounddata");
		});
	} catch {}
	// ZATVARANJE SIFRARNIKA - END

	$("#jqxgrid"+sifrarnik_id+"Opcije").show();
	// GUMBOVI ISPOD GRIDA - END

	// BRISANJE PODATAKA - START
	function obrisiRed() {
		$('#jqxgrid'+sifrarnik_id+'PitanjeBrisanje').jqxWindow('open');
		$('#cancel').focus();
	}

	function PitanjeZaBrisanje() {
		try {
			$('#jqxgrid'+sifrarnik_id+'PitanjeBrisanje').jqxWindow("destroy");
		} catch {}

		$('#jqxgrid'+sifrarnik_id+'PitanjeBrisanje').jqxWindow({
			height: 100,
			width: 250,
			autoOpen: false,
			resizable: false,
			isModal: true,
			modalOpacity: 0.3,
			okButton: $('#jqxgrid'+sifrarnik_id+'PitanjeBrisanjeok'),
			cancelButton: $('#jqxgrid'+sifrarnik_id+'PitanjeBrisanjecancel'),
			initContent: function () {
				$('#jqxgrid'+sifrarnik_id+'PitanjeBrisanjeok').jqxButton();
				$('#jqxgrid'+sifrarnik_id+'PitanjeBrisanjecancel').jqxButton();
				$('#jqxgrid'+sifrarnik_id+'PitanjeBrisanjecancel').focus();
			}
		});
	}

	$('#jqxgrid'+sifrarnik_id+'PitanjeBrisanje').on('close', function (event) {
		if (event.args.dialogResult.OK) {
			let rowindex = $("#jqxgrid"+sifrarnik_id).jqxGrid('getselectedrowindex');
			let id = $("#jqxgrid"+sifrarnik_id).jqxGrid('getrowid', rowindex);

			let rowSelektirani = $("#jqxgrid"+sifrarnik_id).jqxGrid('getrowdata', rowindex);

			let data_to_send = {}
			data_to_send[sifrarnici_polja[sifrarnik_id][0]] = rowSelektirani[sifrarnici_polja[sifrarnik_id][0]]

			let parametar_dodatak = ""

			try {
				data_to_send = Object.assign(data_to_send, window[sifrarnik_naziv + "_AddDataToSend"]());
			} catch {}

			try {
				parametar_dodatak = window[sifrarnik_naziv+"_Posalji_Parametar_URL"]();
			} catch {}

			$.ajax({
				url: backend_url+"/"+sifrarnik_naziv.toLowerCase()+"/delete"+parametar_dodatak,
				type: "POST",
				data: data_to_send
			}).done(function (data) {
				if (data === '0')
					alert("Došlo je do greške!");
				else {
					$("#jqxgrid" + sifrarnik_id).jqxGrid('deleterow', id);
					if ($("#jqxgrid"+sifrarnik_id).jqxGrid('getdatainformation').rowscount > rowindex) {
						$("#jqxgrid"+sifrarnik_id).jqxGrid('selectrow', rowindex);
					}
					else {
						$("#jqxgrid"+sifrarnik_id).jqxGrid('selectrow', rowindex - 1);
					}
				}
			});

			try {
				$("#jqxgrid" + sifrarnik_id).jqxGrid("updatebounddata");
			} catch {}
			jqxGridFokusKontrole("jqxgrid" + sifrarnik_id);

		}
	});
	// BRISANJE PODATAKA - END

	// SELEKTIRANJE ZA ODABIR - START
	$("#jqxgrid"+sifrarnik_id).on('rowselect', async function (event) {
		let polje_za_urediti = undefined
		let polje_za_dodati = undefined

		try {
			polje_za_urediti = sifrarnici_odabir[sifrarnik_naziv].polje_za_urediti
			polje_za_dodati = sifrarnici_odabir[sifrarnik_naziv].polje_za_dodati
		} catch {
		}

		if(sifrarnici_odabir[sifrarnik_naziv] && event.args.row) {
			sifrarnici_odabir[sifrarnik_naziv] = event.args.row
			sifrarnici_odabir[sifrarnik_naziv]["odabir"] = false
			sifrarnici_odabir[sifrarnik_naziv]["polje_za_urediti"] = polje_za_urediti
			sifrarnici_odabir[sifrarnik_naziv]["polje_za_dodati"] = polje_za_dodati
		}

		try {
			window[sifrarnik_naziv + "_rowselect"]();
		} catch {}

		$('#jqxgrid'+sifrarnik_id+'Status').html((1 + parseInt($("#jqxgrid"+sifrarnik_id).jqxGrid("getrowvisibleindex", event.args.rowindex))) + "/" + DataAdapter[sifrarnik_naziv].records.length);
	});
	// SELEKTIRANJE ZA ODABIR - END



	//keyboard
	$('.NextNaEnter').on('keypress', function (e) {
		if (e.which === 13) {
			let vrsta_polja = $(".NextNaEnter").eq($(".NextNaEnter").index(e.delegateTarget) + 1);
			if (vrsta_polja.hasClass("jqx-combobox"))
				vrsta_polja.jqxComboBox('focus');
			else if (vrsta_polja.hasClass("jqx-datetimeinput"))
				vrsta_polja.jqxDateTimeInput('focus');
			else if (vrsta_polja.hasClass("jqx-checkbox"))
				vrsta_polja.jqxCheckBox('focus');
			else
				vrsta_polja.focus();

			vrsta_polja.select();
		}
	});

	/*    $("body").keydown(function(e) {
			if(e.keyCode === 114)
				e.preventDefault();
		});
	*/
	$("body").keydown(function(e){
		// f1 - 112
		// f2 - 113
		// f3 - 114
		// f4 - 115
		// ...
		// f12 - 123
		// / - 111
		// * - 106
		// - - 109
		// + - 107
		// enter - 13
		// ctrl - 17
		// alt gr - 17 + 1

		if(sifrarnik_id !== "Donji" && sifrarnici_id.includes(sifrarnik_id) && !otvoreni_sifrarnici.includes(sifrarnik_id)) {
			if(sifrarnik_id === "Gornji") {
				if(otvoreni_sifrarnici.includes("Donji"))
					return
				if (e.keyCode === 114) {
					e.preventDefault();
					$('#jqxgridDonji').jqxGrid('focus');
					$("#jqxgridDonjigumbDodaj").trigger("click")
				} else if (e.keyCode === 115) {
					e.preventDefault();
					$('#jqxgridDonji').jqxGrid('focus');
					$("#jqxgridDonjigumbUredi").trigger("click")
				}
			}

			if (e.keyCode === 112) {
				e.preventDefault();
				$('#jqxgrid'+ sifrarnik_id).jqxGrid('focus');
				$("#jqxgrid" + sifrarnik_id + "gumbDodaj").trigger("click")
			} else if (e.keyCode === 113) {
				e.preventDefault();
				$('#jqxgrid'+ sifrarnik_id).jqxGrid('focus');
				$("#jqxgrid" + sifrarnik_id + "gumbUredi").trigger("click")
			} else if (e.keyCode === 118) {
				e.preventDefault();
				$('#jqxgrid'+ sifrarnik_id).jqxGrid('focus');
				$("#jqxgrid" + sifrarnik_id + "gumbIspisi").trigger("click")
			} else if (e.keyCode === 119) {
				e.preventDefault();
				$('#jqxgrid'+ sifrarnik_id).jqxGrid('focus');
				$("#jqxgrid" + sifrarnik_id + "gumbIspisi").trigger("click")
			} else if (e.keyCode === 13 && $("#jqxgrid" + sifrarnik_id + "gumbOdaberi").css("display") !== "none") {
				$('#jqxgrid'+ sifrarnik_id).jqxGrid('focus');
				$("#jqxgrid" + sifrarnik_id + "gumbOdaberi").trigger("click")
			}
		}
	});

	PitanjeZaBrisanje();

	// AUTO START FUNKCIJE - START
	$("#"+sifrarnik_id).on("bindingcomplete", async function (event) {
		//$("#jqxgrid"+sifrarnik_id).jqxGrid('autoresizecolumns')

		if (data_binding[$("#"+sifrarnik_id).attr("class")] !== "completed") {
			await jqxGridFokusKontrole("jqxgrid" + sifrarnik_id);

			try {
				window[sifrarnik_naziv + "_funkcije"](sifrarnik_id);
			} catch {
			}

			data_binding[sifrarnik_naziv] = "completed"

			sakrij_loader()
		}
	})
	// AUTO START FUNKCIJE - END
}
// UČITAVANJE I KONFIGURACIJA ŠIFRARNIKA - END

// DODAVANJE ŠIFRARNIKA - START
async function sifrarnik_dodaj(sifrarnik_id, parent="body", naziv="") {
	let putanja = "../"+sifrarnik_id+"/grid.html"   // putanja do grida
	let baza = "ucitajBazu"+sifrarnik_id            // baza grida

	let sifrarnik_naziv = sifrarnik_id

	sifrarnik_id += sifrarnici_rbr
	sifrarnici_rbr += 1

	if(naziv !== "")
		sifrarnik_id = naziv
	sifrarnici_id.push(sifrarnik_id)

	data_binding[sifrarnik_naziv] = "uncompleted"
	//DataAdapter[sifrarnik_naziv] = {}


	// DODAVANJE ŠIFRARNIKA
	let sifDiv = document.createElement("div")
	sifDiv.className = sifrarnik_naziv
	sifDiv.id = sifrarnik_id

	// DODAVANJE ŠIFRARNIKA U ODREDENI HTML ELEMENT
	if(parent === "body")
		document.body.appendChild(sifDiv)
	else
		document.getElementById(parent).appendChild(sifDiv)

	// INCLUDANJE HTML-a
	const html_data = await $.get(putanja);
	$("#" + sifrarnik_id).html(html_data);

	// MJENJANJE ID-a ŠIFRARNIKA
	let trazeni_string = "SIFID";
	let string_za_promjeniti = sifrarnik_id;
	$("#"+sifrarnik_id).find('[id*="' + trazeni_string + '"]').each(function() {
		let novi_ID = $(this).attr("id").replace(trazeni_string, string_za_promjeniti);
		$(this).attr("id", novi_ID);
	});

	// DOBIVANJE POLJA ŠIFRARNIKA
	let polja_trenutnog_sifrarnika = []
	$("#"+sifrarnik_id).find('[id*="UrediLxVParametarLxV"]').each(function() {
		polja_trenutnog_sifrarnika.push($(this).attr("id").split("UrediLxVParametarLxV")[1]);
	});

	sifrarnici_polja[sifrarnik_id] = polja_trenutnog_sifrarnika
	sifrarnici_dinamicke_funkcije[sifrarnik_id] = baza
	if(!sifrarnici_odabir[sifrarnik_naziv])
		sifrarnici_odabir[sifrarnik_naziv] = {}

	await load_sifrarnik(sifrarnik_id, sifrarnik_naziv) // UČITAVANJE ŠIFRARNIKA
}
// DODAVANJE ŠIFRARNIKA - END

// DODAVANJE ŠIFRARNIKA U PROZORU - START
async function sifrarnik_prozor_dodaj(naziv_podsifrarnika) {
	let sifrarnik_id = otvoreni_sifrarnici[otvoreni_sifrarnici.length-1]
	let podsifrarnik = document.createElement("div")
	podsifrarnik.id = "Prozor"+sifrarnik_id+"SifrarnikLxV"+naziv_podsifrarnika+sifrarnici_rbr

	let  podsifrarnik_id = podsifrarnik.id
	podsifrarnik.innerHTML = "<div id='"+podsifrarnik_id+"Header'>Šifrarnik</div><div style='overflow: hidden' id='"+podsifrarnik_id+"Content'></div>"

	document.getElementById(sifrarnik_id).appendChild(podsifrarnik)

	$('#'+podsifrarnik_id+"Content").empty()

	$('#'+podsifrarnik_id).jqxWindow({
		height: 550,
		width: $("#"+sifrarnik_id).parent().outerWidth()-20,
		autoOpen: true,
		resizable: true,
		isModal: true,
		modalOpacity: 0.1,
	});

	let parent_sifrarnik = $(event.target["parentNode"]["parentNode"]).find(".LimexSifrarnik")[0];
	let polje_za_dodati = parent_sifrarnik.id.split("UrediLxVSifrarnikLxV")[1].split("Promijeni")[0]
	let polje_za_urediti = parent_sifrarnik.id.split("UrediLxVSifrarnikLxV")[1].split("Promijeni")[1]


	sifrarnici_odabir[naziv_podsifrarnika] = {}
	sifrarnici_odabir[naziv_podsifrarnika].polje_za_urediti = polje_za_urediti
	sifrarnici_odabir[naziv_podsifrarnika].polje_za_dodati = polje_za_dodati

	$("#"+podsifrarnik_id).show()
	await sifrarnik_dodaj(naziv_podsifrarnika,podsifrarnik_id+"Content")
	otvoreni_sifrarnici.push(podsifrarnik_id)
}

// DODAVANJE ŠIFRARNIKA U PROZORU - END

function tooltiprenderer (element) {
	$(element).jqxTooltip({
		position: 'mouse',
		content: $(element).text()
	});
}

function jqxGridPozicioniranjeNaPocetak(idGrida) {
	let visiblerows = $("#" + idGrida).jqxGrid('getloadedrows');

	if(visiblerows.length > 0) {
		$("#" + idGrida).jqxGrid('selectrow', visiblerows[0].boundindex);
		$("#" + idGrida).jqxGrid('ensurerowvisible', visiblerows[0].boundindex);
	}
}

async function jqxGridPozicioniranjeNaKraj(idGrida) {
	let visiblerows = $("#" + idGrida).jqxGrid('getloadedrows');

	if(visiblerows.length > 0) {
		$("#" + idGrida).jqxGrid('selectrow', visiblerows[visiblerows.length - 1].boundindex);
		$("#" + idGrida).jqxGrid('ensurerowvisible', visiblerows[visiblerows.length - 1].boundindex);
	}
}

function jqxGridPozicionirajNaSlijedece(idGrida) {
	let selectedrowindex = $("#" + idGrida).jqxGrid('getselectedrowindex');
	let visiblerows = $("#" + idGrida).jqxGrid('getloadedrows');
	let sortinformation = $("#" + idGrida).jqxGrid('getsortinformation');

	for (let i = 0; i < visiblerows.length; i++) {
		if (visiblerows[i].boundindex === selectedrowindex) {
			if (sortinformation.sortcolumn === null) {
				if (i < visiblerows.length - 1) {
					$("#" + idGrida).jqxGrid('selectrow', visiblerows[i + 1].boundindex);
					$("#" + idGrida).jqxGrid('ensurerowvisible', visiblerows[i + 1].boundindex);
				}
			} else if (sortinformation.sortcolumns[0].ascending) {
				if (i < visiblerows.length - 1) {
					$("#" + idGrida).jqxGrid('selectrow', visiblerows[i + 1].boundindex);
					$("#" + idGrida).jqxGrid('ensurerowvisible', visiblerows[i + 1].boundindex);
				}
			} else{
				if (i > 0) {
					$("#" + idGrida).jqxGrid('selectrow', visiblerows[i - 1].boundindex);
					$("#" + idGrida).jqxGrid('ensurerowvisible', visiblerows[i - 1].boundindex);
				}
			}
			break;
		}
	}
}

function jqxGridPozicionirajNaPrethodno(idGrida) {
	let selectedrowindex = $("#" + idGrida).jqxGrid('getselectedrowindex');
	let visiblerows = $("#" + idGrida).jqxGrid('getloadedrows');
	let sortinformation = $("#" + idGrida).jqxGrid('getsortinformation');

	for (let i = 0; i < visiblerows.length; i++) {
		if (visiblerows[i].boundindex === selectedrowindex) {
			if (sortinformation.sortcolumn === null) {
				if (i > 0) {
					$("#" + idGrida).jqxGrid('selectrow', visiblerows[i - 1].boundindex);
					$("#" + idGrida).jqxGrid('ensurerowvisible', visiblerows[i - 1].boundindex);
				}
			} else if (sortinformation.sortcolumns[0].ascending) {
				if (i > 0) {
					$("#" + idGrida).jqxGrid('selectrow', visiblerows[i - 1].boundindex);
					$("#" + idGrida).jqxGrid('ensurerowvisible', visiblerows[i - 1].boundindex);
				}
			} else{
				if (i < visiblerows.length - 1) {
					$("#" + idGrida).jqxGrid('selectrow', visiblerows[i + 1].boundindex);
					$("#" + idGrida).jqxGrid('ensurerowvisible', visiblerows[i + 1].boundindex);
				}
			}
			break;
		}
	}
}

function jqxGridPozicioniranjePremaVrijednosti(idGrida, podatak, vrijednost) {
	let rows = $("#" + idGrida).jqxGrid('getrows');
	let rowsCount = rows.length;

	for (let i = 0; i < rowsCount; i++) {
		let trenutnired = $("#" + idGrida).jqxGrid('getrowdata', i);
		if ($("#" + idGrida).jqxGrid('getcelltext', trenutnired, podatak) === vrijednost) {
			$("#" + idGrida).jqxGrid('selectrow', i);
			let selectedrowindex = $("#" + idGrida).jqxGrid("getselectedrowindex");
			let selectedrow = $("#" + idGrida).jqxGrid("getrowvisibleindex", selectedrowindex);
			$("#" + idGrida).jqxGrid("ensurerowvisible", selectedrow);
			break
		}
	}
}

function fokus_na_prvi_input(sifrarnik_id) {
	for(let i=0;i<sifrarnici_polja[sifrarnik_id].length;i++) {
		if($('#jqxgrid' + sifrarnik_id + 'UrediLxVParametarLxV' + sifrarnici_polja[sifrarnik_id][i]).parent().parent().css("display") !== "none") {
			$('#jqxgrid' + sifrarnik_id + 'UrediLxVParametarLxV' + sifrarnici_polja[sifrarnik_id][i]).jqxInput("focus");
			$('#jqxgrid' + sifrarnik_id + 'UrediLxVParametarLxV' + sifrarnici_polja[sifrarnik_id][i]).jqxInput("selectAll");
			return
		}
	}
}

async function jqxGridFokusKontrole(idGrida) {
	try {
		if (idGrida !== "jqxgridDonji")
			$('#' + idGrida).jqxGrid('focus');
		else
			$('#jqxgridGornji').jqxGrid('focus');
	} catch {}

	if ((jqxGridArray[idGrida + "_Vrijednost"] !== "") && (jqxGridArray[idGrida + "_Vrijednost"] !== undefined)) {
		jqxGridPozicioniranjePremaVrijednosti(idGrida, jqxGridArray[idGrida + "_Podatak"], jqxGridArray[idGrida + "_Vrijednost"]);
	} else {
		if(idGrida === "jqxgridDonji")
			await jqxGridPozicioniranjeNaPocetak(idGrida);
		else
			await jqxGridPozicioniranjeNaKraj(idGrida);
	}
}

