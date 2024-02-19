import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
// import { Cookie } from "cookies";
// import Cookies from 'cookies'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const token = cookies.get("access_token");
    const cookie = req.headers.cookie;
    // const access_token = cookie?.access_token
    const cookieTransfomed = transformCookies(cookie);
    console.log("cookies",cookieTransfomed)
    res.status(200).json(cookieTransfomed.access_token);
}

function transformCookies(input: any){
    const pairs = input.split('; ');
    const result:any = {};
    for (const pair of pairs) {
        // Tách cặp key-value bằng dấu bằng
        const [key, value] = pair.split('=');
    
        // Loại bỏ các khoảng trắng thừa ở đầu và cuối value
        const trimmedValue = value.trim();
        console.log({
            key, value
        })
        // Gán key và value vào đối tượng
        result[key] = trimmedValue;
    }
    return result;
    
}