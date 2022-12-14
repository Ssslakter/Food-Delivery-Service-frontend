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
  PostAuth('/account/logout').then((response) => {
    if (response.ok) {
      localStorage.clear();
      PageLoader.loadPage('/');
    }
    else if (response.status == 401) {
      PageLoader.load('/login')
    }
  })
}


function ValidateForm() {
  var form = $("form")
  form.addClass('was-validated')
  form.validate({
    errorPlacement: function (error, element) {
      return true
    },
    rules: {
      password: {
        regex: '(?=.*\\d)[\\d\\w!@#$%^&*]{6,}'
      }
    }
  })
  return form.valid();
}