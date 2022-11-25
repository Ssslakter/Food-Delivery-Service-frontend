import { initMain } from "/js/main.js"
import { initLogin } from "/js/login.js"

$(document).ready(function () {
  AddClickListeners((e) => {
    e.preventDefault();
    var url = $(e.target).attr("href");
    LoadPage(url);
  });
  //Load main page
  LoadPage(location.pathname);
});

export function LoadPage(url) {
  $("main").empty();
  switch (url) {
    case "/":
      $("main").load(`/html/main.html`, initMain);
      break;
    case "/login/":
      $("main").load(`/html/login.html`, initLogin);
      break;
    default:
      if (url in endpoints) {
        var name = url.replaceAll("/", "");
        $("main").load(`/html/${name}.html`);
      }
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


