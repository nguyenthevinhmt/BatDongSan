import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Checkbox from "antd/lib/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Radio from "antd/es/radio";

const PriceFilter = ({ data }: any) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());
  return (
    <div
      style={{
        width: "219px",
        height: "300px",
        padding: "20px 20px 30px 20px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        fontFamily: "__Lexend_126e48",
      }}
    >
      <div style={{ fontSize: "18px", marginBottom: "10px" }}>
        Theo khoảng giá
      </div>
      {data.map((item: any) => {
        return (
          <div key={uuidv4()}>
            <Checkbox
              style={{
                fontSize: "16px",
                fontFamily: "__Lexend_126e48",
                color: "rgba(0, 0, 0, 0.7)",
              }}
              onChange={() => {
                params.set("startPrice", item.value.startPrice);
                params.set("endPrice", item.value.endPrice);
                router.push(`${pathName}?${params.toString()}`);
              }}
            >
              {item.label}
            </Checkbox>
          </div>
        );
      })}
    </div>
  );
};

export default PriceFilter;
