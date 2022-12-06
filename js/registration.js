import { PageLoader } from './loader.js';

export var phoneMask

export function initRegistration() {
    InitValidator()
    AddRegListener();
}

async function AddRegListener() {
    $("#submit").click(() => {
        $("#server-error").addClass("d-none")
        $("#user-exists").addClass("d-none")
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
                        $("#user-exists").removeClass("d-none")
                    }
                    else {
                        $("#server-error").removeClass("d-none")
                    }
                }
            })
        }
    });
}

export function ValidateForm() {
    var form = $("form")
    form.addClass('was-validated')
    form.validate({
        errorPlacement: function (error, element) {
            //console.log(element, error)
            if (element.attr("name") == "birthDate") {
                //element.get(0).setCustomValidity("Invalid field.");
                error.addClass('invalid-feedback');
                error.insertAfter(element);
            } else if (element.attr("name") == "phoneNumber") {
                error.addClass('invalid-feedback');
                error.insertAfter(element);
            }
        },
        rules: {
            birthDate: {
                validateDate: true
            },
            phoneNumber: {
                phoneLength: 17
            }
        }
    })
    return form.valid();
}


export function IsDateWas(givenDate) {
    if (new Date(givenDate) >= new Date()) {
        return false;
    }
    return true;
}


export function InitValidator() {
    $.validator.addMethod("validateDate", function (value) {
        return value == "" || IsDateWas(value);
    }, "Некорректная дата рождения");
    $.validator.addMethod("phoneLength", function (value, element, param) {
        return value.length == 0 || value.length == param;
    }, $.validator.format("Некорректный формат телефона"));
    phoneMask = IMask(
        document.getElementById('phone'), {
        mask: '+{7}(000) 000-00-00'
    });
}