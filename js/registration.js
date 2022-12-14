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
            console.log(data)
            Post(`/account/register`, data).then(async (resp) => {
                if (resp.ok) {
                    let response = await resp.json()
                    SetToken('userToken', response.token)
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
            },
            password: {
                regex: '(?=.*\\d)[\\d\\w!@#$%^&*]{6,}'
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
    $.validator.addMethod("validateDate", function (value, element) {
        if (value == "" || IsDateWas(value)) {
            element.setCustomValidity("");
            return true;
        }
        element.setCustomValidity("Invalid field.");
        return false;
    }, "Некорректная дата рождения");
    $.validator.addMethod("phoneLength", function (value, element, param) {
        if (value.length == 0 || value.length == param) {
            element.setCustomValidity("");
            return true;
        }
        element.setCustomValidity("Invalid field.");
        return false;
    }, $.validator.format("Некорректный формат телефона"));
    $.validator.addMethod(
        "regex",
        function (value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );
    phoneMask = IMask(
        document.getElementById('phone'), {
        mask: '+{7}(000) 000-00-00'
    });
}