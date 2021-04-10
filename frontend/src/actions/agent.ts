// Module for sending API requests
import send from '../requests/request';

// A function to send a GET request to the web server,
// and then loop through them and add a list element for each student
export const getAgent = (user:any, setAgent:any) => {

    send('getAgent', {}, `/${user.username}`)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get agent");
            }
        })
        .then(json => {
            setAgent(json);
        })
        .catch(error => {
            console.log(error);
            alert("Could not get agent");
        });
};

export const editAgent = (user:any, agent: any, setAgent: any, spec: any, setSpec: any) => {

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
        specialization: spec
    }

    // Send the request with fetch()
    send("updateAgent", formattedAgent, `/${user.username}`)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not edit client info");
            }
        })
        .then(function (json) {
            setAgent(json);
        })
        .catch(error => {
            console.log(error);
            alert("Could not edit client info");
        });
};
