var mymap = L.map('map').setView([46.6031, 1.8883], 6);

var tabname = []
var tabCodeUIC = new Set();
var latLongGare = [];
let tabCodeInteret = [];

var markers = L.markerClusterGroup();


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);


$( "#interet" ).selectmenu(
    {width: 250,
  icons: { button: "ui-icon-caret-1-s" }});

$( "#region" ).selectmenu(
    {width: 250,
        icons: { button: "ui-icon-caret-1-s" }})
    .selectmenu( "menuWidget" )
    .addClass( "overflow" )

$( function() {
    var availableTags = [
        "Ain",
        "Aisne",
        "Allier",
        "Alpes-de-Haute-Provence",
        "Hautes-Alpes",
        "Alpes-Maritimes",
        "Ardèche",
        "Ardennes",
        "Ariège",
        "Aube",
        "Aude",
        "Aveyron",
        "Bouches-du-Rhône",
        "Calvados",
        "Cantal",
        "Charente",
        "Charente-Maritime",
        "Cher",
        "Corrèze",
        "Côte-d'Or",
        "Côtes-d'Armor",
        "Creuse",
        "Dordogne",
        "Doubs",
        "Drôme",
        "Eure",
        "Eure-et-Loir",
        "Finistère",
        "Gard",
        "Haute-Garonne",
        "Gers",
        "Gironde",
        "Hérault",
        "Ille-et-Vilaine",
        "Indre",
        "Indre-et-Loire",
        "Isère",
        "Jura",
        "Landes",
        "Loir-et-Cher",
        "Loire",
        "Haute-Loire",
        "Loire-Atlantique",
        "Loiret",
        "Lot",
        "Lot-et-Garonne",
        "Lozère",
        "Maine-et-Loire",
        "Manche",
        "Marne",
        "Haute-Marne",
        "Mayenne",
        "Meurthe-et-Moselle",
        "Meuse",
        "Morbihan",
        "Moselle",
        "Nièvre",
        "Nord",
        "Oise",
        "Orne",
        "Pas-de-Calais",
        "Puy-de-Dôme",

    ];
    $("#tags").autocomplete({
        source: availableTags
    });
});
$( function() {
    $( "#tabs" ).tabs();
} );


fetch('referentiel-gares-voyageurs.json')
    .then(response => response.json())
    .then(data => {

        data.forEach(gare => {
            if (gare.wgs_84 &&
                typeof gare.wgs_84.lat === 'number' &&
                typeof gare.wgs_84.lon === 'number' &&
                gare.dtfinval === null) {

                tabname.push(gare.alias_libelle_noncontraint);
                tabCodeUIC.add(gare.uic_code);
                latLongGare.push(gare.wgs_84);
                tabCodeInteret.push(gare.segmentdrg_libelle);


                markers.addLayer(L.marker([gare.wgs_84.lat, gare.wgs_84.lon]).bindPopup(gare.alias_libelle_noncontraint));
            }
        });


    }).catch(error => {
    console.error('Erreur lors de la récupération du fichier JSON:');
    });

mymap.addLayer(markers);
markers.options.iconCreateFunction = function(cluster) {
    return L.divIcon({
        html: '<div style="background-color: #bc98f3; color: black; border-radius: 50%; width: 30px; height: 30px; text-align: center; line-height: 30px;">' + cluster.getChildCount() + '</div>',
        className: 'custom-cluster-icon'
    });
};



$( ".select_i" ).on( "selectmenuchange",function(event, ui) {
    console.log(ui.item.value);
    if (ui.item.value === 'tout'){
        markers.options.iconCreateFunction = function(cluster) {
            return L.divIcon({
                html: '<div style="background-color: #bc98f3; color: black; border-radius: 50%; width: 30px; height: 30px; text-align: center; line-height: 30px;">' + cluster.getChildCount() + '</div>',
                className: 'custom-cluster-icon'
            });
        };
        markers.clearLayers();
        latLongGare.forEach((gare, index) => {
            console.log(tabname[index]);
            markers.addLayer(L.marker([gare.lat, gare.lon]).bindPopup(tabname[index]));
        });
        mymap.addLayer(markers);
    } else if (ui.item.value === 'GareA'){
        markers.options.iconCreateFunction = function(cluster) {
            return L.divIcon({
                html: '<div style="background-color: #ff8097; color: black; border-radius: 50%; width: 30px; height: 30px; text-align: center; line-height: 30px;">' + cluster.getChildCount() + '</div>',
                className: 'custom-cluster-icon'
            });
        };
        markers.clearLayers();
        latLongGare.forEach((gare, index) => {
            if (tabCodeInteret[index] === 'a'){
            markers.addLayer(L.marker([gare.lat, gare.lon]).bindPopup(tabname[index]));
            console.log(tabname[index])
            }
        });
        mymap.addLayer(markers);


    }else if (ui.item.value === 'GareB'){
        markers.options.iconCreateFunction = function(cluster) {
            return L.divIcon({
                html: '<div style="background-color: #95b8f6; color: black; border-radius: 50%; width: 30px; height: 30px; text-align: center; line-height: 30px;">' + cluster.getChildCount() + '</div>',
                className: 'custom-cluster-icon'
            });
        };

        markers.clearLayers();
        latLongGare.forEach((gare, index) => {
            if (tabCodeInteret[index] === 'b'){
                markers.addLayer(L.marker([gare.lat, gare.lon]).bindPopup(tabname[index]));
            }
        });
        mymap.addLayer(markers);


    }else {
        markers.options.iconCreateFunction = function(cluster) {
            return L.divIcon({
                html: '<div style="background-color: #4e825d ; color: black; border-radius: 50%; width: 30px; height: 30px; text-align: center; line-height: 30px;">' + cluster.getChildCount() + '</div>',
                className: 'custom-cluster-icon'
            });
        };
        markers.clearLayers();
        latLongGare.forEach((gare, index) => {
            if (tabCodeInteret[index] === 'c'){
                markers.addLayer(L.marker([gare.lat, gare.lon]).bindPopup(tabname[index]));
            }
        });
        mymap.addLayer(markers);


    }
    mymap = L.map('map').setView([46.6031, 1.8883], 6);
});




$( ".select_r" ).on( "selectmenuchange",function(event, ui) {


    if (ui.item.value === 'Occi') {
        mymap.setView([43.5912, 1.4381], 7.5);
    }

    else if (ui.item.value === 'Auver') {
        mymap.setView([45.6039, 5.3294], 7.5);
    }
    else if (ui.item.value === 'Bret') {
        mymap.setView([48.2020, -2.9326], 7.5);
    }
    else if (ui.item.value === 'Bour') {
        mymap.setView([47.3216, 5.0415], 7.5);
    }
    else if (ui.item.value === 'Cent') {
        mymap.setView([47.7516, 1.6754], 7.5);
    }
    else if (ui.item.value === 'Est') {
        mymap.setView([48.5734, 7.6521], 7.5);
    }
    else if (ui.item.value === 'Haut') {
        mymap.setView([50.6292, 3.0573], 7.5);
    }
    else if (ui.item.value === 'IDF') {
        mymap.setView([48.8566, 2.3522], 8.5);
    }
    else if (ui.item.value === 'Norm') {
        mymap.setView([49.4579, 0.2415], 7.5);
    }
    else if (ui.item.value === 'Aqui') {
        mymap.setView([44.7904, -0.6052], 7.5);
    }
    else if (ui.item.value === 'Pays') {
        mymap.setView([47.4808, -0.5306], 8);
    }
    else if (ui.item.value === 'Prov') {
        mymap.setView([43.9354, 6.0676], 8);
    }});


$( "#tags" ).on( "autocompletechange", function( event, ui ) {


    const departementsCoordonnees = {
        "Ain": [46.2022, 5.2360],
        "Aisne": [49.5533, 3.3315],
        "Allier": [46.2436, 3.3785],
        "Alpes-Maritimes": [43.9383, 7.5000],
        "Ardèche": [44.6764, 4.5852],
        "Ardennes": [49.6116, 4.7159],
        "Ariège": [42.9453, 1.6016],
        "Aube": [48.3333, 4.0833],
        "Aude": [43.2159, 2.3515],
        "Aveyron": [44.3500, 2.5667],
        "Bouches-du-Rhône": [43.2964, 5.3700],
        "Calvados": [49.1833, -0.3500],
        "Cantal": [45.0833, 2.7833],
        "Charente": [45.6833, 0.1667],
        "Charente-Maritime": [45.8333, -0.9167],
        "Cher": [47.0833, 2.4333],
        "Corrèze": [45.4167, 1.8333],
        "Côte-d'Or": [47.3167, 5.0167],
        "Côtes-d'Armor": [48.5167, -2.7833],
        "Creuse": [46.1667, 1.8833],
        "Dordogne": [45.0833, 0.1667],
        "Doubs": [47.2500, 6.0167],
        "Drôme": [44.9333, 4.9000],
        "Eure": [49.0000, 1.1667],
        "Eure-et-Loir": [48.5000, 1.5000],
        "Finistère": [48.0000, -4.0000],
        "Gard": [43.9167, 4.3667],

        "Haute-Garonne": [43.6000, 1.4333],
        "Gers": [43.7500, 0.5833],
        "Gironde": [44.8333, -0.5833],
        "Hérault": [43.6667, 3.5000],
        "Ille-et-Vilaine": [48.0833, -1.6833],
        "Indre": [46.8333, 1.2500],
        "Indre-et-Loire": [47.2500, 0.7000],

        "Isère": [45.1667, 5.8333],
        "Jura": [46.8333, 5.7500],
        "Landes": [43.9167, -0.7500],
        "Loir-et-Cher": [47.5000, 1.1667],
        "Loire": [45.7500, 4.5000],
        "Haute-Loire": [45.1667, 4.0000],
        "Loire-Atlantique": [47.3333, -1.5833],
        "Loiret": [47.9167, 2.0000],
        "Lot": [44.5000, 1.5000],
        "Lot-et-Garonne": [44.3333, 0.5000],
        "Lozère": [44.4167, 3.5000],
        "Maine-et-Loire": [47.5000, -0.5000],
        "Manche": [49.0833, -1.3333],
        "Marne": [49.0000, 4.0000],
        "Haute-Marne": [48.0000, 5.5000],
        "Mayenne": [48.3333, -0.7500],
        "Meurthe-et-Moselle": [48.5833, 6.5000],
        "Meuse": [49.1667, 5.5000],
        "Morbihan": [47.8333, -2.7500],
        "Moselle": [49.1667, 6.1667],
        "Nièvre": [47.0000, 3.5000],
        "Nord": [50.5000, 3.1667],
        "Oise": [49.5000, 2.5000],
        "Orne": [48.5833, -0.1667],
        "Pas-de-Calais": [50.5000, 2.5000],
        "Puy-de-Dôme": [45.7500, 3.0000],
        "Pyrénées-Atlantiques": [43.2500, -0.5000],
        "Hautes-Pyrénées": [43.1667, 0.1667],
        "Pyrénées-Orientales": [42.5000, 2.5000],
        "Bas-Rhin": [48.5833, 7.5000],
        "Haut-Rhin": [47.7500, 7.3333],
        "Rhône": [45.7500, 4.8333],
        "Haute-Saône": [47.5833, 6.2500],
        "Saône-et-Loire": [46.7500, 4.5000],
        "Sarthe": [48.0000, 0.1667],
        "Savoie": [45.5000, 6.0000],
        "Haute-Savoie": [46.0000, 6.5000],
        "Paris": [48.8566, 2.3522],
        "Seine-Maritime": [49.5000, 0.7500],
        "Seine-et-Marne": [48.5000, 3.0000],
        "Yvelines": [48.7500, 1.8333],
        "Deux-Sèvres": [46.3333, -0.3333],
        "Somme": [49.9167, 2.2500],
        "Tarn": [43.8333, 2.1667],
        "Tarn-et-Garonne": [44.0000, 1.2500],
        "Var": [43.5000, 6.2500],
        "Vaucluse": [44.1667, 5.1667],
        "Vendée": [46.6667, -1.5000],
        "Vienne": [46.5833, 0.3333],
        "Haute-Vienne": [45.8333, 1.2500],
        "Vosges": [48.3333, 6.5000],
        "Yonne": [47.7500, 3.5000],
        "Territoire de Belfort": [47.5000, 6.8333],
        "Essonne": [48.5000, 2.2500],
        "Hauts-de-Seine": [48.8333, 2.2500],
        "Seine-Saint-Denis": [48.9167, 2.5833],
        "Val-de-Marne": [48.7500, 2.3333],
        "Val-d'Oise": [49.0833, 2.1667]
    };
    const selectedDepartement = ui.item.value;


    const coordinates = departementsCoordonnees[selectedDepartement];
    mymap.setView(coordinates, 8.5);

} );





