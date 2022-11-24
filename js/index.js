$(document).ready(function () {
  AddNavigationListeners();
  //Load main page
  LoadPage(location.pathname);
});

function LoadPage(url) {
  $("main").empty();
  if (url == "/") {
    $("main").load(`/html/main.html`);
    return;
  }
  var name = url.replaceAll("/", "");
  $("main").load(`/html/${name}.html`);
}

function AddNavigationListeners() {
  var all = $("a");
  for (const link of all) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      var url = $(e.target).attr("href");
      history.pushState(null, null, url);
      LoadPage(location.pathname);
    });
  }
}
