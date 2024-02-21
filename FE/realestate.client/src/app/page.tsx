"use client";
import LoadingComponent from "@/components/shareComponents/loadingComponent";
import withTheme from "@/theme";
const App = () => {
  return (
      <LoadingComponent />
      // <div style={{height: '2000px'}}>
      // </div>
  );
};
const AppPage = () => {
  return withTheme(<App />);
};

export default AppPage;
