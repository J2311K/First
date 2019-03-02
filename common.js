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
var hotels = [];
var filteredHotels = [];
var currentPage = 0;
var PAGE_SIZE = 9;
var activeFilter = 'filter-all';

/*
var filterReset = document.querySelector('.hotel-filter-reset');
filterReset.onclick = function(evt) {
	document.querySelector('#' + activeFilter).classList.remove('hotel-filter-active');
	renderHotels(hotels, 0, true);
}

var filters = document.querySelectorAll('.hotel-filter');
	for ( var i = 0; i < filters.length; i++) {
		filters[i].onclick = function(evt) {
			var clickedElementID = evt.target.id;
			console.log(clickedElementID);
			setActiveFilter(clickedElementID);
		};
	}
*/

// тот же самый результат достигнут с помощью того, что событие click проиходит из глубины (всплытие), 
// т.е. в данном случае событие click происходит и на .hotels-filters и на '.hotel-filter'
var filters = document.querySelector('.hotels-filters');
	filters.addEventListener('click', function(evt){
		var clickedElementID = evt.target;
		if (clickedElementID.classList.contains('hotel-filter')){
			setActiveFilter(clickedElementID.id);
		}
		if (clickedElementID.classList.contains('hotel-filter-reset')){
			document.querySelector('#' + activeFilter).classList.remove('hotel-filter-active');
			renderHotels(hotels, 0, true);
		}
	});


var scrollTimeout;

window.addEventListener( 'scroll', function(evt){
	clearTimeout(scrollTimeout);
	scrollTimeout = setTimeout(function() {
		console.log('scroll');
	})
	
	// Как определить что скролл внизу страницы и пора показать
	// следующиую порцию отелей?
	// Проверить виден ли футер страницы?
	// Как проверить виден ли футер страницы?
	// 1. определить положение футера относительно экрана (вьюпорта)
	var footerCoordinates = document.querySelector('footer').getBoundingClientRect();
	// 2. опеделить высоту экрана
	var viewportSize = window.innerHeight;
	
	// 3.если смещение футера минус высота экрана меньше высоты футера,
	//     футер виден хотя бы частично
	if (footerCoordinates.bottom - window.innerHeight <= footerCoordinates.height){
		console.log(viewportSize);
		console.log(filteredHotels.length);
		console.log(currentPage);
		
		if (currentPage < Math.ceil(filteredHotels.length / PAGE_SIZE)){
			console.log(filteredHotels.length);
			
		renderHotels(filteredHotels, ++currentPage);
		}
	}
});
	
getHotels();


function renderHotels(hotelsToRender, pageNumber, replace){
	if (replace){
		container.innerHTML = '';
	}
	/*container.innerHTML = '';*/
	var fragment = document.createDocumentFragment();
	var from = pageNumber * PAGE_SIZE;
	var to = from + PAGE_SIZE;
	var pageHotels = hotelsToRender.slice(from, to);

	pageHotels.forEach(function(hotel) {
	var element = getElementFromTemplate(hotel);

	// Для каждого из 50 элементов вызывается отрисовка в DOM
	// Потенциально, это замедляет производительность в старых браузерах,
	// потому что пересчет параметров страницы будет производиться после
	// каждой вставки элемента на странице. Чтобы этого избежать, пользуются
	// фрагментами, нодами вида DocumentFragment  , которые представляют
	// собой контейнеры для других элементов
	fragment. appendChild(element);
	});

	container.appendChild(fragment);
}



function setActiveFilter(id){

	if (activeFilter === id) {
		return
	}
	document.querySelector('#' + activeFilter).classList.remove('hotel-filter-active');
	document.querySelector('#' + id).classList.add('hotel-filter-active');



	// Отсортировать и отфильтровать отели по выбранному параметру и вывести а страницу
	//  hotels будет хранит изначальный список отелей
	filteredHotels = hotels.slice(0);  //Копирование массива

	switch (id) {
		case 'filter-expensive':
			// Для показа сначала дорогих отелей
			// список нужно отсортировать по убыванию цены
			filteredHotels = filteredHotels.sort(function(a, b){
				
				return b.price - a.price;
			}).filter(function(item) {
				return item.price >=5000;
			});
		break;
		case 'filter-6rating':
			filteredHotels = filteredHotels.sort(function(a, b){
				return b.rating - a.rating;
			}).filter(function(item) {
				return item.rating >= 6;
			});
		break;
		case 'filter-2stars':
			filteredHotels = filteredHotels.sort(function(a, b){
				return b.stars - a.stars;
			}).filter(function(item) {
				return item.stars >= 2;
			});
		break;
		case 'filter-3km':
			filteredHotels = filteredHotels.sort(function(a, b){
				return a.distance - b.distance;
			}).filter(function(item) {
				return item.distance <= 3 ;
			});
		break;
	}

	renderHotels(filteredHotels, 0, true);
	activeFilter = id;
}

function getHotels() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '../data/hotel.json');

	// лучше объявлять обработчики до отправки события, 
	//чтобы быть уверенным что обработчик 100% сработает
	xhr.onload = function(evt) {
		var rawData = evt.target.response;
		var loadedHotels = JSON.parse(rawData);
		hotels = loadedHotels;
		//Обработка загруженных данных (например отисовка)

		renderHotels(hotels, 0);
	}
	// отправка запроса прозводится вызовом метода send
	xhr.send();
}




function getElementFromTemplate(data) {
	var template = document.querySelector('#hotel-template');
	if ('content' in template) {
		var element = template.content.children[0].cloneNode(true);
	} else {
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

	// 1 Изображения отличаются от обычных Dom-элементов тем, что
	// после задания src они загружаются с сервера. Для проверки 
	// загрузилось изображение или нет, cуществует событие load
	backgroundImage.onload = function() {
		clearTimeout(imageLoadTimeout);  //отменяем таймаут если картинка загрузилась
		element.style.backgroundImage = 'url(\'' + backgroundImage.src + '\')';
	}

	var imageLoadTimeout = setTimeout(function() {
		backgroundImage.src = ''; //Прекращаем загрузку через IMAGE_TIMEOUT секунд
		element.classList.add('hotel-nophoto'); //Показываем ошибку
	}, IMAGE_TIMEOUT);


	
	//  2 что если изображеение не загрузилось? (упал сервер)
	backgroundImage.onerror = function() {
		element.classList.add('hotel-nophoto');
	}	

	backgroundImage.src = data.preview;


return element;
};

})()
