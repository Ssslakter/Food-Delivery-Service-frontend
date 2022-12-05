import { PageLoader } from "./loader.js";

export function initLogin() {
  AddLoginListener();
}


async function AddLoginListener() {
  $("#login").click(() => {
    $("#wrong-login").addClass("d-none")
    var data = $('form').serializeArray();
    data = ToJsObject(data);
    var userEmail = data.email
    if (ValidateForm()) {
      Post(`/account/login`, data).then(async (resp) => {
        if (resp.ok) {
          let response = await resp.json()
          window.localStorage.setItem('userToken', response.token)
          window.localStorage.setItem('userEmail', userEmail);
          PageLoader.loadPage('/');
        }
        else if (resp.status == 400) {
          $("#wrong-login").removeClass("d-none")
        }
      })
    }
  });
}

export function Logout() {
  localStorage.clear();
  PageLoader.loadPage('/');
}


function ValidateForm() {
  var form = $("form")
  form.addClass('was-validated')
  form.validate({
    errorPlacement: function (error, element) {
      return true
    }
  })
  return form.valid();
}