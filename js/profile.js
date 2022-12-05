import { PageLoader } from './loader.js';
import { ValidateForm, IsDateWas } from './registration.js';

export function initProfile() {
    LoadProfile()
    $.validator.addMethod("validateDate", function (value) {
        return value == "" || IsDateWas(value);
    }, "Некорректная дата рождения");
    AddEditListener();
}

function LoadProfile() {
    GetAuth('/account/profile').then(async (response) => {
        if (response.ok) {
            let json = await response.json()
            FillForm(json)
        }
        else if (response.status == 401) {
            localStorage.clear();
            PageLoader.loadPage("/login");
        }
    })
}


async function AddEditListener() {
    $("#update").click(() => {
        $("#server-error").addClass("d-none")
        let result = ValidateForm()
        if (result != false) {
            var data = $('form').serializeArray();
            data = ToJsObject(data);
            PutAuth(`/account/profile`, data).then(async (resp) => {
                if (resp.status == 500) {
                    $("#server-error").removeClass("d-none")
                }
                else if (resp.status == 401) {
                    PageLoader.loadPage("/login")
                }
            })
        }
    });
}


function FillForm(data) {
    $("#credentials").val(data.fullName)
    $("#email").val(data.email)
    $("#gender").val(data.gender)
    $("#address").val(data.address)
    $("#phone").val(data.phoneNumber)
    var date = new Date(data.birthDate)
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    $("#birthdate").val(date.getFullYear() + "-" + (month) + "-" + (day))
}