// theme/themeConfig.ts
import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    fontSize: 14,
    colorPrimary: "#FF4D4F",
    colorBgLayout: "#fafafa",
    colorBgTextActive: "#ccc",
    fontFamily: "",
  },
  components: {
    Menu: {
      itemColor: "#3e3e3e",
      horizontalItemSelectedColor: "#FF4D4F",
      itemSelectedColor: "#FF4D4F",
      groupTitleFontSize: 20,
    },
    Tabs: {
      cardBg: "rgba(0, 0, 0, 0)",
      titleFontSize: 16,
    },
    Segmented: {
      itemHoverBg: '#ff4d4f',
      itemSelectedColor: '#ff4d4f',
    },
    Card: {
      headerFontSize: 18,
    }
  },
};

export default theme;
