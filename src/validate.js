export const isEmail = (email) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );

export const isPhoneNumber = (phoneNumber) =>
  /(0[3|5|7|8|9])+([0-9]{8})\b/.test(phoneNumber);