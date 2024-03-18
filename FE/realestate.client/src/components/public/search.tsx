import { getDistricts, getProvinces } from "@/services/post/address.service";
import { getRealEstateType } from "@/services/post/post.service";
import {
  Button,
  Cascader,
  Flex,
  Form,
  Input,
  Select,
  Tabs,
} from "antd";
import React, { useEffect, useState } from "react";

interface Option {
  value: string | number;
  label: string;
}

const SearchComponent = () => {
  const [formData, setFormData] = useState({
    postType: 1,
    inputSearch: "",
    realEstateType: null,
    region: null,
    price: null,
    area: null

  });
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [realEstateType, setRealEstateType] = useState<any>();

  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await getProvinces();
      await setProvinces(response?.data);
    };
    fetchProvinces();
    const fetchRealEstateType = async () => {
      const response = await getRealEstateType();
      await setRealEstateType(response?.data?.items);
    };
    fetchRealEstateType();
  }, []);
  const handleSubmit = () => {
    console.log("submit", formData);
  };

  let prices = [
    {
      value: 0,
      label: "Thỏa thuận"
    },
    {
      value: 1 * Math.pow(10, 9),
      label: "<= 1 Tỷ"
    },
  ]
  for (let i = 2; i < 20; i++) {
    prices.push({
      value: i * Math.pow(10, 9),
      label: `${i} - ${i + 1} tỷ`
    })
  }
  prices.push({
    value: 21 * Math.pow(10, 9),
    label: `>= 20 tỷ`
  })
  const tabs = [
    {
      key: "1",
      label: "Mua bán",
    },
    {
      key: "2",
      label: "Cho thuê",
    },
  ];

  const areas = [
    {
      value: 20,
      label: "<= 20 m²"
    },
    {
      value: 30,
      label: "20 - 30 m²"
    },
    {
      value: 40,
      label: "30 - 40 m²"
    },
    {
      value: 50,
      label: "40 - 50 m²"
    },
    {
      value: 60,
      label: "50 - 60 m²"
    },
    {
      value: 70,
      label: "60 - 70 m²"
    },
    {
      value: 80,
      label: "70 - 80 m²"
    },
    {
      value: 90,
      label: "80 - 90 m²"
    },
    {
      value: 100,
      label: "90 - 100 m²"
    },
    {
      value: 110,
      label: "> 100 m²"
    },
  ]

  const cascaderOptions = [
    {
      label: 'Tỉnh/Thành phố',
      value: 'province',
      children: provinces.map((province: any) => ({
        label: province?.name,
        value: province?.id,
      })),
    },
    {
      label: 'Quận/Huyện',
      value: 'district',
      children: districts?.map((district: any) => ({
        label: district?.name,
        value: district?.id,
      })),
      disabled: !selectedProvince,
    },
    {
      label: 'Phường/Xã',
      value: 'ward',
      children: wards.map((ward: any) => ({
        label: ward?.name,
        value: ward?.id,
      })),
      disabled: !selectedDistrict,
    },
  ];

  return (
    <Form onFinish={handleSubmit}>
      <Flex
        vertical
        style={{
          margin: "20px auto",
          padding: "16px",
          width: "100%",
          borderRadius: "10px",
          backgroundColor: "#ddd",
        }}
      >
        <Tabs
          tabBarGutter={20}
          style={{ marginBottom: "-20px", marginLeft: "20px" }}
          onChange={(value) => {
            setFormData((prev) => {
              return {
                ...prev,
                postType: +value
              }
            })
          }}
          tabBarStyle={{ border: "none" }}
          items={tabs.map((item) => {
            return {
              label: item.label,
              key: item.key,
            };
          })}
          indicator={{ size: (origin) => origin - 20, align: "center" }}
        />
        <div
          style={{
            marginTop: "5px",
            height: "auto",
            borderRadius: "0 10px 10px 10px",
            padding: "16",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Input
              allowClear={true}
              style={{
                cursor: "pointer",
                margin: "13px auto",
                height: "100%",
                border: "none",
                outline: "none",
                width: "100%",
                marginLeft: "20px",
                backgroundColor: "#fafafa",
                fontSize: "16",
              }}
              value={formData?.inputSearch || ""}
              onChange={(e) => {
                setFormData((prev: any) => {
                  return {
                    ...prev,
                    inputSearch: e.target.value ?? ""
                  }
                });
              }}
              placeholder="Nhập địa chỉ hoặc dự án ...."
              suffix={
                <Button
                  size="large"
                  style={{ backgroundColor: "#FF4D4F", color: "#fff" }}
                  htmlType="submit"
                >
                  Tìm kiếm
                </Button>
              }
            />
          </div>
          <Flex
            justify="start"
            gap={10}
            style={{
              margin: "0 21px",
            }}
          >
            <Select
              size="middle"
              allowClear={true}
              style={{ flex: "1" }}
              placeholder={"Loại nhà đất"}
              options={realEstateType?.map((item: any) => {
                return {
                  value: item?.id,
                  label: item?.name
                }
              })}
              value={formData?.realEstateType}
              onChange={(e) => {
                setFormData((prev: any) => {
                  return {
                    ...prev,
                    realEstateType: e
                  }
                })
              }}
              onClear={() => {
                setFormData((prev: any) => {
                  return {
                    ...prev,
                    realEstateType: null
                  }
                })
              }}
            />
            <Select
              size="middle"
              style={{ flex: "1" }}
              allowClear={true}
              placeholder={"Khu vực"}
              options={provinces?.map((item: any) => {
                return {
                  value: item?.name,
                  label: item?.name
                }
              })}
              value={formData?.region}
              onChange={(e) => {
                setFormData((prev: any) => {
                  return {
                    ...prev,
                    region: e
                  }
                })
              }}
              onClear={() => {
                setFormData((prev: any) => {
                  return {
                    ...prev,
                    region: null
                  }
                })
              }}
            />
            <Select
              size="middle"
              allowClear={true}
              style={{ flex: "1" }}
              placeholder={"Mức giá"}
              options={prices?.map((item: any) => {
                return {
                  value: item?.value,
                  label: item?.label
                }
              })}
              value={formData?.price}
              onChange={(e) => {
                setFormData((prev: any) => {
                  return {
                    ...prev,
                    price: e
                  }
                })
              }}
              onClear={() => {
                setFormData((prev: any) => {
                  return {
                    ...prev,
                    price: null
                  }
                })
              }}
            />
            <Select
              size="middle"
              allowClear={true}
              style={{ flex: "1" }}
              placeholder={"Diện tích"}
              options={areas?.map((item: any) => {
                return {
                  value: item?.value,
                  label: item?.label
                }
              })}
              value={formData?.area}
              onChange={(e) => {
                setFormData((prev: any) => {
                  return {
                    ...prev,
                    area: e
                  }
                })
              }}
              onClear={() => {
                setFormData((prev: any) => {
                  return {
                    ...prev,
                    area: null
                  }
                })
              }}
            />
          </Flex>
        </div>
      </Flex>
    </Form>
  );
};

export default SearchComponent;
