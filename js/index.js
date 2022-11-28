import { initMain } from "/js/main.js"
import { initLogin } from "/js/login.js"
import { initItem } from "/js/item.js"

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
  const queryString = window.location.search;
  console.log(queryString);
  $("main").empty();
  const address = url.substring(1).split('/');
  switch (address[0]) {
    case '':
      $("main").load(`/html/main.html`, () => initMain(queryString));
      break;
    case "login":
      $("main").load(`/html/login.html`, initLogin);
      break;
    case "registration":
      $("main").load(`/html/registration.html`);
      break;
    case "item":
      $("main").load(`/html/item.html`, initItem);
      break;
    default:
      $("main").load('/html/notFound.html');
      break;
  }
  history.pushState(null, null, url);
}

export function LoadNotFoundPage() {
  $("main").load('/html/notFound.html');
}

function AddClickListeners(onClickFunc) {
  var all = $("a");
  for (const link of all) {
    link.addEventListener("click", onClickFunc);
  }
}
