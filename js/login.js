window.onload = function () {
  LoadPage(location.pathname);
};

$("#login").click(() => {
  var data = $('form').serializeArray();
  data = ToJsObject(data);
  userEmail = data.email
  Post(`${ApiURL}/account/login`, data)
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
