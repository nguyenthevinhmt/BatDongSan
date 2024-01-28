import { Breadcrumb } from "antd";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import React from "react";

const BreadscrumbComp = ({ items }: { items: BreadcrumbItemType[] }) => {
  return (
    <>
      <Breadcrumb style={{ margin: "12px 0px" }} items={items} separator=">" />
    </>
  );
};

export default BreadscrumbComp;
