const maxI = 10, rad = 10, opac = .6;
let map, shop2010Heatmap, shop2018Heatmap, noise2010Heatmap, noise2018Heatmap;

let darkMode = false
const dark = document.getElementById("checkMe")
const body = document.querySelector('body');
console.log(body);


dark.addEventListener('click', event => {
  if (dark.checked === false) {
    darkMode = false
    initMap()
    body.classList.add("light")
    body.classList.remove("dark")
    console.log("light");
  } else if (dark.checked === true) {
    darkMode = true
    initMap()
    body.classList.add("dark")
    body.classList.remove("light")
    console.log("dark");
  }
});


// let darkMode = true


function initMap() {
  if (darkMode == false) {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 40.759917, lng: -73.897947},
    mapTypeId: 'roadmap',
  })}
  else {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: 40.759917, lng: -73.897947},
      mapTypeId: 'roadmap',
      styles: [
                {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
                {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
                {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
                {
                  featureType: 'administrative.locality',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#d59563'}]
                },
                {
                  featureType: 'poi',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#d59563'}]
                },
                {
                  featureType: 'poi.park',
                  elementType: 'geometry',
                  stylers: [{color: '#263c3f'}]
                },
                {
                  featureType: 'poi.park',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#6b9a76'}]
                },
                {
                  featureType: 'road',
                  elementType: 'geometry',
                  stylers: [{color: '#38414e'}]
                },
                {
                  featureType: 'road',
                  elementType: 'geometry.stroke',
                  stylers: [{color: '#212a37'}]
                },
                {
                  featureType: 'road',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#9ca5b3'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'geometry',
                  stylers: [{color: '#746855'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'geometry.stroke',
                  stylers: [{color: '#1f2835'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#f3d19c'}]
                },
                {
                  featureType: 'transit',
                  elementType: 'geometry',
                  stylers: [{color: '#2f3948'}]
                },
                {
                  featureType: 'transit.station',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#d59563'}]
                },
                {
                  featureType: 'water',
                  elementType: 'geometry',
                  stylers: [{color: '#17263c'}]
                },
                {
                  featureType: 'water',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#515c6d'}]
                },
                {
                  featureType: 'water',
                  elementType: 'labels.text.stroke',
                  stylers: [{color: '#17263c'}]
                }
              ]
    })
  }
}

function dark() {
  darkMode = false
  initMap()
}

// dark()

//////////////////////////////////SHOPS/////////////////////////////////////////

const shopsButton = document.getElementById("shops")
let commentHeadline = document.querySelector("#cmHeadline")
// let buttonHeadline = document.querySelector("#cmHeadline")
let shopId = shopsButton.dataset.id
const ul = document.querySelector('ul')

shopsButton.addEventListener('click', addShopYearButtons)
shopsButton.addEventListener('click', () => fetchShopComments(event, shopId))
// shopsButton.addEventListener('click', () => showForm(event, shopId))


function addShopYearButtons(event) {
  const shops2010 = document.getElementById("shops-2010")
  shops2010.dataset.status = "inactive"
  shops2010.addEventListener('click', addShop2010Heatmap);
  const shops2018 = document.getElementById("shops-2018")
  shops2018.dataset.status = "inactive"
  shops2018.addEventListener('click', addShop2018Heatmap);
  // const explanation = document.getElementById("shops-expl")


  if (event.target.innerText == "New Coffee Shops") {
    shopsButton.innerText = "✅ New Coffee Shops"
    shops2010.style.display = "inline-block"
    shops2018.style.display = "inline-block"
    commentHeadline.style.display = "block"
    showForm(event, shopId)
  } else if (event.target.innerText == "✅ New Coffee Shops" && noisesButton.innerText == "✅ Noise Complaints") {
    shopsButton.innerText = "New Coffee Shops"
    shops2010.style.display = "none"
    shops2018.style.display = "none"
    fetchNoiseComments(event, 1)
    showForm(event, noiseId)
    // commentHeadline.style.display = "none"
    shop2010Heatmap.setMap(null)
    shop2018Heatmap.setMap(null)
  } else {
    hideForm();
    shopsButton.innerText = "New Coffee Shops"
    shops2010.style.display = "none"
    shops2018.style.display = "none"
    // explanation.style.display = "none"
    commentHeadline.style.display = "none"
    shop2010Heatmap.setMap(null)
    shop2018Heatmap.setMap(null)
  }
}

function addShop2010Heatmap(event) {
  if (event.target.innerText == "2010" && event.target.parentNode.id == "shop-buttons" && event.target.dataset.status == "inactive") {

    fetch('http://localhost:5000/static/pawn_coffee2010.json')
    .then(res => res.json())
    .then(result => {
      let locations = result.map((val) => {
        return new google.maps.LatLng(val.Latitude, val.Longitude);
      })
      shop2010Heatmap = new google.maps.visualization.HeatmapLayer({
        data: locations,
        map: map,
        maxIntensity: 4,
        radius: rad,
        opacity: opac
      })
    })
    event.target.dataset.status = "active"
  } else if (event.target.innerText == "2010" && event.target.parentNode.id == "shop-buttons" && event.target.dataset.status == "active") {
    shop2010Heatmap = shop2010Heatmap.setMap(null)
    event.target.dataset.status = "inactive"
  }
}

function addShop2018Heatmap(event) {
  if (event.target.innerText == "2018" && event.target.parentNode.id == "shop-buttons" && event.target.dataset.status == "inactive") {
    console.log(event.target);
    fetch('http://localhost:5000/static/pawn_coffee2018.json')
    .then(res => res.json())
    .then(result => {
      let locations = result.map((val) => {
        return new google.maps.LatLng(val.Latitude, val.Longitude);
      })
      shop2018Heatmap = new google.maps.visualization.HeatmapLayer({
        data: locations,
        map: map,
        maxIntensity: 4,
        radius: rad,
        opacity: opac
      })
    })
    event.target.dataset.status = "active"
  } else if (event.target.innerText == "2018" && event.target.parentNode.id == "shop-buttons" && event.target.dataset.status == "active") {
    shop2018Heatmap = shop2018Heatmap.setMap(null)
    event.target.dataset.status = "inactive"
  }
}
/////////////////////////////////NOISES/////////////////////////////////////////

const noisesButton = document.getElementById("noises")
let noiseId = noisesButton.dataset.id
// console.log(noiseId);
noisesButton.addEventListener('click', addNoiseYearButtons)
noisesButton.addEventListener('click', () => fetchNoiseComments(event, noiseId))

function addNoiseYearButtons(event) {
  const noises2010 = document.getElementById("noises-2010")
  noises2010.dataset.status = "inactive"
  noises2010.addEventListener('click', addNoise2010Heatmap);
  const noises2018 = document.getElementById("noises-2018")
  noises2018.dataset.status = "inactive"
  noises2018.addEventListener('click', addNoise2018Heatmap);
  // const explanation = document.getElementById("noise-expl")

  if (event.target.innerText == "Noise Complaints") {
    noisesButton.innerText = "✅ Noise Complaints"
    noises2010.style.display = "inline-block"
    noises2018.style.display = "inline-block"
    // explanation.style.display = "block"
    commentHeadline.style.display = "block"
    showForm(event, noiseId)
    // fetchNoiseComments(event, noiseId)
  } else if (event.target.innerText == "✅ Noise Complaints" && shopsButton.innerText == "✅ New Coffee Shops") {
    noisesButton.innerText = "Noise Complaints"
    noises2010.style.display = "none"
    noises2018.style.display = "none"
    showForm(event, shopId)
    fetchShopComments(event, 2)
    // explanation.style.display = "none"
    // commentHeadline.style.display = "none"
    noise2010Heatmap.setMap(null)
    noise2018Heatmap.setMap(null)
  } else {
    hideForm();
    noisesButton.innerText = "Noise Complaints"
    noises2010.style.display = "none"
    noises2018.style.display = "none"
    // explanation.style.display = "none"
    commentHeadline.style.display = "none"
    noise2010Heatmap.setMap(null)
    noise2018Heatmap.setMap(null)
  }
}


function addNoise2010Heatmap(event) {
  if (event.target.innerText == "2010" && event.target.parentNode.id == "noise-buttons" && event.target.dataset.status == "inactive") {
    fetch('static/noise2010.json')
    .then(res => res.json())
    .then(result => {
      let locations = result.map((val) => {
        return new google.maps.LatLng(val.Latitude, val.Longitude);
      })
      noise2010Heatmap = new google.maps.visualization.HeatmapLayer({
        data: locations,
        map: map,
        maxIntensity: 8,
        radius: 5,
        opacity: opac
      })
    })
    event.target.dataset.status = "active"
  } else if (event.target.innerText == "2010" && event.target.parentNode.id == "noise-buttons" && event.target.dataset.status == "active") {
    noise2010Heatmap = noise2010Heatmap.setMap(null)
    event.target.dataset.status = "inactive"
  }
}

function addNoise2018Heatmap(event) {
  if (event.target.innerText == "2018" && event.target.parentNode.id == "noise-buttons" && event.target.dataset.status == "inactive") {
    fetch('static/noise2018.json')
    .then(res => res.json())
    .then(result => {
      let locations = result.map((val) => {
        return new google.maps.LatLng(val.Latitude, val.Longitude);
      })
      noise2018Heatmap = new google.maps.visualization.HeatmapLayer({
        data: locations,
        map: map,
        maxIntensity: 8,
        radius: 5,
        opacity: opac
      })
    })
    event.target.dataset.status = "active"
  } else if (event.target.innerText == "2018" && event.target.parentNode.id == "noise-buttons" && event.target.dataset.status == "active") {
    noise2018Heatmap = noise2018Heatmap.setMap(null)
    event.target.dataset.status = "inactive"
  }
}

//////////////////////////////COMMENTS-FORM/////////////////////////////////////

function fetchShopComments(event, id) {
  if (shopsButton.innerText == "✅ New Coffee Shops") {
    fetch(`http://localhost:3000/api/v1/categories/${id}`)
      .then(response => response.json())
      .then(data => data.comments.forEach(slapItOnTheDiv))
  } else if (shopsButton.innerText == "New Coffee Shops") {
    const ul = document.querySelector('ul')
    ul.innerHTML = ""
  }
}

function fetchNoiseComments(event, id) {
  if (noisesButton.innerText == "✅ Noise Complaints") {
    fetch(`http://localhost:3000/api/v1/categories/${id}`)
      .then(response => response.json())
      .then(data => data.comments.forEach(slapItOnTheDiv))
  } else if (noisesButton.innerText == "Noise Complaints") {
    const ul = document.querySelector('ul')
    ul.innerHTML = ""
  }
}

function slapItOnTheDiv(comment) {

  const ul = document.querySelector('ul')
  ul.innerHTML += `<li>${comment.content}</li>`
}

function showForm(event, id) {
  // event.preventDefault();
  const commentsSection = document.querySelector('#comments')
  const commentsContainer = document.querySelector('#section')
  const eForm = document.createElement('form')
  commentsContainer.innerHTML = ""
  eForm.innerHTML = `<h5> What do you think about it? </h5> <input type="text" name="content" class="submissionfield" id="theComment" placeholder="please write your comment!">
      <br><input type="submit" name="">`
  commentsContainer.append(eForm)
  eForm.addEventListener('submit', (event) => {
    addComment(event, id);
    event.target.children[1].value = ''
    event.preventDefault()
  })
}

function hideForm() {
  const commentsContainer = document.querySelector('#section')
  commentsContainer.innerHTML = ""
}

function addComment(event, id){
  const comment = document.querySelector('#theComment').value
  if (comment == "") {
    alert("hey, write your comment!")
  } else {
  return fetch('http://localhost:3000/api/v1/comments', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(
      {content: `${comment}`,
    category_id: `${id}`})
  })
  .then(ul.innerHTML += `<li>${comment}</li>`)
  // .then(res => res.json())
  // .then(comment => (slapItOnTheDiv(comment))
}
}
//
// /////////////////////////////FUNCTIONS//////////////////////////////////////////
//
// // Function to change the radius of data points on heatmap
// function changeRadius(bool) {
//   const step = 2, min = 0, max = 50;
//   let current = heatmap.get('radius');
//   let newValue = toggleUpDown(bool, current, step, min, max);
//
//   heatmap.set('radius', newValue);
//   document.getElementById("radiusNum").innerText = newValue;
// };
//
// // Function to change the opacity of the heatmap
// function changeOpacity(bool) {
//   const step = .2, min = 0, max = 1;
//   let current = heatmap.get('opacity');
//   let newValue = toggleUpDown(bool, current, step, min, max);
//   let rounded = round(newValue, 1);
//
//   heatmap.set('opacity', rounded);
//   document.getElementById("opacityNum").innerText = rounded;
// }
//
// // Function to change maxIntensity of the heatmap
// function changeIntensity(bool) {
//   const step = 10, min = 0, max = 1000;
//   let current = heatmap.get('maxIntensity');
//   let newValue = toggleUpDown(bool, current, step, min, max);
//
//   heatmap.set('maxIntensity', newValue);
//   document.getElementById("intensityNum").innerText = newValue;
// };
//
// // Changes our toggle values and keeps them within our min/max values
// function toggleUpDown(bool, current, step, min, max){
//   if (bool && current >= max) return current;
//   if (!bool && current <= min) return current;
//
//   if (bool) return current + step;
//   return current - step;
// }
//
// // Used to round the opacity toggle to one decimal place
// function round(value, precision) {
//   var multiplier = Math.pow(10, precision || 0);
