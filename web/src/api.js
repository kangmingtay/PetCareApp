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

    getPet: (pname) => `${BASE_URL}/pets/${pname}`,
    createPet: (username) => `${BASE_URL}/pets/${username}`,
    updatePet: (pname, pet_name) => `${BASE_URL}/pets/${pname}/${pet_name}`,
    deletePet: (pname, petname) => `${BASE_URL}/pets/${pname}/${petname}`
}