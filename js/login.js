import { PageLoader } from "./loader.js";

export function initLogin() {
  AddLoginListener();
}


async function AddLoginListener() {
  $("#login").click(() => {
    var data = $('form').serializeArray();
    data = ToJsObject(data);
    var userEmail = data.email
    Post(`/account/login`, data).then(async (resp) => {
      if (resp.ok) {
        let response = await resp.json()
        window.localStorage.setItem('userToken', response.token)
        window.localStorage.setItem('userEmail', userEmail);
        PageLoader.loadPage('/');
        console.log(response.token)
      }
    }).catch(
      e => console.error(e)
    )
  });
}

export function Logout() {
  localStorage.clear();
  PageLoader.loadPage('/');
}
