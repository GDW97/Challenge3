// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2R3OTciLCJhIjoiY2wxMmZscjVzMDF3aDNkbWsyNWY3aXJubSJ9.7-Z5n-dyUKMqGxtWqBFVrQ';

// api token for openWeatherMap
var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherMapUrlApiKey = '3a16f6f39075e5ed3362987cb0d71186';

// Initialate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/gdw97/cl1l36xg600ol14o33krhpke0',
  center: [5.508852, 52.142480],
  zoom: 7,
});

// Navigatie systeem
map.addControl(
  new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  }),
  'top-right'
);

/// Steden voor het weer
var cities = [
  {
    name: 'Amsterdam',
    coordinates: [4.895168, 52.370216]
  },
  {
    name: 'Zoetermeer',
    coordinates: [4.494025, 52.060669]
  },
  {
    name: 'Zwolle',
    coordinates: [6.0830219, 52.5167747]
  },
  {
    name: 'Nijmegen',
    coordinates: [5.8372264, 51.8125626]
  },
  {
    name: 'Groningen',
    coordinates: [6.56667, 53.21917]
  },
  {
    name: 'Enschede',
    coordinates: [6.89583, 52.21833]
  },
];


// het weer
map.on('load', function () {
  cities.forEach(function(city) {
    var request = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey + '&lon=' + city.coordinates[0] + '&lat=' + city.coordinates[1];

    // Get current weather based on cities' coordinates
    fetch(request)
      .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(function(response) {
        plotImageOnMap(response.weather[0].icon, city)
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      });
  });
});

function plotImageOnMap(icon, city) {
  map.loadImage(
    'http://openweathermap.org/img/w/' + icon + '.png',
    function (error, image) {
      if (error) throw error;
      map.addImage("weatherIcon_" + city.name, image);
      map.addSource("point_" + city.name, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: city.coordinates
            }
          }]
        }
      });
      map.addLayer({
        id: "points_" + city.name,
        type: "symbol",
        source: "point_" + city.name,
        layout: {
          "icon-image": "weatherIcon_" + city.name,
          "icon-size": 1.3
        }
      });
    }
  );
}

var marker1 = new mapboxgl.Marker({ color: 'red' })
.setLngLat([4.2420775, 52.0429909])
.addTo(map);

var marker2 = new mapboxgl.Marker({ color: 'red' })
.setLngLat([4.3624455, 52.0266492])
.addTo(map);

var marker3 = new mapboxgl.Marker({ color: 'red' })
.setLngLat([4.4851447, 52.1628687])
.addTo(map);

var marker4 = new mapboxgl.Marker({ color: 'red' })
.setLngLat([4.4796928, 51.9216027])
.addTo(map);

var marker5 = new mapboxgl.Marker({ color: 'red' })
.setLngLat([4.6828297, 52.0197741])
.addTo(map);

var marker6 = new mapboxgl.Marker({ color: 'purple' })
.setLngLat([4.494025, 52.060669])
.addTo(map);
