const maxI = 10, rad = 10, opac = .6;
let map, shop2010Heatmap, shop2018Heatmap, noise2010Heatmap, noise2018Heatmap;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 40.759917, lng: -73.897947},
    mapTypeId: 'roadmap'
  });
}

//////////////////////////////////SHOPS/////////////////////////////////////////

const shopsButton = document.getElementById("shops")
shopsButton.addEventListener('click', addShopYearButtons)
catId = shopsButton.dataset.id
shopsButton.addEventListener('click', () => showComments(event, catId))

function addShopYearButtons(event) {
  const shops2010 = document.getElementById("shops-2010")
  shops2010.dataset.status = "inactive"
  shops2010.addEventListener('click', addShop2010Heatmap);
  const shops2018 = document.getElementById("shops-2018")
  shops2018.dataset.status = "inactive"
  shops2018.addEventListener('click', addShop2018Heatmap);
  const explanation = document.getElementById("shops-expl")

  if (event.target.innerText === "New Coffee Shops: OFF") {
    shopsButton.innerText = "New Coffee Shops: ON"
    shops2010.style.display = "inline-block"
    shops2018.style.display = "inline-block"
    explanation.style.display = "block"
  } else if (event.target.innerText === "New Coffee Shops: ON") {
    shopsButton.innerText = "New Coffee Shops: OFF"
    shops2010.style.display = "none"
    shops2018.style.display = "none"
    explanation.style.display = "none"
  }
}

function addShop2010Heatmap(event) {
  if (event.target.innerText === "2010" && event.target.parentNode.id === "shop-buttons" && event.target.dataset.status === "inactive") {

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
  } else if (event.target.innerText === "2010" && event.target.parentNode.id === "shop-buttons" && event.target.dataset.status === "active") {
    shop2010Heatmap = shop2010Heatmap.setMap(null)
    event.target.dataset.status = "inactive"
  }
}

function addShop2018Heatmap(event) {
  if (event.target.innerText === "2018" && event.target.parentNode.id === "shop-buttons" && event.target.dataset.status === "inactive") {
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
  } else if (event.target.innerText === "2018" && event.target.parentNode.id === "shop-buttons" && event.target.dataset.status === "active") {
    shop2018Heatmap = shop2018Heatmap.setMap(null)
    event.target.dataset.status = "inactive"
  }
}
/////////////////////////////////NOISES/////////////////////////////////////////

const noisesButton = document.getElementById("noises")
noisesButton.addEventListener('click', addNoiseYearButtons)

function addNoiseYearButtons(event) {
  const noises2010 = document.getElementById("noises-2010")
  noises2010.dataset.status = "inactive"
  noises2010.addEventListener('click', addNoise2010Heatmap);
  const noises2018 = document.getElementById("noises-2018")
  noises2018.dataset.status = "inactive"
  noises2018.addEventListener('click', addNoise2018Heatmap);
  const explanation = document.getElementById("noise-expl")

  if (event.target.innerText === "Noise Complaints: OFF") {
    noisesButton.innerText = "Noise Complaints: ON"
    noises2010.style.display = "inline-block"
    noises2018.style.display = "inline-block"
    explanation.style.display = "block"
  } else if (event.target.innerText === "Noise Complaints: ON") {
    noisesButton.innerText = "Noise Complaints: OFF"
    noises2010.style.display = "none"
    noises2018.style.display = "none"
    explanation.style.display = "none"
  }
}


function addNoise2010Heatmap(event) {
  if (event.target.innerText === "2010" && event.target.parentNode.id === "noise-buttons" && event.target.dataset.status === "inactive") {
    fetch('static/noise2010.json')
    .then(res => res.json())
    .then(result => {
      let locations = result.map((val) => {
        return new google.maps.LatLng(val.Latitude, val.Longitude);
      })
      noise2010Heatmap = new google.maps.visualization.HeatmapLayer({
        data: locations,
        map: map,
        maxIntensity: maxI,
        radius: 5,
        opacity: opac
      })
    })
    event.target.dataset.status = "active"
  } else if (event.target.innerText === "2010" && event.target.parentNode.id === "noise-buttons" && event.target.dataset.status === "active") {
    noise2010Heatmap = noise2010Heatmap.setMap(null)
    event.target.dataset.status = "inactive"
  }
}

function addNoise2018Heatmap(event) {
  if (event.target.innerText === "2018" && event.target.parentNode.id === "noise-buttons" && event.target.dataset.status === "inactive") {
    fetch('static/noise2018.json')
    .then(res => res.json())
    .then(result => {
      let locations = result.map((val) => {
        return new google.maps.LatLng(val.Latitude, val.Longitude);
      })
      noise2018Heatmap = new google.maps.visualization.HeatmapLayer({
        data: locations,
        map: map,
        maxIntensity: maxI,
        radius: 5,
        opacity: opac
      })
    })
    event.target.dataset.status = "active"
  } else if (event.target.innerText === "2018" && event.target.parentNode.id === "noise-buttons" && event.target.dataset.status === "active") {
    noise2018Heatmap = noise2018Heatmap.setMap(null)
    event.target.dataset.status = "inactive"
  }
}

//////////////////////////////COMMENTS-FORM/////////////////////////////////////

function fetchComments() {
  return fetch('http://localhost:3000/api/v1/comments')
    .then(response => response.json())
    .then(comments => comments.forEach(slapItOnTheDiv))
}

function slapItOnTheDiv(comment) {
  console.log(comment)
  const ul = document.querySelector('ul')
  ul.innerHTML += `<li>${comment.content}</li>`
}


function showComments(event, id) {
  event.preventDefault();
  const commentsSection = document.querySelector('#comments')
  const commentsContainer = document.querySelector('#section')
  const eForm = document.createElement('form')
  commentsContainer.innerHTML = ""
  eForm.innerHTML = `<h5> What do you think about it? </h5> <input type="text" name="content" class="submissionfield" id="theComment">
      <br><input type="submit" name="">`
  commentsContainer.append(eForm)
  eForm.addEventListener('submit', () => {addComment(event, id)})
}

function addComment(event, id){
  const comment = document.querySelector('#theComment')
  event.preventDefault();
  return fetch('http://localhost:3000/api/v1/comments', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(
      {content: `${comment.value}`,
    category_id: `${id}`})
  })
  .then(res => res.json())
  .then(comment => (slapItOnTheDiv(comment)))
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
//   return Math.round(value * multiplier) / multiplier;
// }

fetchComments()
