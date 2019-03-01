'use strict';


(function(){      //     создаем нашу собственную зону видимости - все внутри функции 


var formElement = document.forms['searchform'];

var guests = formElement['searchform-guests-number'];
var rooms = formElement['searchform-guests-rooms'];

guests.min = 1;
guests.max =6;


var MAX_GUESTS_PER_ROOM = 3;


/** Функция, которая ограничивает мин и макс значение комнат 
* в зависимости от кол-ва гостей
* @param {Element} roomsElement
* @param {number} guestsNumber
*/


function setMinAndMaxRooms(roomsElement, guestsNumber){
	// Мин кол-во комнат - если в каждой комнате 
	// будет жить макс кол-во человек (3)
	roomsElement.min = Math.ceil(guestsNumber / MAX_GUESTS_PER_ROOM);

	// Макс. кол-во комнат - если в каждой будет 
	//жить один человек
	roomsElement.max = guestsNumber;
}

//начальный вариант

guests.value = 2;
setMinAndMaxRooms(rooms, guests.value);
rooms.value = rooms.min;



// вариант с использованием cookie
/*guests.value = docCookies.getItem('guests');
setMinAndMaxRooms(rooms, guests.value);
rooms.value = docCookies.getItem('rooms');
*/
//2. Реакция на изменение

// При изменении кол-ва гостей должны автоматически
// пересчитаться граничные значения для кол-ва комнат
guests.onchange = function(){
	setMinAndMaxRooms(rooms, guests.value);
}


// При отправке формы, сохраним последние валидные данные
// в cookies.
formElement.onsubmit = function(event){
	// Объект event(e, evt) представляет собой объект для работы
//	с произшедшим событием
event.preventDefault();

// функция Date отвечает за производство объектов которые работают с датами
// +Date.now() - плюс конвертирует объект Date.now() в число
// 3 * 24 * 60 * 60 * 1000 - 3 дня
var dateToExplore = +Date.now() + 3 * 24 * 60 * 60 * 1000;
var formattedDateToExpire = new Date (dateToExpire).toUTCString();

document.cookie = 'guests' + guests.value  + ';expires';
document.cookie = 'rooms' + rooms.value;
}



var container = document.querySelector('.hotels-list');

hotels.forEach(function(hotel) {
	var element = getElementFromTemplate(hotel);
	container.appendChild(element);
})

function getElementFromTemplate(data) {
  var template = document.querySelector('#hotel-template');
	  if ('content' in template) {
	  	var element = template.content.children[0].cloneNode(true);
	  } 
    else {
  		var element = template.children[0].cloneNode(true);
	  }
	
	element.querySelector('.hotel-name').textContent = data.name;
	element.querySelector('.hotel-stars').textContent = data.stars;
	element.querySelector('.hotel-stars').style.fontSize = "0px";
  
  var minW = 11;
   element.querySelector('.hotel-stars').style.minWidth = (minW * data.stars) + 'px';
   element.querySelector('.hotel-distance-kilometers').textContent = data.distance;
    
    // есть ли wifi в номерее ?
    if (data.amenities.indexOf( 'wifi' ) != -1 ){
    	element.querySelector('.hotel-amenity-wifi').style.display = "inline-block";
    };
    if (data.amenities.indexOf( 'breakfast' ) != -1 ){
    	element.querySelector('.hotel-amenity-breakfast').style.display = "inline-block";
    };
    if (data.amenities.indexOf( 'parking' ) != -1 ){
    	element.querySelector('.hotel-amenity-parking').style.display = "inline-block";
    };
  
     
	element.querySelector('.hotel-rating').textContent = data.rating;
	element.querySelector('.hotel-price-value').textContent = data.price;

	var backgroundImage = new Image();


	// 3 А что если сервер не отвечает по таймауту? Событие
	//  error в этом случае не произойдёт
	var IMAGE_TIMEOUT = 10000;


	var imageLoadTimeout = setTimeout(function() {
		backgroundImage.src = ''; //Прекращаем загрузку через IMAGE_TIMEOUT секунд
		element.classList.add('hotel-nophoto'); //Показываем ошибку
	}, IMAGE_TIMEOUT);


	// 1 Изображения отличаются от обычных Dom-элементов тем, что
	// после задания src они загружаются с сервера. Для проверки 
	// загрузилось изображение или нет, cуществует событие load
	backgroundImage.onload = function() {
		clearTimeout(imageLoadTimeout);  //отменяем таймаут если картинка загрузилась
		element.style.backgroundImage = 'url(\'' + backgroundImage.src + '\')';
	}

	//  2 что если изображеение не загрузилось? (упал сервер)
	backgroundImage.onerror = function() {
		element.classList.add('hotel-nophoto');
	}	

	backgroundImage.src = data.preview;


return element;
};

})()



























'use strict';


(function(){      //     создаем нашу собственную зону видимости - все внутри функции 


var formElement = document.forms['searchform'];

var guests = formElement['searchform-guests-number'];
var rooms = formElement['searchform-guests-rooms'];

guests.min = 1;
guests.max =6;


var MAX_GUESTS_PER_ROOM = 3;


/** Функция, которая ограничивает мин и макс значение комнат 
* в зависимости от кол-ва гостей
* @param {Element} roomsElement
* @param {number} guestsNumber
*/


function setMinAndMaxRooms(roomsElement, guestsNumber){
	// Мин кол-во комнат - если в каждой комнате 
	// будет жить макс кол-во человек (3)
	roomsElement.min = Math.ceil(guestsNumber / MAX_GUESTS_PER_ROOM);

	// Макс. кол-во комнат - если в каждой будет 
	//жить один человек
	roomsElement.max = guestsNumber;
}

//начальный вариант

guests.value = 2;
setMinAndMaxRooms(rooms, guests.value);
rooms.value = rooms.min;



// вариант с использованием cookie
/*guests.value = docCookies.getItem('guests');
setMinAndMaxRooms(rooms, guests.value);
rooms.value = docCookies.getItem('rooms');
*/
//2. Реакция на изменение

// При изменении кол-ва гостей должны автоматически
// пересчитаться граничные значения для кол-ва комнат
guests.onchange = function(){
	setMinAndMaxRooms(rooms, guests.value);
}


// При отправке формы, сохраним последние валидные данные
// в cookies.
formElement.onsubmit = function(event){
	// Объект event(e, evt) представляет собой объект для работы
//	с произшедшим событием
event.preventDefault();

// функция Date отвечает за производство объектов которые работают с датами
// +Date.now() - плюс конвертирует объект Date.now() в число
// 3 * 24 * 60 * 60 * 1000 - 3 дня
var dateToExplore = +Date.now() + 3 * 24 * 60 * 60 * 1000;
var formattedDateToExpire = new Date (dateToExpire).toUTCString();

document.cookie = 'guests' + guests.value  + ';expires';
document.cookie = 'rooms' + rooms.value;
}




var container = document.querySelector('.hotels-list');

 /*  фильтрация         

var activeFilter = 'filter-all';
var hotels = [];
var 

var filters = document.querySelectorAll('.hotel-filter');
	for ( var i = 0; i < filters.length; i++) {
		filters[i].onclick = function(evt) {
			var clickedElementID = ev.target.id;
			setActiveFilter(clickedElementID);
		}
	}

function setActiveFilter(id){
	if (activeFilter === id) {
		return
	}
	document.querySelector('#' + activeFilter).classList.remove('hotel-filter-selected');
	document.querySelector('#' + id).classList.add('hotel-filter-selected');

	var filteredHotels = hotels.slice(0);  //Копирование массива

	switch (id) {
		case 'filter-expensive':
			// Для показа сначала дорогих отелей
			// список нужно отсортировать по убыванию цены
			filteredHotels = filteredHotels.sort(function(a, b){
				return b.price - a.price;
			}).filter(function(item) {
				return item.price >=6;
			});
		break;
		case 'filter-6rating':
			filteredHotels = filteredHotels.sort(function(a, b){
				return b.price - a.price;
			}).filter(function(item) {
				return item.rating >= 6;
			});
		break;
	}

	renderHotels(filteredHotels);
	activeFilter = id;

}*/

hotels.forEach(function(hotel) {
	var element = getElementFromTemplate(hotel);
	container.appendChild(element);
})



/*
   Вариант с использованием AJAXA

getHotels();
/**
* Отрисовка списка отелей
* @param {Array, <Object>} hotels


function renderHotels(hotelsToRende,replace){
	if (replace){
		container.innerHTML = '';
	}
	hotelsToRender.forEach(function(hotel) {
	var element = getElementFromTemplate(hotel);
	container.appendChild(element);
});
}


function getHotels() {
	var xhr + new XMLHttpRequest();
	xhr.open('GET', 'data/hotels.json');
	xhr.onload = function(evt) {
		var rawData = evt.target.response;
		var loadedHotels = JSON.parse(rawData);

		//Обработка загруженных данных (например отисовка)
		renderHotels(loadedHotels);
	}

	xhr.send();
}

*/


function getElementFromTemplate(data) {
/*	var art = document.createElement('article');
	art.classList.add('hotel');
	var hart = document.createElement('span');
	hart.classList.add('hotel-stars');
	hart.textContent = data.stars;
	var tart = document.createElement('h3');
	tart.classList.add('hotel-name');
	tart.textContent = data.name;
	var rart= document.createElement('h3');
	rart.classList.add('hotel-name');
	rart.innerHTML = data.rating;
	var bart = document.createElement('a');
	bart.classList.add('hotel-price');
	var dart = document.createElement('span');
	dart.classList.add('hotel-price-value');
	dart.innerHTML = data.price;
	bart.appendChild(dart);


	art.appendChild(hart);
	art.appendChild(tart);
	art.appendChild(rart);
	art.appendChild(bart);

	return art;*/

	var template = document.querySelector('#hotel-template');
	if ('content' in template) {
		var element = template.content.children[0].cloneNode(true);
	} else {
		var element = template.children[0].cloneNode(true);
	}
	
	element.querySelector('.hotel-name').textContent = data.name;
	element.querySelector('.hotel-stars').textContent = data.stars;
	element.querySelector('.hotel-stars').style.fontSize = "0px";
/*if (data.stars === 2){
		element.querySelector('.hotel-stars').style.minWidth = "21px";
	}
	if (data.stars === 3){
		element.querySelector('.hotel-stars').style.minWidth = "33px";
	}
	if (data.stars === 4){
		element.querySelector('.hotel-stars').style.minWidth = "44px";
	}
	if (data.stars === 5){
		element.querySelector('.hotel-stars').style.minWidth = "55px";
	}
	/* попытка сократить до формулы вычисляющей ширину отведенную под звездочки
*/
	
	
	var minW = 11;
    element.querySelector('.hotel-stars').style.minWidth = (minW * data.stars) + 'px';
    element.querySelector('.hotel-distance-kilometers').textContent = data.distance;
    
    // есть ли wifi в номерее ?
    if (data.amenities.indexOf( 'wifi' ) != -1 ){
    	element.querySelector('.hotel-amenity-wifi').style.display = "inline-block";
    };
    if (data.amenities.indexOf( 'breakfast' ) != -1 ){
    	element.querySelector('.hotel-amenity-breakfast').style.display = "inline-block";
    };
    if (data.amenities.indexOf( 'parking' ) != -1 ){
    	element.querySelector('.hotel-amenity-parking').style.display = "inline-block";
    };
  
     
	element.querySelector('.hotel-rating').textContent = data.rating;
	element.querySelector('.hotel-price-value').textContent = data.price;

	var backgroundImage = new Image();


	// 3 А что если сервер не отвечает по таймауту? Событие
	//  error в этом случае не произойдёт
	var IMAGE_TIMEOUT = 10000;


	var imageLoadTimeout = setTimeout(function() {
		backgroundImage.src = ''; //Прекращаем загрузку через IMAGE_TIMEOUT секунд
		element.classList.add('hotel-nophoto'); //Показываем ошибку
	}, IMAGE_TIMEOUT);


	// 1 Изображения отличаются от обычных Dom-элементов тем, что
	// после задания src они загружаются с сервера. Для проверки 
	// загрузилось изображение или нет, cуществует событие load
	backgroundImage.onload = function() {
		clearTimeout(imageLoadTimeout);  //отменяем таймаут если картинка загрузилась
		element.style.backgroundImage = 'url(\'' + backgroundImage.src + '\')';
	}

	//  2 что если изображеение не загрузилось? (упал сервер)
	backgroundImage.onerror = function() {
		element.classList.add('hotel-nophoto');
	}	

	backgroundImage.src = data.preview;


return element;
};

})()



