import { initLogin } from './login.js'
//import { initReg } from './registration.js'
//import { initOrders } from './orders.js'
//import { initPurch } from './purchase.js'
import { initMain } from "./main.js"
import { initItem } from "./item.js"

export class PageLoader {

    static endpoints = {
        login: initLogin,
        registration: null,
        profile: null,
        item: initItem,
        cart: null,
        orders: null,
        order: null,
        purchase: null
    }

    static async loadPage(url, query) {
        //TODO change history in other files
        history.replaceState(null, '', url + query);
        this.#changeAuthInHeader(window.localStorage.getItem('userEmail'))
        $("main").empty();
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
        }
        else {
            $("#enter").removeClass("d-none");
            $("#user-login").addClass("d-none");
            $("#exit").addClass("d-none");
            $("#register").removeClass("d-none");
        }
    }

}

export function SetLinkListeners() {
    var links = $("a");
    for (const link of links) {
        link.addEventListener("click", async (e) => {
            e.preventDefault();
            var url = await $(e.target).attr("href");
            var full = new URL(location.origin + url);
            PageLoader.loadPage(full.pathname, full.search);
        });

    }
}