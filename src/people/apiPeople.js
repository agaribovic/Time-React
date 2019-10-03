import config from "../../config";

const list = () => {
    return fetch(config.apiService + 'people', {
        method:'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization':'Bearer'+config.token
        }
    }).then(response => { return response.json()
    }).catch(reason => console.log(reason))
}

const read = (id) => {
    return fetch(config.apiService + 'people/' + id, {
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
    return fetch(config.apiService + 'people/' + id, {
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
const update2 = (id, data) => {
    return fetch(config.apiService + 'peoplep/' + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + config.token
        },
        body: data
    }).then((response) => {
        return response.json()
    }).catch((err) => console.log(err))
}

const post = (data) => {
    return fetch(config.apiService + 'people', {
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

export { list , read, update, update2, post}
