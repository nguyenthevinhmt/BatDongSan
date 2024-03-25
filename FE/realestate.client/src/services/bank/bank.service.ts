import axiosInstance from "@/shared/configs/axiosInstance";
import { HTTP_STATUS_CODE } from "@/shared/consts/http";
import { environment } from "@/shared/environment/environment";

interface IBank {
    bankName: string;
    bankCode: string;
    ownerBankFullname: string;
    releaseDate: Date;
};

export const createBank = async (bank: IBank) => {
    try {
        const response = await axiosInstance.post(`${environment.baseUrl}/api/bank-account/create`, bank);
        if (response.status === HTTP_STATUS_CODE.OK) {
            return response;
        }
    } catch (error) {
        console.log("gọi api thêm tài khoản ngân hàng bị lỗi.", error);
        return error;
    }
};

interface ISearch {
    pageSize?: number;
    pageNumber?: number;
    keyWord?: string;
};

export const getAllBank = async (search: ISearch) => {
    try {
        const response = await axiosInstance.get(`${environment.baseUrl}/api/bank-account/find-all`, { params: search });
        if (response.status === HTTP_STATUS_CODE.OK) {
            return response.data;
        }
    } catch (error) {
        console.log("gọi api lấy danh sách tài khoản ngân hàng bị lỗi.", error);
        return error;
    }
};

export const removeBank = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`${environment.baseUrl}/api/bank-account/remove?id=${id}`);
        if (response.status === HTTP_STATUS_CODE.OK) {
            return response;
        }
    } catch (error) {
        console.log("gọi api xóa tài khoản ngân hàng bị lỗi.", error);
        return error;
    }
};
