import axios from "axios";

export const axiosWithAuth = () => {
    const token = localStorage.getItem("authToken");
    // console.log("local storage",localStorage)

    return axios.create({
        baseURL: "https://reqres.in/api/login",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};


export const axiosWithAuth1 = () => {
    const token = localStorage.getItem("authToken");
    // console.log("local storage",localStorage)

    return axios.create({
        baseURL: "https://reqres.in/api/auth/register",
        headers: {
            Authorization: `Bearer1 ${token}`
        }
    });
};


export const axiosWithAuth2 = () => {
    const token = localStorage.getItem("authToken");
    // console.log("local storage",localStorage)

    return axios({
        get: "https://reqres.in/api/auth/plants",
        then: {
            Authorization: `Bearer2 ${token}`
        }
    });
};




// https://wet-my-plants.herokuapp.com/auth/login

//      /auth/register