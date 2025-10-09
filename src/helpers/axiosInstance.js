import axios from "axios";

const { REACT_APP_API_URL, REACT_APP_DEFAULT_HEADER, REACT_APP_HEADER_KEY } = process.env;

if (REACT_APP_DEFAULT_HEADER && REACT_APP_HEADER_KEY) {
    axios.defaults.headers.common[REACT_APP_DEFAULT_HEADER] = REACT_APP_HEADER_KEY;
}

const axiosInstance = axios.create({
    baseURL: REACT_APP_API_URL
})

const axiosInstanceHeader = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosInstanceHeader.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export { axiosInstance, axiosInstanceHeader };