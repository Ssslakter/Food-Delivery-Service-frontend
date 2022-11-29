export function initRegistration() {
    AddRegListener();
}

async function AddRegListener() {
    $("#submit").click(() => {
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
                console.log(resp)
            }
        }).catch(
            e => console.error(e)
        )
    });
}