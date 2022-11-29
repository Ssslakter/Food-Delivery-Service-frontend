import { PageLoader } from "./loader.js";
import { Logout } from './login.js'
$(document).ready(function () {
  AddClickListeners();
  //Load main page
  PageLoader.loadPage(location.pathname, location.search);
});


function AddClickListeners() {
  var all = $("a");
  for (const link of all) {
    if (link.id != 'exit') {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        var url = $(e.target).attr("href");
        PageLoader.loadPage(url);
      });
    }
    else {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        Logout();
      });
    }
  }
}
