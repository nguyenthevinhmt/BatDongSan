"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Flex } from "antd";
interface VnpayResponseType {
  vnp_Amount: string | null;
  vnp_BankCode: string | null;
  vnp_BankTranNo: string | null;
  vnp_CardType: string | null;
  vnp_OrderInfo: string | null;
  vnp_PayDate: string | null;
  vnp_ResponseCode: string | null;
  vnp_TmnCode: string | null;
  vnp_TransactionNo: string | null;
  vnp_TransactionStatus: string | null;
  vnp_TxnRef: string | null;
}

const VnpayResult = () => {
  const searchParams = useSearchParams();
  const params: VnpayResponseType = {
    vnp_Amount: (searchParams as any)?.get("vnp_Amount"),
    vnp_BankCode: (searchParams as any)?.get("vnp_BankCode"),
    vnp_BankTranNo: (searchParams as any)?.get("vnp_BankTranNo"),
    vnp_CardType: (searchParams as any)?.get("vnp_CardType"),
    vnp_OrderInfo: (searchParams as any)?.get("vnp_OrderInfo"),
    vnp_PayDate: (searchParams as any)?.get("vnp_PayDate"),
    vnp_ResponseCode: (searchParams as any)?.get("vnp_ResponseCode"),
    vnp_TmnCode: (searchParams as any)?.get("vnp_TmnCode"),
    vnp_TransactionNo: (searchParams as any)?.get("vnp_TransactionNo"),
    vnp_TransactionStatus: (searchParams as any)?.get("vnp_TransactionStatus"),
    vnp_TxnRef: (searchParams as any)?.get("vnp_TxnRef"),
  };
  return (
    <Flex vertical>
      {/* <Image src="http://localhost:3000/assets/image/success-icon.png" alt="#" width={30} height={30} /> */}
      <h2>Giao dịch thành công</h2>
      <h3>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi</h3>
      <>Số tiền giao dịch: {Number(params.vnp_Amount) / 100}</>
      <br />
      <>Mã giao dịch: {params.vnp_TransactionNo}</>
    </Flex>
  );
};

export default VnpayResult;
