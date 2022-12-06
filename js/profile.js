import { PageLoader } from './loader.js';
import { ValidateForm, InitValidator, phoneMask } from './registration.js';


export function initProfile() {
    InitValidator()
    LoadProfile()
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
        $("#success-alert").addClass("d-none")
        $("#server-error").addClass("d-none")
        let result = ValidateForm()
        if (result != false) {
            var data = $('form').serializeArray();
            data = ToJsObject(data);
            PutAuth(`/account/profile`, data).then(async (resp) => {
                if (resp.ok) {
                    $("#success-alert").removeClass("d-none")
                }
                else if (resp.status == 500) {
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
    phoneMask.value = data.phoneNumber
    phoneMask.updateValue()
    var date = new Date(data.birthDate)
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    $("#birthdate").val(date.getFullYear() + "-" + (month) + "-" + (day))
}