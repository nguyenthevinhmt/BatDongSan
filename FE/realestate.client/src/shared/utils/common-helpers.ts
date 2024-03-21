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

export function formatVietnameseToString(str: string) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/\s+/g, "-");
  str = str.replace(/[^a-z0-9-]/g, "");
  str = str.replace(/-+/g, "-");
  return str;
}
//get time ago
export function formatDate(date: any) {
  const today: any = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const postDate: any = new Date(date);
  const elapsedDays = Math.floor((today - postDate) / (1000 * 60 * 60 * 24));
  const elapsedWeeks = Math.floor(elapsedDays / 7);
  const elapsedMonths = Math.floor(elapsedDays / 30);

  if (postDate.toDateString() === today.toDateString()) {
    return "Đăng hôm nay";
  } else if (postDate.toDateString() === yesterday.toDateString()) {
    return "Đăng hôm qua";
  } else if (elapsedDays <= 7) {
    return `Đăng ${elapsedDays} ngày trước`;
  } else if (elapsedWeeks <= 4) {
    return `Đăng ${elapsedWeeks} tuần trước`;
  } else {
    return `Đăng ${elapsedMonths} tháng trước`;
  }
}
