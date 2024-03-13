import dayjs from "dayjs";

export const skipNullParams = (data: any) => {
  let editData: any = {};
  if (data)
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        editData[key] = data[key];
      }
    });
  return editData;
};

export function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
