// environment configutations
import ENV from './../config'

const API_HOST = ENV.api_host


// A function to send a GET request to the web server,
// and then loop through them and add a list element for each student
export const getAgent = (user:any, setAgent:any) => {

    // the URL for the request
    const url = `${API_HOST}/api/agent/` + user?.username;
    
    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get agent");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body

            setAgent({
                name: (json.firstName ? json.firstName + " " + json.lastName : "Not available"),
                phone: (json.phone ? json.phone : "Not available"),
                email: (json.email ? json.email : "Not available"),
                bio: (json.bio ? json.bio : "Not available"),
                history: (json.yearStarted ? json.yearStarted : "Not available"),
                company: (json.brokerage ? json.brokerage : "Not available"),
                city: (json.brokerageAddress ? json.brokerageAddress : "Not available"),
                specialization: (json.specialization ? json.specialization : "Not available")
            })
        })
        .catch(error => {
            console.log(error);
        });
};

export const editAgent = (user:any, agent: any, setAgent: any) => {

    // the URL for the request
    const url = `${API_HOST}/api/agent/` + user?.username;

    const name = agent.name.split(" ");
    // The data we are going to send in our request
    const formattedAgent = {
        firstName: name[0],
        lastName: (name.length === 2 ? name[1] : ""),
        email: agent.email,
        phone: agent.phone,
        bio: agent.bio,
        brokerage: agent.company,
        yearStarted: agent.history,
        brokerageAddress: agent.city,
        specialization: agent.specialization,
    }

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "put",
        body: JSON.stringify(formattedAgent),
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
            setAgent({
                name: (json.firstName ? json.firstName + " " + json.lastName : "Not available"),
                phone: (json.phone ? json.phone : "Not available"),
                email: (json.email ? json.email : "Not available"),
                bio: (json.bio ? json.bio : "Not available"),
                history: (json.yearStarted ? json.yearStarted : "Not available"),
                company: (json.brokerage ? json.brokerage : "Not available"),
                city: (json.brokerageAddress ? json.brokerageAddress : "Not available"),
                specialization: (json.specialization ? json.specialization : "Not available")
            })
        })
        .catch(error => {
            console.log(error);
        });
};