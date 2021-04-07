// environment configutations
import ENV from './../config'
const API_HOST = ENV.api_host

// A function to send a GET request to the web server,
// and then loop through them and add a list element for each student
export const getClient = (clientId:any, setClient:any, user:any) => {
    // the URL for the request
    const url = `${API_HOST}/api/clients/`+user?.MongoId+"/"+clientId // + user?.id; add this back after jason fixes context
    
    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get clients");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body

            setClient({
                name: (json.firstName ? json.firstName + " " + json.lastName : "Not available"),
                phone: (json.phoneNumber ? json.phoneNumber : "Not available"),
                email: (json.email ? json.email : "Not available"),
                address: (json.address ? json.address : "Not available")
            })
        })
        .catch(error => {
            console.log(error);
        });
};

export const editClient = (clientId: any, client: any, setClient: any, user:any) => {
    // the URL for the request
    const url = `${API_HOST}/api/clients/`+user?.MongoId+"/"+clientId

    const name = client.name.split(" ");
    // The data we are going to send in our request
    const formattedClient = {
        firstName: name[0],
        lastName: (name.length === 2 ? name[1] : ""),
        email: client.email,
        phoneNumber: client.phone,
        address: client.address
    }

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "put",
        body: JSON.stringify(formattedClient),
        headers: {
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not edit client info");
            }
        })
        .then(function (json) {
            setClient({
                name: (json.firstName ? json.firstName + " " + json.lastName : "Not available"),
                phone: (json.phoneNumber ? json.phoneNumber : "Not available"),
                email: (json.email ? json.email : "Not available"),
                address: (json.address ? json.address : "Not available")
            })
        })
        .catch(error => {
            console.log(error);
        });
};
