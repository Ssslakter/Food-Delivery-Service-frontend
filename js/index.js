$(document).ready(function () {
  //Load main page
  $("main").load("/html/main.html");
});

function LoadPage(url) {
  $("main").load(url);
}
