"use client";
import LoadingComponent from "@/components/shareComponents/loadingComponent";
import { Alert, Flex, Spin } from "antd";
import { redirect } from "next/navigation";

const App = () => {
  return (
    <Flex
      style={{
        width: "100%",
        height: "100%",
      }}
      justify="center"
      align="center"
    >
      <LoadingComponent />
    </Flex>
  );
};

export default App;
