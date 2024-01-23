import axios from "axios"
import { environment } from "../environment/environment"

const token = localStorage.getItem("access_token");
const instance = axios.create({
    baseURL: environment.baseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
      },
})