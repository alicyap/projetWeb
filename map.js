var mymap = L.map('map').setView([0.9,-3.0], 1.5); //carte européano-centrée (France)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

/*L.marker([51.5, -0.09]).addTo(mymap)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup(); créé des marqueurs*/

// Fonction pour créer un marqueur avec une requête AJAX
function marquer() {
  $.getJSON('zones-touristiques-internationales.json', function (data) {
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
});

