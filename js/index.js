import { PageLoader, SetLinkListeners } from './loader.js';
import { Logout } from './login.js'


$(document).ready(function () {
  SetLinkListeners();
  $('#exit').click((e) => {
    e.preventDefault();
    Logout();
  })
  //Load main page
  PageLoader.loadPage(location.pathname, location.search);
});