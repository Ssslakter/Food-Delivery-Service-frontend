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
  history.pushState(null, null, url);
  $("main").empty();
  const address = url.substring(1).split('/');
  console.log(address);
  switch (address[0]) {
    case '':
      $("main").load(`/html/main.html`, initMain);
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
      if (url in endpoints) {
        var name = url.replaceAll("/", "");
        $("main").load(`/html/${name}.html`);
      }
      else {
        $("main").load('/html/notFound.html');
      }
      break;
  }
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
