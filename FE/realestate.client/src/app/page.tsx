"use client";
import LoadingComponent from "@/components/shareComponents/loadingComponent";
import withTheme from "@/theme";
const App = () => {
  return (
    // <Flex
    //   style={{
    //     width: "100%",
    //     height: "100%",
    //   }}
    //   justify="center"
    //   align="center"
    // >
    // </Flex>
    <LoadingComponent />
    // <Link href="/auth/login">Login</Link>
  );
};
const AppPage = () => {
  return withTheme(<App />);
};

export default AppPage;
