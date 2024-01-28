// theme/themeConfig.ts
import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    fontSize: 14,
    colorPrimary: "#FF4D4F",
    colorBgLayout: "#fafafa",
  },
  components: {
    Menu: {
      itemColor: "#3e3e3e",
      horizontalItemSelectedColor: "#FF4D4F",
      itemSelectedColor: "#FF4D4F",
      groupTitleFontSize: 20,
    },
  },
};

export default theme;
