import config from "../../config";

const list = () => {
    return fetch(config.apiService + 'customers', {
        method:'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization':'Bearer'+config.token
        }
    }).then(response => { return response.json()
    }).catch(reason => console.log(reason))
}

const read = (id) => {
    return fetch(config.apiService + 'customers/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + config.token
        }
    }).then((response) => {
        return response.json()
    }).catch((err) => console.log(err))
}

const update = (id, data) => {
    return fetch(config.apiService + 'customers/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + config.token
        },
        body: JSON.stringify(data)
    }).then((response) => {
        return response.json()
    }).catch((err) => console.log(err))
}

const post = (data) => {
    return fetch(config.apiService + 'customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + config.token
        },
        body: JSON.stringify(data)
    }).then((response) => {
        return response.json()
    }).catch((err) => console.log(err))
}
export { list,read, update, post }
