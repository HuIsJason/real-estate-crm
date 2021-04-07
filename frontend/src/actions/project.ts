// environment configutations
import ENV from './../config'
const API_HOST = ENV.api_host

interface Request {
    method: string,
    headers: { Accept: string, 'Content-Type': string },
    body?: string
}

export const getProject = (projectId:any, clientId:any, setDescription:any, setTags:any, tags:any, setActive:any) => {
    // the URL for the request
    const url = `${API_HOST}/api/projects/`+clientId+"/"+projectId 
    
    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get project information");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body

            setDescription(json.description ? json.description : "Not available");
            setTags(json.tags ? json.tags : [""]);
            (json.status === "active" ? setActive(true) : setActive(false))
        })
        .catch(error => {
            console.log(error);
        });
};

export const editProject = ({projectId, clientId, changedField, change, setActive, setDescription, setTags, tags}:any) => {
    // the URL for the request
    const url = `${API_HOST}/api/projects/`+clientId+"/"+projectId 

    // The data we are going to send in our request
    const formattedChange = [{
        op: "update",
        field: changedField,
        value: changedField === "tags" ? [...tags, change] : change
    }]

    if (changedField === "status") {
        if (change === true) {
            formattedChange[0].value = "active"
        } else {
            formattedChange[0].value = "closed"
        }
    }

    // Create our request constructor with all the parameters we need
    const request: Request = {
        method: "PATCH",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }

    request.body = JSON.stringify(formattedChange);


    // Send the request with fetch()
    fetch(url, request)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not edit project info");
            }
        })
        .then(function (json) {
            setDescription(json.description);
            setTags(json.tags);
            (json.status === "active" ? setActive(true) : setActive(false))
        })
        .catch(error => {
            console.log(error);
        });
};
