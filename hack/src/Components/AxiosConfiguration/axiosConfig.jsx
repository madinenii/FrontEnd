import axios from "axios";

const instance= axios.create(
    {
        baseUrl : "http://localhost:8080",
        timeout : 10000,
        withCredentials: true
    },
)

export default instance;