let postRequest = (url, data, callback) => {
    let opts = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data),
        // credentials: "include"
    };
    // console.log(opts)
    fetch(url, opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

export {postRequest};

let getRequest = (url,callback) => {
    let opts = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "GET",
    };
    fetch(url, opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};
export {getRequest}
let getRequest_v2 = async (url) => {
    let opts = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "GET",
    };
    return await fetch(url, opts)
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            console.log(error);
        });
};

export {getRequest_v2}


let putRequest = (url, data, callback) => {
    let opts = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(data),
        // credentials: "include"
    };
    // console.log(opts)
    fetch(url, opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

export {putRequest};

let deleteRequest = (url,callback) => {
    let opts = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "DELETE",
    };
    fetch(url, opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

export {deleteRequest}