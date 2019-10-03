import config from "../../config";

const list = () => {
    return fetch(config.apiService + 'calendar', {
        method:'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization':'Bearer'+config.token
        }
    }).then(response => { return response.json()
    }).catch(reason => console.log(reason))
}

const getOne = (id) => {
    return fetch(config.apiService + 'calendar/'+id, {
        method:'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization':'Bearer'+config.token
        }
    }).then(response => { return response.json()
    }).catch(reason => console.log(reason))
}

const post = (data) => {
    return fetch(config.apiService + 'calendar', {
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

const update = (id, data) => {
    return fetch(config.apiService + 'calendar/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + config.token
        },
        body: JSON.stringify(data)
    }).then((response) => {
        console.log(response);
        return response.json()
    }).catch((err) => console.log(err))
}
export { list, getOne, post, update}
