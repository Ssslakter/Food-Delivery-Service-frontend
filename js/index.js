import { PageLoader } from './loader.js';
import { Logout } from './login.js'


$(document).ready(function () {
  SetNavLinkListeners();
  $('#exit').click((e) => {
    e.preventDefault();
    Logout();
  })
  //Load main page
  PageLoader.loadPage(location.pathname, location.search);
});

function SetNavLinkListeners() {
  var links = $("a");
  for (const link of links) {
    $(link).click(async (e) => {
      e.preventDefault();
      var url = await $(e.target).attr("href");
      var full = new URL(location.origin + url);
      PageLoader.loadPage(full.pathname, full.search);
    });

  }
}