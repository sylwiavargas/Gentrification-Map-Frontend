const maxI = 10, rad = 10, opac = .6;
let map, bikeHeatMap, shop2010Heatmap;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 40.759917, lng: -73.897947},
    mapTypeId: 'roadmap'
  });
}

const shopsButton = document.getElementById("shops")
shopsButton.addEventListener('click', addShopYearButtons)

function addShopYearButtons(event) {
  const shops2010 = document.getElementById("shops-2010")
  shops2010.addEventListener('click', addShop2010Heatmap);
  const shops2018 = document.getElementById("shops-2018")
  shops2018.addEventListener('click', addShop2018Heatmap);

  if (event.target.innerText === "Pawn/Coffee Shops: OFF") {
    shopsButton.innerText = "Pawn/Coffee Shops: ON"
    shops2010.style.display = "inline-block"
    shops2018.style.display = "inline-block"
  } else if (event.target.innerText === "Pawn/Coffee Shops: ON") {
    shopsButton.innerText = "Pawn/Coffee Shops: OFF"
    shops2010.style.display = "none"
    shops2018.style.display = "none"
  }
}

-----------------------------------
let seeComments = false;

animalp.addEventListener('click', () => {
      if (!document.querySelector(`div[data-id="${animal.id}"]`) || seeComments == false){
        toggleShow(animal);
        animalInfo.style.display = 'block';
        seeAnimal = true
      } else {
        animalInfo.style.display = 'none';
        seeAnimal = false
      }
    })
    const delAnimal = animals.querySelector(`#delete-button-${animal.id}`)
    delAnimal.addEventListener('click', () => {deleteAnimal(animal) })
  }

  function toggleShow(animal) {
    const animald = document.createElement('div');
    animald.dataset.id = animal.id
    animalInfo.innerHTML = ""

    animald.innerHTML = `<h3>${animal.name} the ${animal.species}</h3>
    <p> Ferociousness: ${animal.ferociousness} </p>
    <p> Hobby: ${animal.hobby} </p>
    <img src = "${animal.image}">`

    const buttonU = document.createElement('update-button')
    buttonU.innerHTML = `<button id="update-button-${animal.id}">UPDATE</button>`
    animalInfo.appendChild(animald)
    animalInfo.appendChild(buttonU)
    // let {name, species, ferociousness, hobby, image} = animal

  const btnEdit = document.querySelector(`#update-button-${animal.id}`)

  btnEdit.addEventListener('click', () => {editAnimal(animal)})}

---------------------------------------

function addShop2010Heatmap(event) {
  if (event.target.innerText === "2010" && event.target.parentNode.id === "shop-buttons") {
    fetch('static/pawn_coffee2010.json')
    .then(res => res.json())
    .then(result => {
      let locations = result.map((val) => {
        return new google.maps.LatLng(val.Latitude, val.Longitude);
      })
      console.log("hello");
      shop2010Heatmap = new google.maps.visualization.HeatmapLayer({
        data: locations,
        map: map,
        maxIntensity: maxI,
        radius: rad,
        opacity: opac
      })
    })
    // console.log("hello");
  }
}

function addShop2018Heatmap(event) {
  console.log(event.target.parentNode)
  // if (event.target.innerText === "2010" && event.target.parentNode)
}

const noisesButton = document.getElementById("noises")
noisesButton.addEventListener('click', addNoiseYearButtons)

function addNoiseYearButtons(event) {
  const noises2010 = document.getElementById("noises-2010")
  const noises2018 = document.getElementById("noises-2018")
  if (event.target.innerText === "Noise Complaints: OFF") {
    noisesButton.innerText = "Noise Complaints: ON"
    noises2010.style.display = "inline-block"
    noises2018.style.display = "inline-block"
  } else if (event.target.innerText === "Noise Complaints: ON") {
    noisesButton.innerText = "Noise Complaints: OFF"
    noises2010.style.display = "none"
    noises2018.style.display = "none"
  }
}

function addBikeHeatMap(event) {
  const bikeButton = document.getElementById("bike")
  const bikeDiv = document.getElementById("bike-buttons")
  const yearButton2014 = document.createElement("button")
  yearButton2014.innerText = "2014"
  yearButton2014.style.display = "none"
  yearButton2014.id = "bike-2014"
  const yearButton2018 = document.createElement("button")
  yearButton2018.innerText = "2018"
  yearButton2018.style.display = "none"
  yearButton2018.id = "bike-2018"
  bikeDiv.appendChild(yearButton2014)
  bikeDiv.appendChild(yearButton2018)
    if (event.target.innerText === "Citi Bike Stations: OFF") {
      fetch('static/citi_bikes2014.json')
      .then(res => res.json())
      .then(result => {
        let locations = result.stationBeanList.map((val) => {
          return new google.maps.LatLng(val.latitude, val.longitude);
        })
        bikeHeatMap = new google.maps.visualization.HeatmapLayer({
          data: locations,
          map: map,
          maxIntensity: maxI,
          radius: rad,
          opacity: opac
        })
      })
      bikeButton.innerText = "Citi Bike Stations: ON"
      const button2014 = document.getElementById("bike-2014")
      button2014.style.display = "block"
      const button2018 = document.getElementById("bike-2018")
      button2018.style.display = "inline-flex"
    } else if (event.target.innerText === "Citi Bike Stations: ON") {
      const theBut14 = document.getElementById("bike-2014")
      const theBut18 = document.getElementById("bike-2018")
      bikeHeatMap = bikeHeatMap.setMap(null)
      bikeButton.innerText = "Citi Bike Stations: OFF"
      theBut14.style.display = "none"
      theBut18.style.display = "none"
    }
  }

  // const theBut14 = document.getElementById("bike-2014")
  // theBut14.addEventListener('click', event => {
  //   fetch('static/citi_bikes2014.json')
  //   .then(res => res.json())
  //   .then(result => {
  //     let locations = result.stationBeanList.map((val) => {
  //       return new google.maps.LatLng(val.latitude, val.longitude);
  //     })
  //     bikeHeatMap = new google.maps.visualization.HeatmapLayer({
  //       data: locations,
  //       map: map,
  //       maxIntensity: maxI,
  //       radius: rad,
  //       opacity: opac
  //     })
  //   })
  // });

  function addNoiseHeatMap(event) {
    const noiseButton = document.getElementById("noise")
      if (event.target.innerText === "Noise Complaints: OFF") {
        fetch('static/noise2010.json')
        .then(res => res.json())
        .then(result => {
          let locations = result.map((val) => {
            return new google.maps.LatLng(val.Latitude, val.Longitude);
          })
          noiseHeatMap = new google.maps.visualization.HeatmapLayer({
            data: locations,
            map: map,
            maxIntensity: maxI,
            radius: rad,
            opacity: opac
          })
        })
        noiseButton.innerText = "Noise Complaints: ON"
      } else if (event.target.innerText === "Noise Complaints: ON") {
        noiseHeatMap = noiseHeatMap.setMap(null)
        noiseButton.innerText = "Noise Complaints: OFF"
      }
    }

// Function to change the radius of data points on heatmap
function changeRadius(bool) {
  const step = 2, min = 0, max = 50;
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
  const step = 10, min = 0, max = 1000;
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
