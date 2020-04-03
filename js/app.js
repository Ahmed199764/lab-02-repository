'use strict';


const pageOne = 'data/page-1.json';
const pageTwo = 'data/page-2.json';

let GalleryArray = [];

function Animal(obj) {
  for(let key in obj){
    this[key] = obj[key];
  }
}

Animal.prototype.toHtml = function() {
  let temple = $('#photo-template').html();
  let template = Handlebars.compile(temple);
  return template(this);
};

Animal.prototype.toDropdown = function() {
  let temple = $('#list').html();
  let template = Handlebars.compile(temple);
  return template(this);
};


const readJson = (pageNumber) => {

  GalleryArray = [];
  $.get(pageNumber)
    .then(Data => {
      Data.forEach(animal => {
        GalleryArray.push(new Animal(animal));
      });
    })
    .then(titleSort);
};


const loadAnimals = () => {
  GalleryArray.forEach(animal => {

    $('main').append(animal.toHtml());
  });
  dropDrown();
};

const dropDrown = () => {
  GalleryArray.forEach(animal => {
    let ready = false;
    $('#selector option').each(function(){
      if(this.value === animal.keyword){
        ready = true;
      }
    });
    if(ready === false){
      $('select').append(animal.toDropdown());
    }
  });
};

let gallerySelector = (event) => {
  $('section').hide();
  let img = $(`img[value="${event.target.value}"]`).parent();
  $(img).show();
};

$('#selector').on('change', gallerySelector);

let pageOneSelector = () => {
  $('section').remove();
  readJson(pageOne);
};
let pageTwoSelector = () => {
  $('section').remove();
  readJson(pageTwo);
};

let titleSort = () => {
  GalleryArray.forEach( () => {
    GalleryArray.sort( (a,b) => {
      if(a.title < b.title){
        return -1;
      }
      if(a.title > b.title){
        return 1;
      }
      return 0;
    });
    return GalleryArray;
  });
  $('section').remove();
  loadAnimals();
};

let hornSort = () => {
  GalleryArray.forEach( () => {
    GalleryArray.sort( (a,b) => {
      return a.horns - b.horns;
    });
    return GalleryArray;
  });
  $('section').remove();
  loadAnimals();
};

$('#pageOne').on('click', pageOneSelector);
$('#pageTwo').on('click', pageTwoSelector);

$('#title').on('click', titleSort);
$('#horns').on('click', hornSort);
$(() => readJson(pageOne));