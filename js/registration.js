import { PageLoader } from './loader.js';

export function initRegistration() {
    $.validator.addMethod("validateDate", function (value) {
        return value == "" || IsDateWas(value);
    }, "Некорректная дата рождения");
    AddRegListener();
}

async function AddRegListener() {
    $("#submit").click(() => {
        $("#server-error").addClass("d-none")
        let result = ValidateForm()
        if (result != false) {
            var data = $('form').serializeArray();
            data = ToJsObject(data);
            var userEmail = data.email
            Post(`/account/register`, data).then(async (resp) => {
                if (resp.ok) {
                    let response = await resp.json()
                    window.localStorage.setItem('userToken', response.token)
                    window.localStorage.setItem('userEmail', userEmail);
                    PageLoader.loadPage('/');
                    console.log(response.token)
                }
                else {
                    if (resp.status == 400) {
                        console.log(resp)
                    }
                    else {
                        $("#server-error").removeClass("d-none")
                    }
                }
            })
        }
    });
}

function ValidateForm() {
    var form = $("#registration-form form")
    form.addClass('was-validated')
    form.validate({
        errorPlacement: function (error, element) {
            console.log(element, error)
            if (element.attr("name") == "birthdate") {
                //element.get(0).setCustomValidity("Invalid field.");
                error.addClass('invalid-feedback');
                error.insertAfter(element);
            } else {
            }
        },
        rules: {
            birthdate: {
                validateDate: true
            }
        }
    })
    return form.valid();
}

// function ValidateDate() {
//     var userDate = $('#birthDate').val();
//     if (IsDateWas(givenDate)) {
//         return true;
//     }
//     else {

//     }
// }

function IsDateWas(givenDate) {
    if (new Date(givenDate) >= new Date()) {
        return false;
    }
    return true;
}


