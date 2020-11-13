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
    getAllCareTakerPreferences: `${BASE_URL}/caretakers/prefers`,
    getCareTakerPreference: (username) => `${BASE_URL}/caretakers/prefers/${username}`,
    deleteCareTakerPreference: (username) => `${BASE_URL}/caretakers/prefers/${username}`,
    createCareTakerPreference: (username) => `${BASE_URL}/caretakers/prefers/${username}`,
    updateCareTakerPreference: (username) => `${BASE_URL}/caretakers/prefers/${username}`,
    insertLeavesAvailability: (username) => `${BASE_URL}/caretakers/requestDays/${username}`,
    getLeaves: (username) => `${BASE_URL}/caretakers/leaves/${username}`,
    getAvailability: (username) => `${BASE_URL}/caretakers/availability/${username}`,
    deleteLeavesAvailability: (username) => `${BASE_URL}/caretakers/requestDays/${username}`,
    getRating: (username) => `${BASE_URL}/caretakers/rating/${username}`,
    getListOfValidCareTakers: `${BASE_URL}/catalogue/`,
    getPet: (pname) => `${BASE_URL}/pets/${pname}`,
    createPet: (username) => `${BASE_URL}/pets/${username}`,
    updatePet: (pname, pet_name) => `${BASE_URL}/pets/${pname}/${pet_name}`,
    deletePet: (pname, petname) => `${BASE_URL}/pets/${pname}/${petname}`,
    getPetCategories: `${BASE_URL}/pets/categories/pet`,
    getPetBids: (pname, petname) => `${BASE_URL}/pets/${pname}/${petname}`,
    getCareTakerBids: (username) => `${BASE_URL}/bids/caretakers/${username}`,
    updateCareTakerBid: (username) => `${BASE_URL}/caretakers/selectbid/${username}`,
    getPetsForDateRange: (username) => `${BASE_URL}/catalogue/${username}`,
    insertBid: (username) => `${BASE_URL}/catalogue/${username}`,
    getAllDays: `${BASE_URL}/admin/alldays/`,
    getPetDays: `${BASE_URL}/admin/petdays/`,
    getPets: `${BASE_URL}/admin/pets/`,
    getRevenue: `${BASE_URL}/admin/revenue/`,
    getRating: `${BASE_URL}/admin/rating/`,
    getCaretakers: `${BASE_URL}/admin/caretakers/`,
    getCaredFor: `${BASE_URL}/admin/caredfor/`,
    updateReviewAndRating: (username) => `${BASE_URL}/review/${username}`,
    getReviewAndRating: (username) => `${BASE_URL}/review/${username}`,
}
