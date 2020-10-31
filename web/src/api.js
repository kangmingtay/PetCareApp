const BASE_URL = process.env.REACT_APP_API || "http://localhost:8888";

export default {
    baseUrl: BASE_URL,
    getAllUsers: `${BASE_URL}/api/users`,
    getLoginInfo: `${BASE_URL}/api/login`,
    createUser: `${BASE_URL}/api/users`,
}