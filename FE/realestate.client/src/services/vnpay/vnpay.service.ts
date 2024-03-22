import axiosInstance from "@/shared/configs/axiosInstance";
import { HTTP_STATUS_CODE } from "@/shared/consts/http";
import { environment } from "@/shared/environment/environment";

interface IPayload {
    walletNumber: string;
    transactionAmount: number;
    bankCode: string;
}

export const createPayment = async (payload: IPayload) => {
    try {
        const response = await axiosInstance.post(
            `${environment.baseUrl}/api/vnpay/payment-vn-pay`, payload
        );
        if (response.status === HTTP_STATUS_CODE.OK)
            return response;
    } catch (error) {
        console.log("Gọi api tạo payment thông qua vnpay bị lỗi", error);
    }
}