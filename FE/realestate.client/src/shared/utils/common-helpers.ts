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
export function formatDate(timestamp: any) {
  const now: any = new Date();
  const postDate: any = new Date(timestamp);
  const timeDiff = now - postDate;
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `Đăng ${years} năm trước`;
  } else if (months > 0) {
    return `Đăng ${months} tháng trước`;
  } else if (weeks > 0) {
    return `Đăng ${weeks} tuần trước`;
  } else if (days > 0) {
    return `Đăng ${days} ngày trước`;
  } else if (hours > 0) {
    return `Đăng ${hours} giờ trước`;
  } else if (minutes > 0) {
    return `Đăng ${minutes} phút trước`;
  } else {
    return `Vừa đăng`;
  }
}

export function classificationPostType(type: any) {
  switch (type) {
    case type = 1 || '1':
      return "Tin thường"
    case type = 2 || '2':
      return "Tin VIP bạc"
    case type = 3 || '3':
      return "Tin VIP vàng"
    case type = 4 || '4':
      return "Tin VIP Kim cương"
  }
}
function isInteger(number: any) {
  return number % 1 === 0;
}
export function formatCurrency(amount: any) {
  const suffixes = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ", "nghìn triệu tỷ"];
  let suffixIndex = 0;

  while (amount >= 1000 && suffixIndex < suffixes.length - 1) {
    amount /= 1000;
    suffixIndex++;
  }

  const formattedAmount = isInteger(amount) ? amount.toFixed(0) : amount.toFixed(2);
  return `${formattedAmount} ${suffixes[suffixIndex]}`;
}
