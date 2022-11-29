import { LoadPage } from "/js/index.js"

export function initLogin() {
  LoadLoginPage();
  AddLoginListener();
}

function LoadLoginPage() {
  let loginText = $("#user-login")
  loginText.html("Регистрация")
  loginText.attr("href", "/registration")
  loginText.removeClass("d-none");
}

async function AddLoginListener() {
  $("#login").click(() => {
    var data = $('form').serializeArray();
    data = ToJsObject(data);
    userEmail = data.email
    Post(`/account/login`, data).then(async (resp) => {
      if (resp.ok) {
        let response = await resp.json()
        userToken = response.token
        window.localStorage.setItem('userToken', response.token)
        window.localStorage.setItem('userEmail', userEmail);
        LoadPage('/');
        console.log(userToken)
      }
    }).catch(
      e => console.error(e)
    )
  });
}

export function changeHeaderText(isLogging) {
  let loginText = $("#user-login");
  if (isLogging) {
    loginText.html(window.localStorage.getItem('userEmail'))
    loginText.removeClass("d-none");
    loginText.attr("href", "/profile")
    $("#exit").html("Выйти");
  }
  else {
    loginText.html("")
    loginText.addClass("d-none");
    $("#exit").html("Войти");
  }
}

