'use-strict';


let myKeywords = ['all'];

function Img(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  Gallary.push(this);
}
let Gallary = [];


$.get('./data/page-1.json').done(data => {
  data.forEach(element => {
    new Img(element.image_url, element.title, element.description, element.keyword, element.horns);
  });
  //creates a new section for each image to be more specific in CSS 
  Gallary.forEach((img) => {
    let myTemple = $('section');
    let clone = myTemple.clone();

    clone.attr('id', `${img.keyword}`);
    clone.attr('class', 'all');
    clone.children('h2').text(img.title);
    clone.children('img').attr('src', `${img.image_url}`);
    clone.children('img').attr('alt', `${img.title}`);
    clone.children('p').text(img.description);
    $('main').append(clone[0]);
    
    //Inserting each keyword to the list
    if(!myKeywords.includes(img.keyword)) {
      myKeywords.push(img.keyword);
    }
  });

  //creates a select option for each keyword from the list
  myKeywords.forEach((keyword) => {
    let myTemple = $('option');
    let clone = myTemple.clone();
    clone.attr('value', keyword);
    clone.text(keyword);
    $('select').append(clone[0]);
  });

  //handles option selection event
  $('select').change((e) => {
    $('section').each(function() {
      $(this).show();
      // hide the not selected items
      if( $(this).attr('id') !== e.target.value) {
        $(this).hide();
      }
      // here to show each list output when selected
      if ( $(this).attr === e.target.value ) {
        $(this).toggle();
      }
      if ( $(this).attr('class') === e.target.value) {
        $(this).toggle();
      }
    });
  });
});

