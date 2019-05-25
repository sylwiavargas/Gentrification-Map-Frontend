const maxI = 200, rad = 21, opac = .6;
var map, heatmap;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 40.759917, lng: -73.897947},
    mapTypeId: 'roadmap'
  });

  const button = document.getElementById("noise")
  button.addEventListener('click', addHeatMap);
}

  button.addEventListener('click', () => {
    if (event.target.innerText === "Noise Complaints: OFF") {
      fetch('static/more_zips.json')
      .then(res => res.json())
      .then(result => {
        let locations = result.map((val) => {
          return new google.maps.LatLng(val.Latitude, val.Longitude);
        })
        heatmap = new google.maps.visualization.HeatmapLayer({
          data: locations,
          map: map,
          maxIntensity: maxI,
          radius: rad,
          opacity: opac
        })
      })
      button.innerText = "Noise Complaints: ON"
    } else if (event.target.innerText === "Noise Complaints: ON") {
      heatmap = heatmap.setMap(null)
      button.innerText = "Noise Complaints: OFF"
    }
  });
}

// For citi bikes
// fetch('static/citi_bikes2014.json')
// .then(res => res.json())
// .then(result => {
//   let locations = result.stationBeanList.map((val) => {
//     return new google.maps.LatLng(val.latitude, val.longitude);
//   })
//   heatmap = new google.maps.visualization.HeatmapLayer({
//     data: locations,
//     map: map,
//     maxIntensity: maxI,
//     radius: rad,
//     opacity: opac
//   })
// })


// Function to change the radius of data points on heatmap
function changeRadius(bool) {
  const step = 3, min = 0, max = 50;
  let current = heatmap.get('radius');
  let newValue = toggleUpDown(bool, current, step, min, max);

  heatmap.set('radius', newValue);
  document.getElementById("radiusNum").innerText = newValue;
};

// Function to change the opacity of the heatmap
function changeOpacity(bool) {
  const step = .2, min = 0, max = 1;
  let current = heatmap.get('opacity');
  let newValue = toggleUpDown(bool, current, step, min, max);
  let rounded = round(newValue, 1);

  heatmap.set('opacity', rounded);
  document.getElementById("opacityNum").innerText = rounded;
}

// Function to change maxIntensity of the heatmap
function changeIntensity(bool) {
  const step = 25, min = 0, max = 1000;
  let current = heatmap.get('maxIntensity');
  let newValue = toggleUpDown(bool, current, step, min, max);

  heatmap.set('maxIntensity', newValue);
  document.getElementById("intensityNum").innerText = newValue;
};

// Changes our toggle values and keeps them within our min/max values
function toggleUpDown(bool, current, step, min, max){
  if (bool && current >= max) return current;
  if (!bool && current <= min) return current;

  if (bool) return current + step;
  return current - step;
}

// Used to round the opacity toggle to one decimal place
function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}
