var mymap = L.map('map').setView([46.6031, 1.8883], 6);

var tabname = new Set();
var tabCodeUIC = new Set();
var latLongGare = [];

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

                tabname.add(gare.alias_libelle_noncontraint);
                tabCodeUIC.add(gare.uic_code);
                latLongGare.push(gare.wgs_84);
                markers.addLayer(L.marker([gare.wgs_84.lat, gare.wgs_84.lon]).bindPopup(gare.alias_libelle_noncontraint));


            }

            mymap.addLayer(markers);
        }).catch(error => {
                console.error('Erreur lors de la récupération du fichier JSON:');
            });
    });

markers.options.iconCreateFunction = function(cluster) {
    return L.divIcon({
        html: '<div style="background-color: #bc98f3; color: black; border-radius: 50%; width: 30px; height: 30px; text-align: center; line-height: 30px;">' + cluster.getChildCount() + '</div>',
        className: 'custom-cluster-icon'
    });
};


function createMarkeur(tab) {
    tab.forEach(coordonnees => {
        const latitude = coordonnees.lat;
        const longitude = coordonnees.lon;
        L.marker([latitude, longitude]).addTo(mymap)
            .bindPopup('CC')
            .openPopup();
    });}

const selectElementRegion = document.getElementById("region");

const selectElement = document.querySelector(".select_r");

selectElement.addEventListener("change", (event) => {
    console.log(`You like ${event.target.value}`);
});


/**
 * function marquer() {
 *     fetch('referentiel-gares-voyageurs.json')
 *         .then(response => response.json())
 *         .then(data => {
 *             data.forEach(gare => {
 *                 if(gare.wgs_84 &&
 *                     typeof gare.wgs_84.lat === 'number' &&
 *                     typeof gare.wgs_84.lon === 'number' &&
 *                     gare.dtfinval === null)
 *                 {
 *                     var latit = gare.wgs_84.lat;
 *                     var longit = gare.wgs_84.lon;
 *
 *                     L.marker([latit, longit]).addTo(mymap).bindPopup(gare.alias_libelle_noncontraint);// Ajoutez un marqueur avec une info-bulle
 *                 } else {
 *                     //geocodeGare(gare)
 *                     console.log('Gare non ajoutée à la carte ou autres actions à effectuer :', gare);
 *                 }
 *             });
 *         })
 *         .catch(error => console.error('Error fetching JSON:', error));
 * }
 *
 *
 *
 * $(document).ready(function() {
 *     marquer();
 * });
 */


