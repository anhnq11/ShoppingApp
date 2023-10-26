export const isPhoneNumber = (phoneNumber) =>
  /(0[3|5|7|8|9])+([0-9]{8})\b/.test(phoneNumber);