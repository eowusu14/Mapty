'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      // console.log(latitude, longitude);

      const coords = [latitude, longitude];

      map = L.map('map').setView(coords, 18);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const marker = L.marker(coords)
        .addTo(map)
        .bindPopup('You are here')
        .openPopup();

      L.circleMarker(coords, { radius: position.coords.accuracy }).addTo(map);

      // handling clicks on map
      map.on('click', function (mapE) {
        mapEvent = mapE
        form.classList.remove('hidden');
        inputDistance.focus();

        // console.log(e);
        // const {lat, lng} = e.latlng
        // const ptCoords = [lat, lng]

        // const marker2 = L.marker(ptCoords)
        // .addTo(map)
        // .bindPopup(
        //     L.popup({minWidth: 100, maxWidth: 250, autoClose: false, closeOnClick: false, className: 'running-popup'})
        //     )
        // .setPopupContent('Workout')
        // .openPopup()
      });
    },

    function () {
      console.log('allow geolocation');
    }
  );

form.addEventListener('submit', function (e) {
    e.preventDefault()
    console.log(mapEvent);
    const { lat, lng } = mapEvent.latlng;
    const ptCoords = [lat, lng];
    
    const marker2 = L.marker(ptCoords)
    .addTo(map)
    .bindPopup(
        L.popup({
            minWidth: 100,
            maxWidth: 250,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup',
        })
        )
        .setPopupContent('Workout')
    .openPopup();
    
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '' 
    inputType.addEventListener('change', function () {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
    })

});
