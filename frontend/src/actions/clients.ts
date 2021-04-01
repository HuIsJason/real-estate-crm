// environment configutations
import ENV from './../config'
const API_HOST = ENV.api_host

// A function to send a GET request to the web server,
// and then loop through them and add a list element for each student
export const getClientsList = (setRows:any, user:any) => {
    // the URL for the request
    const url = `${API_HOST}/api/clients/507f191e810c19729de860ea` // + user?.id; add this back after jason fixes context
    
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
            setRows(json.clients);
        })
        .catch(error => {
            console.log(error);
        });
};

// // A function to update the student form state
// export const updateStudentForm = (formComp, field) => {
//     const value = field.value;
//     const name = field.name;

//     formComp.setState({
//         [name]: value
//     });
// };

// A function to send a POST request with a new student
export const addClient = (nameField: any, emailField: any, tagField: any, rows: any, setRows: any) => {
    // the URL for the request
    const url = `${API_HOST}/api/clients/507f191e810c19729de860ea`;

    const name = nameField.split(" ");
    // The data we are going to send in our request
    const client = {
        firstName: name[0],
        lastName: name[1],
        email: emailField,
        tags: tagField
    }

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(client),
        headers: {
            Accept: "application/json, text/plain, */*",
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
                alert("Could not get clients");
            }
        })
        .then(function (json) {
            setRows([...rows, json]);
        })
        .catch(error => {
            console.log(error);
        });
};

export const deleteClient = (clientId: any, rows: any, setRows: any) => {
    // the URL for the request
    const url = `${API_HOST}/api/clients/507f191e810c19729de860ea/` + clientId;

    const request = new Request(url, {
        method: "delete"
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 204) {
                const newRows = rows.filter((row:any) => {
                    return row.id !== clientId
                });

                console.log("Hello");
                
                setRows(newRows);
            } else {
                alert("Could not delete client");
            }
        })
        .catch(error => {
            console.log(error);
        });
};