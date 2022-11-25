
$(document).ready(function () {
  AddNavigationListeners();
  //Load main page
  LoadPage(location.pathname);
});

function LoadPage(url) {
  $("main").empty();
  switch (url) {
    case "/":
      $("main").load(`/html/main.html`);
      break;
    case "/login/":
      LoadLoginPage();
      break;
    default:
      var name = url.replaceAll("/", "");
      $("main").load(`/html/${name}.html`);
      break;
  }
  history.pushState(null, null, url);
}

function LoadLoginPage() {
  $("main").load(`/html/login.html`);
  let loginText = $("#user-login")
  loginText.html("Регистрация")
  loginText.attr("href", "/registration")
  loginText.removeClass("d-none");
}

function AddNavigationListeners() {
  var all = $("a");
  for (const link of all) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      var url = $(e.target).attr("href");
      LoadPage(url);
    });
  }
}
