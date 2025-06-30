import axios from "axios";

const aiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

class ApiClient<T> {
    endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = () => {
        return aiosInstance.get<T[]>(this.endpoint)
            .then(res => res.data);
    }

    post = (data: T) => {
        return aiosInstance.post<T>(this.endpoint, data)
            .then(res => res.data);
    }
}

export default ApiClient;