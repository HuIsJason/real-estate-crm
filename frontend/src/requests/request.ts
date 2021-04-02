import endpoints from './endpoints'; 

const SERVER = 'http://localhost:5000'; // <-- Replace with main server URL path

interface Request {
    method: string,
    headers: { Accept: string, 'Content-Type': string },
    body?: string
}
export default function send(requestType: string, data:any = {}, extra_url: string | null = null) {
    const endpoint = endpoints.filter(e => e.name === requestType)[0];
    
    if (endpoint) {
        // endpoint exists
        let path = SERVER + endpoint.endpoint;
        if (extra_url !== null) {
            path = path + extra_url;
        }
    

        const options: Request = {
            method: endpoint.method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }

        if (endpoint.method !== 'GET') {
            options.body = JSON.stringify(data);
        }

        return fetch(path, options);

    } else {
        return Promise.resolve(new Response());
    }
}