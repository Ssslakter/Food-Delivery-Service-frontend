import { initLogin } from './login.js'
import { initRegistration } from './registration.js'
import { initOrders } from './orders.js'
import { initDetails } from './orderDetails.js'
import { initMakeOrder } from './purchase.js'
import { initMain } from "./main.js"
import { initItem } from "./item.js"
import { initCart } from './cart.js'
import { initProfile } from './profile.js'

export class PageLoader {

    static endpoints = {
        login: initLogin,
        registration: initRegistration,
        profile: initProfile,
        item: initItem,
        cart: initCart,
        orders: initOrders,
        order: initDetails,
        purchase: initMakeOrder
    }

    static async loadPage(url, query) {
        query = query || ""
        $("main").empty();
        //TODO change history in other files
        history.replaceState(null, '', url + query);
        let email = window.localStorage.getItem('userEmail')
        this.#getCartNumber(email)
        this.#changeAuthInHeader(email)
        const address = url.substring(1).split('/');
        if (address[0] == '') {
            $("main").load(`/html/main.html`, () => {
                initMain(query);
            });
        }
        else if (address[0] in this.endpoints) {
            $("main").load(`/html/${address[0]}.html`, this.endpoints[address[0]]);
        }
        else {
            $("main").load('/html/notFound.html');
        }
    }

    static #changeAuthInHeader(isLogged) {
        if (isLogged) {
            $("#enter").addClass("d-none");
            $("#exit").removeClass("d-none");
            $("#register").addClass("d-none");
            $("#user-login").removeClass("d-none");
            $("#user-login").text(window.localStorage.getItem('userEmail'))
            $("#cart").removeClass("d-none");
            $("#orders").removeClass("d-none");
        }
        else {
            $("#enter").removeClass("d-none");
            $("#user-login").addClass("d-none");
            $("#exit").addClass("d-none");
            $("#register").removeClass("d-none");
            $("#cart").addClass("d-none");
            $("#orders").addClass("d-none");
        }
    }

    static #getCartNumber(isLogged) {
        if (isLogged) {
            GetAuth('/basket').then(async (response) => {
                if (response.ok) {
                    let json = await response.json()
                    $("#cart-number").text(json.length)
                    if (json.length == 0) {
                        $("#cart-number").addClass("d-none");
                    }
                }
                else if (response.status == 401) {
                    localStorage.clear()
                }
            })
        }

    }

}