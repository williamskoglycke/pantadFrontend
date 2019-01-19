import { API_BASE_URL, ACCESS_TOKEN, GOOGLE_API_KEY2 } from "../constants";

const request = (options, isGoogle = false) => {
    if (!isGoogle) {
        const headers = new Headers({
            'Content-Type': 'application/json',
        })

        if (localStorage.getItem(ACCESS_TOKEN)) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        }

        const defaults = { headers: headers };
        options = Object.assign({}, defaults, options);
    } else {
        options = Object.assign({}, options);
    }

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function getAllPant() {
    return request({
        url: API_BASE_URL + "/pant/allPant",
        method: "GET"
    });
}

export function getSchoolPant() {
    return request({
        url: API_BASE_URL + "/pant/collectedPant",
        method: "GET"
    });
}

export function getUserPant() {
    return request({
        url: API_BASE_URL + "/pant/getUserPant",
        method: "GET"
    });
}

export function newPant(pantRequest) {
    return request({
        url: API_BASE_URL + "/pant/newPant",
        method: 'POST',
        body: JSON.stringify(pantRequest)
    });
}

export function getGpsFromAddress(address) {
    return request({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + GOOGLE_API_KEY2,
        method: 'GET'
    }, true);
}

export function doneCollecting(pantId) {
    return request({
        url: API_BASE_URL + "/pant/doneCollecting/" + pantId,
        method: 'GET'
    });
}

export function collectPant(pantId) {
    return request({
        url: API_BASE_URL + "/pant/collectedPant/" + pantId,
        method: 'GET'
    });
}

export function unCollectPant(pantId) {
    return request({
        url: API_BASE_URL + "/pant/unCollectPant/" + pantId,
        method: 'GET'
    });
}

export function deletePant(pantId) {
    return request({
        url: API_BASE_URL + "/pant/deletePant/" + pantId,
        method: 'GET'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function newSchoolclass(schoolRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/signupClass",
        method: 'POST',
        body: JSON.stringify(schoolRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/signupUser",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/api/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/api/user/me",
        method: 'GET'
    });
}

