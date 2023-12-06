var mymap = L.map('map').setView([46.6031, 1.8883], 6);

var tabname = new Set();
var tabCodeUIC = new Set();
var latLongGare = [];


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);


$( "#interet" ).selectmenu(
    {width: 250,
  icons: { button: "ui-icon-caret-1-s" }});

//récupère dans le json les noms des villes dans lesquelles sont nos gares
fetch('referentiel-gares-voyageurs.json')
    .then(response => response.json())
    .then(data => {

    data.forEach(objet => {
        const nomGare = objet.alias_libelle_noncontraint;
        const codeUIC = objet.uic_code;
        const longLat = objet.wgs_84;



        if (!tabname.has(nomGare)) {
            tabname.add(nomGare);
            tabCodeUIC.add(codeUIC);
            latLongGare.push(longLat);

        }
        console.log(latLongGare);
    });

        createMarkeur(latLongGare);
})
    .catch(error => {
        console.error('Erreur lors de la récupération du fichier JSON:', error);
    });

function createMarkeur(tab) {
    tab.forEach(coordonnees => {
        const latitude = coordonnees.lat;
        const longitude = coordonnees.lon;
        L.marker([latitude, longitude]).addTo(mymap)
            .bindPopup('CC')
            .openPopup();
    });
}



/*document.addEventListener("DOMContentLoaded", function() {

    console.log(latGare);

    // Appelez la fonction createMarkeur avec vos ensembles de latitude et de longitude
    createMarkeur(latGare, longGare);
});





/*L.marker([51.5, -0.09]).addTo(mymap)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup(); créé des marqueurs*/

// Fonction pour créer un marqueur avec une requête AJAX
/*function marquer() {
  $.getJSON('horaires-des-gares.json', function (data) {
    // Affiche les données dans la console
    console.log(data);

    $.each(data, function (index, item) {
      console.log(item.fields.geo_point_2d); // Est censé afficher la liste de coordonnées
      var marker = L.marker(item.fields.geo_point_2d)
          .bindPopup(index.name)
          .addTo(mymap);
    });
  })
      .fail(function(error) {
        console.error('Erreur lors du chargement du fichier JSON:', error);
      });
}

$(document).ready(function() {
  marquer();
});*/

