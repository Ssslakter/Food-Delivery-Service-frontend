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

function AddLoginListener() {
  $("#login").click(() => {
    var data = $('form').serializeArray();
    data = ToJsObject(data);
    userEmail = data.email
    Post(`/account/login`, data).then(async (resp) => {
      if (resp.ok) {
        response = await resp.json()
        userToken = response.token
        let loginText = $("#user-login");
        loginText.html(userEmail)
        loginText.removeClass("d-none");
        $("#exit").html("Выйти");
        LoadPage('/');
        console.log(userToken)
      }
    }).catch(
      e => console.error(e)
    )
  });
}

function changeHeaderText(isLogging) {
  let loginText = $("#user-login");
  if (isLogging) {
    loginText.html(userEmail)
    loginText.removeClass("d-none");
    $("#exit").html("Выйти");
  }
  else {
    loginText.html("")
    loginText.addClass("d-none");
    $("#exit").html("Войти");
  }
}
