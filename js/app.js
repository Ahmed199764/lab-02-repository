'use strict';

$(document).ready(function() {
  function Gallary(gall) {
    this.image_url = gall.image_url;
    this.title = gall.title;
    this.description = gall.description;
  }
  Gallary.prototype.render = function() {
    let $gallaryClone = $("#photo-template").clone();
    $gallaryClone.find("h2").text(this.title);
    $gallaryClone.find("img").attr("src", this.image_url);
    $gallaryClone.find("p").text(this.description);
  };
  const readJson = () => {
    $.ajax("data/page-1.json", { method: "GET", dataType: "JSON" }).then(data => {
      data.forEach(gallaryItem => {
        let gall = new Gallary(gallaryItem);
        gall.render();
      });
    });
  };
  readJson();
});
