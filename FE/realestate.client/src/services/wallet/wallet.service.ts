import axiosInstance from "@/shared/configs/axiosInstance";
import { HTTP_STATUS_CODE } from "@/shared/consts/http";
import { environment } from "@/shared/environment/environment";

export const walletInfo = async () => {
    try {
        const response = await axiosInstance.get(
            `${environment.baseUrl}/api/wallet/personal/wallet-info`
        );
        if (response.status === HTTP_STATUS_CODE.OK) {
            return response;
        }
    } catch (error) {
        console.log(error);
    }
};

interface IWalletTransaction {
    WalletId?: number;
    TransactionType?: number;
    pageSize?: number;
    pageNumber?: number;
    keyWord?: string;
}
export const getAllTransaction = async (info: IWalletTransaction) => {
    try {
        const response = await axiosInstance.get(
            `${environment.baseUrl}/api/wallet/get-all-transaction`, {
            params: {
                WalletId: info.WalletId,
                TransactionType: info.TransactionType,
                pageSize: info.pageSize,
                pageNumber: info.pageNumber,
                keyWord: info.keyWord
            }
        });
        if (response.status === HTTP_STATUS_CODE.OK) {
            return response;
        }
    } catch (error) {
        console.log("Gọi api lấy lịch sử giao dịch bị lỗi", error);
    }
};

export const createWallet = async (userId: any) => {
    try {
        const response = await axiosInstance.post(
            `${environment.baseUrl}/api/wallet/create?userId=${userId}`);
        if (response.status === HTTP_STATUS_CODE.OK) {
            return response;
        }
    } catch (error) {
        console.log("Gọi api tạo ví bị lỗi", error);
    }
};

interface IWalletRecharge {
    walletNumber: string;
    transactionAmount: number;
    transactionNumber: string;
    transactionFrom: string;
}
export const rechangeWallet = async (payload: IWalletRecharge) => {
    try {
        const response = await axiosInstance.post(
            `${environment.baseUrl}/api/wallet/recharge`, payload
        );
        if (response.status === HTTP_STATUS_CODE.OK) {
            return response?.data;
        }
    } catch (error) {
        console.log("Gọi api nạp tiền vào ví bị lỗi", error);
    }
};

interface IWalletWithdraw {
    walletNumber: string;
    transactionAmount: number;
    transactionTo: string;
};

export const withdrawWallet = async (payload: IWalletWithdraw) => {
    try {
        const response = await axiosInstance.post(
            `${environment.baseUrl}/api/wallet/withdraw`, payload
        );
        if (response.status === HTTP_STATUS_CODE.OK) {
            return response?.data;
        }
    } catch (error) {
        console.log("Gọi api rút tiền từ ví bị lỗi", error);
    }
};
