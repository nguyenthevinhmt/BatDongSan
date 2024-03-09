const hideEmail = (email: string) => {
  // Tìm vị trí của ký tự @ trong email
  const atIndex = email?.indexOf("@");
  // Lấy phần đầu email trước ký tự @
  const prefix = email.substring(0, atIndex);
  // Ẩn đi các ký tự trước đó
  const maskedPrefix =
    "*".repeat(Math.max(0, prefix.length - 4)) +
    prefix.substring(Math.max(0, prefix.length - 4));
  // Trả về chuỗi email đã được ẩn đi
  return maskedPrefix + email.substring(atIndex);
};
export default hideEmail;

