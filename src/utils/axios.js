import axios from "axios";

const instance = axios.create({
    baseURL: "http://13.234.67.131:3000"
});

export default instance;