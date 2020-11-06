const BASE_URL = process.env.REACT_APP_API || "http://localhost:8888/api";

export default {
    baseUrl: BASE_URL,
    getAllUsers: `${BASE_URL}/users`,
    getLoginInfo: `${BASE_URL}/login`,
    createUser: `${BASE_URL}/users`,
    updateUser: (username) => `${BASE_URL}/users/${username}`,
    getUser: (username) => `${BASE_URL}/users/${username}`,
    deleteUser: (username) => `${BASE_URL}/users/${username}`,
    checkUserType: (username) => `${BASE_URL}/users/type/${username}`,
    createFullTimer: `${BASE_URL}/fulltimers`,
    createPartTimer: `${BASE_URL}/parttimers`,
    getExpectedSalary: (username) => `${BASE_URL}/caretakers/expectedSalary/${username}`,
    getCareTakerCalendar: (username) => `${BASE_URL}/caretakers/calendar/${username}`,
    getCareTakerPreference: (username) => `${BASE_URL}/caretakers/prefers/${username}`,
    deleteCareTakerPreference: (username) => `${BASE_URL}/caretakers/prefers/${username}`,
    createCareTakerPreference: (username) => `${BASE_URL}/caretakers/prefers/${username}`,
    updateCareTakerPreference: (username) => `${BASE_URL}/caretakers/prefers/${username}`,
    upsertLeavesAvailability: (username) => `${BASE_URL}/caretakers/requestDays/${username}`,
    getLeaves: (username) => `${BASE_URL}/caretakers/requestDays/${username}`,
    getAvailability: (username) => `${BASE_URL}/caretakers/requestDays/${username}`,
    getListOfValidCareTakers: `${BASE_URL}/catalogue/`,
    getCareTakerBids: (username) => `${BASE_URL}/bids/caretakers/${username}`,
    updateCareTakerBid: (username) => `${BASE_URL}/caretakers/selectbid/${username}`,
    getPetsForDateRange: (username) => `${BASE_URL}/catalogue/${username}`,
    insertBid: (username) => `${BASE_URL}/catalogue/${username}`,
}