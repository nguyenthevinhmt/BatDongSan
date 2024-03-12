const hidePhone = (phoneNumber: string) => {
  const result = phoneNumber.slice(-3)
  return result
};
console.log(hidePhone('0965115792'))
export default hidePhone;
