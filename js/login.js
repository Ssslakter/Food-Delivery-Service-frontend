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
    console.log("fdlfkdl");
    var data = $('form').serializeArray();
    data = ToJsObject(data);
    userEmail = data.email
    Post(`/account/login`, data)
      .then((response) => {
        userToken = response.token
        let loginText = $("#user-login");
        loginText.html(userEmail)
        loginText.removeClass("d-none");
        $("#exit").html("Выйти");
        LoadPage('/');
        console.log(userToken)
      }).catch(
        e => console.error(e)
      )
  });
}

