import axios from "axios";

export const getProvinces = async () => {
    try {
        const response = await axios.get("https://vietnamese-administration.vercel.app/city");
        return response;
    }
    catch(error) {
        console.log("api get provinces error.");
        return null;
    }
}

export const getDistricts = async () => {
    try {
        const response = await axios.get(`https://vietnamese-administration.vercel.app/district`);
        return response;
    }
    catch(error) {
        console.log("api get districs error.");
        return null;
    }
}

export const getWards = async () => {
    try {
        const response = await axios.get(`https://vietnamese-administration.vercel.app/ward`);
        return response;
    }
    catch(error) {
        console.log("api get districs error.");
        return null;
    }
}