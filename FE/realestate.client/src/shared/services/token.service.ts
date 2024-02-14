import { jwtDecode } from "jwt-decode";
export class tokenService {
  static decode(token: string) {
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded JWT payload:", decoded);
      return decoded;
    } catch (error: any) {
      console.error("Error decoding JWT:", error.message);
    }
  }
}
