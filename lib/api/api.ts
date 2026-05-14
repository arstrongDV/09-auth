import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api'
export const nextServer = axios.create({
    baseURL: baseURL,
    withCredentials: true
    // headers: {
    //     'Content-Type': 'application/json',
    //     "Authorization": `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
    // }
})