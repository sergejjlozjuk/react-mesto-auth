const baseURL = 'https://auth.nomoreparties.co';

function regisration (data) {
return fetch(`${baseURL}/signup`, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        password: data.password,
        email: data.email
    })
})
}
function authorization (data) {
    return fetch(`${baseURL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password: data.password,
            email: data.email
        })
    })
}


function checkToken (token) {
    return fetch(`${baseURL}/users/me`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
}

export {regisration, authorization, checkToken}