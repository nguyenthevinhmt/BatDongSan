"use client";
import { getDistricts, getProvinces } from "@/services/post/address.service";
import { SearchPost, getRealEstateType } from "@/services/post/post.service";
import { Button, Flex, Form, Input, Select, Tabs } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  PriceRentConst,
  PriceSaleConst,
} from "./FilterComponent/DataConst/PriceConst";
import { extractNumbersFromString } from "@/shared/utils/common-helpers";
import { AreaConst } from "./FilterComponent/DataConst/AreaConst";

const SearchComponent = () => {
  const [formData, setFormData] = useState({
    postType: 1,
    inputSearch: "",
    realEstateType: null,
    region: null,
    startPrice: null,
    endPrice: null,
    startArea: null,
    endArea: null,
  });
  const [provinces, setProvinces] = useState([]);
  const [realEstateType, setRealEstateType] = useState<any>();
  const router = useRouter();

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

  const handleSubmit = (formValue: any) => {
    formValue = delete formValue.price;
    formValue = delete formValue.area;
    const param = {
      postType: formData?.postType ?? undefined,
      inputSearch: formData?.inputSearch ?? undefined,
      realEstateType: formData?.realEstateType ?? undefined,
      region: formData?.region ?? undefined,
      startPrice: formData?.startPrice ?? undefined,
      endPrice: formData?.endPrice ?? undefined,
      startArea: formData?.startArea ?? undefined,
      endArea: formData?.endArea ?? undefined,
    };
    if (formData?.startPrice) {
      param.startPrice = formData?.startPrice;
    }
    if (formData?.endPrice) {
      param.endPrice = formData?.endPrice;
    }

    if (formData?.startArea) {
      param.startArea = formData?.startArea;
    }
    if (formData?.endArea) {
      param.endArea = formData?.endArea;
    }
    const filteredParams: any = Object.fromEntries(
      Object.entries(param).filter(([_, value]) => value !== undefined)
    );
    const queryParams = new URLSearchParams(filteredParams).toString();
    let url: string;
    url = formData?.postType == 1 ? "/nha-dat-ban" : "/nha-dat-cho-thue";
    router.push(`${url}?${queryParams}`);
  };

  let prices = [
    {
      value: 0,
      label: "Thỏa thuận",
    },
    {
      value: 1 * Math.pow(10, 9),
      label: "<= 1 Tỷ",
    },
  ];
  for (let i = 2; i < 20; i++) {
    prices.push({
      value: i * Math.pow(10, 9),
      label: `${i} - ${i + 1} tỷ`,
    });
  }
  prices.push({
    value: 21 * Math.pow(10, 9),
    label: `>= 20 tỷ`,
  });
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
      label: "<= 20 m²",
    },
    {
      value: 30,
      label: "20 - 30 m²",
    },
    {
      value: 40,
      label: "30 - 40 m²",
    },
    {
      value: 50,
      label: "40 - 50 m²",
    },
    {
      value: 60,
      label: "50 - 60 m²",
    },
    {
      value: 70,
      label: "60 - 70 m²",
    },
    {
      value: 80,
      label: "70 - 80 m²",
    },
    {
      value: 90,
      label: "80 - 90 m²",
    },
    {
      value: 100,
      label: "90 - 100 m²",
    },
    {
      value: 110,
      label: "> 100 m²",
    },
  ];

  return (
    <Form onFinish={(formValue) => handleSubmit(formValue)}>
      <Flex
        vertical
        style={{
          margin: "20px 0px",
          padding: "16px",
          width: "100%",
          borderRadius: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      >
        <Form.Item name="postType">
          <Tabs
            activeKey={formData.postType.toString()}
            tabBarGutter={10}
            type="card"
            style={{
              marginBottom: "-20px",
              marginLeft: "20px",
            }}
            onChange={(value) => {
              setFormData((prev) => {
                return {
                  ...prev,
                  postType: +value,
                };
              });
            }}
            items={tabs.map((item) => {
              return {
                key: item.key,
                label: (
                  <div style={{ color: "#aaa" }} onChange={() => {}}>
                    {item.label}
                  </div>
                ),
              };
            })}
          />
        </Form.Item>
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
            <Form.Item
              name="keyword"
              style={{
                cursor: "pointer",
                margin: "13px auto",
                height: "100%",
                border: "none",
                outline: "none",
                width: "100%",
                marginLeft: "20px",
                backgroundColor: "#fafafa",
                borderRadius: "8px",
                fontSize: "16",
              }}
            >
              <Input
                allowClear={true}
                value={formData?.inputSearch || ""}
                onChange={(e) => {
                  setFormData((prev: any) => {
                    return {
                      ...prev,
                      inputSearch: e.target.value ?? "",
                    };
                  });
                }}
                prefix={<FaSearch style={{ marginRight: "10px" }} />}
                placeholder="Nhập địa chỉ hoặc dự án ...."
                suffix={
                  <Button
                    size="large"
                    style={{
                      backgroundColor: "#FF4D4F",
                      color: "#fff",
                      fontWeight: 500,
                    }}
                    htmlType="submit"
                  >
                    Tìm kiếm
                  </Button>
                }
              />
            </Form.Item>
          </div>
          <Flex
            justify="center"
            gap={10}
            style={{
              margin: "0 20px",
            }}
          >
            <Form.Item
              style={{ flex: "1", backgroundColor: "rgba(0, 0, 0, 0.1)" }}
              name="realEstateType"
            >
              <Select
                size="middle"
                allowClear={true}
                style={{ flex: "1", backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                placeholder={"Loại nhà đất"}
                options={realEstateType?.map((item: any) => {
                  return {
                    value: item?.id,
                    label: item?.name,
                  };
                })}
                value={formData?.realEstateType}
                onChange={(e) => {
                  setFormData((prev: any) => {
                    return {
                      ...prev,
                      realEstateType: e,
                    };
                  });
                }}
                onClear={() => {
                  setFormData((prev: any) => {
                    return {
                      ...prev,
                      realEstateType: undefined,
                    };
                  });
                }}
              />
            </Form.Item>
            <Form.Item name="province" style={{ flex: "1" }}>
              <Select
                size="middle"
                allowClear={true}
                placeholder={"Khu vực"}
                options={provinces?.map((item: any) => {
                  return {
                    value: item?.name,
                    label: item?.name,
                  };
                })}
                value={formData?.region}
                onChange={(e) => {
                  setFormData((prev: any) => {
                    return {
                      ...prev,
                      region: e,
                    };
                  });
                }}
                onClear={() => {
                  setFormData((prev: any) => {
                    return {
                      ...prev,
                      region: undefined,
                    };
                  });
                }}
              />
            </Form.Item>
            <Form.Item name="price" style={{ flex: "1" }}>
              <Select
                size="middle"
                allowClear={true}
                placeholder={"Mức giá"}
                options={(formData?.postType === 1
                  ? PriceSaleConst
                  : PriceRentConst
                )?.map((item: any) => {
                  return {
                    value: `${item?.value.startPrice} - ${item?.value.endPrice}`,
                    label: item?.label,
                  };
                })}
                // value={formData?.startPrice && formData?.endPrice}
                onChange={(e) => {
                  const [firstNumber, secondNumber] =
                    extractNumbersFromString(e);
                  setFormData((prev: any) => {
                    return {
                      ...prev,
                      startPrice: firstNumber,
                      endPrice: secondNumber,
                    };
                  });
                }}
                onClear={() => {
                  setFormData((prev: any) => {
                    return {
                      ...prev,
                      startPrice: undefined,
                      endPrice: undefined,
                    };
                  });
                }}
              />
            </Form.Item>
            <Form.Item name="area" style={{ flex: "1" }}>
              <Select
                size="middle"
                allowClear={true}
                placeholder={"Diện tích"}
                options={AreaConst?.map((item: any) => {
                  return {
                    value: `${item?.value.startArea} - ${item?.value.endArea}`,
                    label: item?.label,
                  };
                })}
                // value={formData?.area}
                onChange={(e) => {
                  const [firstNumber, secondNumber] =
                    extractNumbersFromString(e);
                  setFormData((prev: any) => {
                    return {
                      ...prev,
                      startArea: firstNumber,
                      endArea: secondNumber,
                    };
                  });
                }}
                onClear={() => {
                  setFormData((prev: any) => {
                    return {
                      ...prev,
                      startArea: undefined,
                      endArea: undefined,
                    };
                  });
                }}
              />
            </Form.Item>
          </Flex>
        </div>
      </Flex>
    </Form>
  );
};

export default SearchComponent;
