"use client";
import {
  getAllTransaction,
  rechangeWallet,
  walletInfo,
} from "@/services/wallet/wallet.service";
import { VNPAY_RESPONSE } from "@/shared/consts/vnpay.code";
import Flex from "antd/es/flex";
import Result from "antd/es/result";
import { Button } from "antd/lib";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PaymentCallbackPage = () => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(true);
  const [balance, setBalance] = useState(0);

  const searchParams = useSearchParams();
  const vnp_Amount = parseFloat(searchParams.get("vnp_Amount") || "0") / 100;
  const vnp_BankCode = searchParams.get("vnp_BankCode");
  const vnp_BankTranNo = searchParams.get("vnp_BankTranNo");
  const vnp_CardType = searchParams.get("vnp_CardType");
  const vnp_OrderInfo = searchParams.get("vnp_OrderInfo");
  const vnp_PayDate = searchParams.get("vnp_PayDate");
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
  const vnp_TmnCode = searchParams.get("vnp_TmnCode");
  const vnp_TransactionNo = searchParams.get("vnp_TransactionNo");
  const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");
  const vnp_TxnRef = searchParams.get("vnp_TxnRef");
  const vnp_SecureHash = searchParams.get("vnp_SecureHash");

  useEffect(() => {
    const fetchData = async () => {
      const wallet = await walletInfo();
      await setBalance(wallet?.data?.data?.balance);
      //const trans = await getAllTransaction({ WalletId: wallet?.data?.data?.walletId, pageSize: -1});
      if (vnp_ResponseCode === VNPAY_RESPONSE.Success && wallet) {
        const payload = {
          walletNumber: wallet?.data?.data?.walletNumber,
          transactionAmount: vnp_Amount,
          transactionNumber: vnp_TransactionNo || "", // Ensure transactionNumber is always a string
          transactionFrom: vnp_BankTranNo || "", // Ensure transactionFrom is always a string
        };
        const request = await rechangeWallet(payload);
        if (request?.code === 4004) {
          //   setIsSuccess(false);
        } else {
          setIsSuccess(true);
          await setBalance(balance + vnp_Amount);
        }
        // console.log("request", request);
      } else {
        setIsSuccess(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isSuccess ? (
        <Result
          status="success"
          title={
            "Giao dịch thành công " +
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "VND",
            }).format(vnp_Amount) +
            "VNĐ."
          }
          subTitle={
            "Giao dịch số: " +
            vnp_TransactionNo +
            " từ " +
            vnp_BankCode +
            " bằng " +
            vnp_CardType +
            " thành công, cảm ơn quý bạn." +
            " Số dư hiện tại: " +
            <br /> +
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "VND",
            }).format(balance) +
            "VNĐ."
          }
          extra={[
            <Button key="console">Trở về</Button>,
            <Button type="primary" key="buy">
              Nạp thêm
            </Button>,
          ]}
        ></Result>
      ) : (
        <Result
          status="error"
          title="Giao dịch thất bại!"
          subTitle={
            "Giao dịch số: " +
            vnp_TransactionNo +
            " từ " +
            vnp_BankCode +
            " bằng " +
            vnp_CardType +
            " thất bại, vui lòng thử lại."
          }
          extra={[
            <Button
              key="console"
              onClick={() => {
                router.replace("/wallet/history");
              }}
            >
              Trở về
            </Button>,
            <Button
              type="primary"
              key="buy"
              onClick={() => {
                router.replace("/wallet/recharge");
              }}
            >
              Nạp lại
            </Button>,
          ]}
        ></Result>
      )}
    </div>
  );
};

export default PaymentCallbackPage;
