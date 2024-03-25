"use client";
import isAuth from '@/app/isAuth';
import { getAllTransaction, walletInfo } from '@/services/wallet/wallet.service';
import { UserType } from '@/shared/consts/userType';
import Button from 'antd/es/button';
import Flex from 'antd/es/flex';
import Form from 'antd/es/form';
import List from 'antd/es/list';
import Select from 'antd/es/select';
import Table from 'antd/es/table';
import { TableColumnsType } from 'antd';
import React, {
  useEffect,
  useState
} from 'react';
import WalletOutlined from '@ant-design/icons/WalletOutlined';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';


interface ITransaction {
  id: number;
  walletID: number;
  amount: number;
  transactionNumber: string;
  transactionType: number;
  transactionFrom: string;
  transactionTo: string;
  description: string;
  createDate: Date;
};

interface IWalletTransaction {
  WalletId: number;
  TransactionType: number;
  pageSize: number;
  pageNumber: number;
  keyWord: string;
};

interface IWallet {
  id: number;
  walletNumber: string;
  balance: number;
  userId: number;
  userName: string;
}

const transactionType = [
  {
    value: 1,
    label: "Nạp tiền",
  },
  {
    value: 2,
    label: "Rút tiền",
  }
]

const WalletHistoryPage = () => {
  // Add your component logic here
  const [form] = Form.useForm<any>();
  const [listTransaction, setListTransaction] = useState<ITransaction[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [change, setChange] = useState(false);
  const [wallet, setWallet] = useState<IWallet>();

  useEffect(() => {
    const fetchData = async () => {
      //lấy id ví ứng với người dùng hiện tại
      const walletResponse = await walletInfo();

      setWallet({
        id: walletResponse?.data.data.id,
        walletNumber: walletResponse?.data.data.walletNumber,
        balance: walletResponse?.data.data.balance,
        userId: walletResponse?.data.data.userId,
        userName: walletResponse?.data.data.userName
      });
      console.log("wallet", wallet);

      //lấy thông tin giao dịch
      if (walletResponse?.data.data.id) {
        const res = await getAllTransaction({ WalletId: walletResponse?.data.data.id, pageSize: 10, pageNumber: 1 });
        const data = res?.data.data.items;
        const transactions: ITransaction[] = data?.map((trans: any) => (
          {
            id: trans.id,
            walletId: trans.walletID,
            amount: trans.amount,
            transactionNumber: trans.transactionNumber,
            description: trans.description,
            transactionType: trans.transactionType,
            transactionFrom: trans.transactionFrom,
            transactionTo: trans.transactionTo,
            createDate: trans.createDate
          }
        ));

        setListTransaction(transactions);
        setTotalItems(res?.data.data.totalItems);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [change]);

  const columns: TableColumnsType<ITransaction> = [
    {
      title: "#ID",
      width: 30,
      dataIndex: "id",
      key: "id",
      fixed: "left",
    },
    {
      title: "Số tiền",
      width: 70,
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(amount),
    },
    {
      title: "Mã giao dịch",
      width: 100,
      dataIndex: "transactionNumber",
      key: "transactionNumber",
    },
    {
      title: "Loại giao dịch",
      width: 70,
      dataIndex: "transactionType",
      key: "transactionType",
      render: (transType: number) => {
        const transactionTypeItem = transactionType.find(
          (item: any) => item.value === transType
        );
        return transactionTypeItem ? transactionTypeItem.label : "";
      },
    },
    {
      title: "Giao dịch từ",
      width: 70,
      dataIndex: "transactionFrom",
      key: "transactionFrom",
    },
    {
      title: "Giao dịch đến",
      width: 100,
      dataIndex: "transactionTo",
      key: "transactionTo",
    },
    {
      title: "Thời gian giao dịch",
      width: 100,
      dataIndex: "createDate",
      key: "createDate",
      render: (createDate: Date) => dayjs(createDate).format('HH:mm DD/MM/YYYY')
    },
  ];

  const handleSearch = async (pageNumber?: number, pageSize?: number) => {
    if (wallet?.id) {
      const values = form.getFieldsValue();
      const res = await getAllTransaction({
        WalletId: wallet.id,
        TransactionType: values.transactionType,
        pageSize: pageSize || -1,
        pageNumber: pageNumber || 1,
        keyWord: "",
      });

      const data = res?.data.data.items;
      const transactions: ITransaction[] = data?.map((trans: any) => (
        {
          id: trans.id,
          walletId: trans.walletID,
          amount: trans.amount,
          description: trans.description,
          transactionNumber: trans.transactionNumber,
          transactionType: trans.transactionType,
          transactionFrom: trans.transactionFrom,
          transactionTo: trans.transactionTo,
          createDate: trans.createDate
        }
      ));

      setListTransaction(transactions);
      setTotalItems(res?.data.data.totalItems);
    } else {
      console.log("wallet is null");
    }
  };


  return (
    <Flex
      justify='space-between'
      gap='small'
      style={{
        borderRadius: 8,
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      }}
    >

      <Flex justify="center" gap="small" vertical style={{ width: '100%' }}>
        <div
          style={{
            width: "100%",
            margin: "auto",
            padding: 20,
            backgroundColor: "#fff",
            borderRadius: 8,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <p
            style={{
              fontSize: 24,
              fontWeight: "500",
              marginBottom: 5,
            }}
          >
            Lịch sử giao dịch
          </p>
          <Form
            form={form}
            layout="horizontal"
            autoComplete="off"
            onFinish={handleSearch}
          >
            <Flex justify="flex-start" align="flex-end">
              <Form.Item
                name="transactionType"
                label={<strong>Loại giao dịch</strong>}
                style={{ marginRight: 10 }}
              >
                <Select
                  allowClear={true}
                  placeholder="Tất cả"
                  options={transactionType}
                  onChange={() => setChange(!change)}
                />
              </Form.Item>
            </Flex>
          </Form>

          <div>
            <Table
              // style={{
              //   maxHeight: '300px',
              // }}
              columns={columns}
              pagination={{
                position: ["none", "bottomCenter"],
                pageSize: pageSize,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "30", "40"],
                total: totalItems,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`, // Show total number of records and current display range
                itemRender: (current, type, originalElement) => {
                  if (type === "prev") {
                    return <a>Previous</a>;
                  }
                  if (type === "next") {
                    return <a>Next</a>;
                  }
                  return originalElement;
                },
                onChange: (pageNumber, pageSize) => {
                  setPageNumber(pageNumber);
                  setPageSize(pageSize);
                  handleSearch(pageNumber, pageSize);
                },
              }}
              dataSource={listTransaction}
              scroll={{ x: window.innerWidth * 0.7 }}
            />
          </div>
        </div>
      </Flex>
    </Flex>
  );
};

export default isAuth(WalletHistoryPage, [UserType.ADMIN, UserType.CUSTOMER]);